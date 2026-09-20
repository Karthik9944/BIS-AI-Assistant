import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import standards from "@/data/standards.json";

interface Standard {
  is_number: string;
  title: string;
  sector: string;
  status: string;
  scheme: string;
  scope: string;
  parameters: Record<string, unknown>;
}

function cleanMermaid(raw: string): string {
  let cleaned = raw
    .replace(/^```(?:mermaid)?/im, "")
    .replace(/```$/im, "")
    .trim();
  cleaned = cleaned.replace(/```/g, "").trim();

  // If there is preamble text before "flowchart" or "graph", trim up to it
  const match = cleaned.search(/(?:flowchart|graph)\s+(?:TD|TB|LR|RL)/i);
  if (match !== -1) {
    cleaned = cleaned.slice(match).trim();
  }

  return cleaned;
}

function isValidMermaid(code: string): boolean {
  return /^(?:flowchart|graph)\s+(?:TD|TB|LR|RL)/i.test(code.trim());
}

async function generateMermaid(
  groq: Groq,
  std: Standard,
  temperature = 0.2
): Promise<string> {
  const isServiceOrScheme =
    std.scope.toLowerCase().includes("service") ||
    std.sector.toLowerCase().includes("service") ||
    std.sector.toLowerCase().includes("tourism") ||
    std.title.toLowerCase().includes("service") ||
    std.scheme.toLowerCase().includes("terminology");

  const promptTypeInstruction = isServiceOrScheme
    ? `This is a service or scheme standard. Create a sequential step-by-step process flowchart representing the stages, operational criteria, and quality compliance steps required.`
    : `This is a product/technical specification with parameters. Create a flowchart showing the standard root node connecting to key test parameters and their acceptance thresholds (e.g. <= limit, >= limit), leading to a compliance/certification milestone.`;

  const systemPrompt = `You are a Mermaid.js diagram generator for Bureau of Indian Standards (BIS).
Generate a clean, beautiful, and completely valid Mermaid.js flowchart (flowchart TD).

CRITICAL MERMAID SYNTAX RULES:
1. Output ONLY the raw Mermaid diagram definition. NO markdown code blocks (\`\`\`mermaid or \`\`\`), NO preamble, NO explanations.
2. Start directly with: flowchart TD
3. Node IDs must be simple alphanumeric: A, B, C, D1, D2, P1, P2, etc.
4. Node labels MUST be enclosed in double quotes inside brackets: A["Label Here"]
5. Never put unquoted parentheses inside node labels. Always: Node["Loss on Drying (<= 12%)"]
6. Use clear connecting arrows: A --> B
7. Keep the diagram between 5 and 9 nodes so it is clean, legible, and visually balanced.

${promptTypeInstruction}`;

  const userPrompt = `Standard: ${std.is_number} — ${std.title}
Sector: ${std.sector} | Status: ${std.status} | Scheme: ${std.scheme}
Scope: ${std.scope}
Parameters: ${JSON.stringify(std.parameters)}`;

  const completion = await groq.chat.completions.create({
    model: "openai/gpt-oss-120b",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    temperature,
    max_tokens: 800,
  });

  return cleanMermaid(completion.choices[0]?.message?.content ?? "");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { is_number, title } = body as {
      is_number?: string;
      title?: string;
    };

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GROQ_API_KEY is not configured in environment variables." },
        { status: 500 }
      );
    }

    // Locate standard in standards.json
    const all = standards as Standard[];
    let target = all.find(
      (s) =>
        (is_number && s.is_number.toLowerCase() === is_number.toLowerCase()) ||
        (is_number && s.is_number.toLowerCase().includes(is_number.toLowerCase()))
    );

    if (!target && title) {
      target = all.find((s) => s.title.toLowerCase().includes(title.toLowerCase()));
    }

    if (!target) {
      // Fallback: create ad-hoc standard object from provided fields
      if (body.title && body.scope) {
        target = {
          is_number: body.is_number || "Indian Standard",
          title: body.title,
          sector: body.sector || "General",
          status: body.status || "Published",
          scheme: body.scheme || "Voluntary",
          scope: body.scope,
          parameters: body.parameters || {},
        };
      } else {
        return NextResponse.json(
          { error: "Standard not found or insufficient details provided." },
          { status: 404 }
        );
      }
    }

    const groq = new Groq({ apiKey });

    // Attempt 1
    let mermaid = await generateMermaid(groq, target, 0.2);

    // Retry once if invalid
    if (!isValidMermaid(mermaid)) {
      console.warn("Mermaid attempt 1 invalid, retrying with temperature 0.1...");
      mermaid = await generateMermaid(groq, target, 0.1);
    }

    // If still invalid, fallback to a robust deterministic template
    if (!isValidMermaid(mermaid)) {
      const sanitizedTitle = target.title.replace(/["()]/g, "");
      const params = Object.entries(target.parameters)
        .filter(([k]) => k !== "Scope")
        .slice(0, 5);

      if (params.length > 0) {
        mermaid = `flowchart TD
  Root["${target.is_number}: ${sanitizedTitle}"]
${params
  .map(
    ([k, v], i) =>
      `  P${i}["${k.replace(/_/g, " ")}: ${String(v).replace(/["()]/g, "")}"]\n  Root --> P${i}\n  P${i} --> Result["Compliant ${target.is_number}"]`
  )
  .join("\n")}`;
      } else {
        mermaid = `flowchart TD
  Root["${target.is_number}: ${sanitizedTitle}"]
  S1["Service Requirements & Scope"]
  S2["Audit & Operational Compliance"]
  S3["Certified Conformance"]
  Root --> S1
  S1 --> S2
  S2 --> S3`;
      }
    }

    return NextResponse.json({
      mermaid,
      is_number: target.is_number,
      title: target.title,
    });
  } catch (err: unknown) {
    console.error("Error in /api/visualize:", err);
    return NextResponse.json(
      { error: "Visual summary unavailable for this standard right now" },
      { status: 500 }
    );
  }
}
