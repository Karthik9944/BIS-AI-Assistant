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

function searchStandards(query: string, topN = 5): Standard[] {
  const keywords = query
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2);

  const scored = (standards as Standard[]).map((std) => {
    const haystack =
      `${std.title} ${std.scope} ${std.sector} ${std.is_number}`.toLowerCase();
    const score = keywords.reduce(
      (acc, kw) => acc + (haystack.includes(kw) ? 1 : 0),
      0
    );
    return { std, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topN)
    .map((s) => s.std);
}

export async function POST(req: NextRequest) {
  try {
    const { description } = await req.json();

    if (!description || typeof description !== "string") {
      return NextResponse.json(
        { error: "A 'description' string is required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GROQ_API_KEY is not configured in environment variables. Please set it in .env.local." },
        { status: 500 }
      );
    }

    const matches = searchStandards(description);

    const contextBlock =
      matches.length > 0
        ? matches
            .map(
              (m, i) =>
                `[${i + 1}] ${m.is_number} — ${m.title}\n    Sector: ${m.sector} | Status: ${m.status} | Scheme: ${m.scheme}\n    Scope: ${m.scope}\n    Parameters: ${JSON.stringify(m.parameters)}`
            )
            .join("\n\n")
        : "NO MATCHING STANDARDS FOUND.";

    const systemPrompt = `You are a Bureau of Indian Standards (BIS) compliance advisor.
The user will describe a product or service. Your job is to:
1. Identify which Indian Standard(s) from the provided list apply to it.
2. For each applicable standard, state whether certification is MANDATORY or VOLUNTARY (use the "scheme" field).
3. Explain WHY that standard applies, referencing the scope.
4. Always cite the IS number (e.g. IS 18087:2022) and status (Published / Under Publication).

Use ONLY the provided standards below. If none match, say so honestly — do NOT invent standards.
Keep answers concise and factual.

--- PROVIDED STANDARDS ---
${contextBlock}
--- END ---`;

    const groq = new Groq({ apiKey });

    const chatCompletion = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: description },
      ],
      temperature: 0.3,
      max_tokens: 1024,
    });

    const answer =
      chatCompletion.choices[0]?.message?.content ??
      "Sorry, I could not generate a response.";

    const sources = matches.map((m) => ({
      is_number: m.is_number,
      status: m.status,
      scheme: m.scheme,
    }));

    // Secondary lightweight call to Groq LLM: check for cross-sector conflict/overlap
    let crossConflictWarning: string | null = null;
    const primarySector = matches[0]?.sector || "General";

    try {
      const allSectors = Array.from(new Set((standards as Standard[]).map((s) => s.sector))).join(", ");

      const conflictCheckPrompt = `You are a Bureau of Indian Standards (BIS) regulatory sector overlap analyzer.
Evaluate if the user's product description contains clear keyword or semantic signals indicating it could plausibly ALSO fall under a DIFFERENT sector than the primary recommended sector ("${primarySector}").

The official sectors present in data/standards.json are:
${allSectors}

CRITICAL EVALUATION RULES:
1. NO OVERLAP: If the product is a standard, single-category item with no ingredients, functions, or features spanning other sectors (for example, "I manufacture cotton yoga mats" is purely a yoga/textile product and has ZERO overlap with Electronics, Food, Construction, Toys, or Automotive), you MUST return:
{"hasOverlap": false, "overlappingSector": null, "warningText": null}

2. PLAUSIBLE OVERLAP: Only return hasOverlap: true if the product description explicitly combines vocabulary, ingredients, or functions across multiple sectors. For example:
- "herbal face cream made with turmeric and neem" contains Ayush herbs (turmeric, neem) but is formulated as a cosmetic/skincare product (and turmeric is also a food spice), so it plausibly spans Ayush and Food or Cosmetic/Consumer regulations.
- "smart plush toy with Bluetooth and rechargeable battery" spans Toys and Electronics.

If overlap is found, output:
{"hasOverlap": true, "overlappingSector": "<Sector>", "warningText": "This product may also fall under <Sector> regulations — you may want to check those requirements too."}

Output strictly valid JSON with keys "hasOverlap", "overlappingSector", "warningText".`;

      const conflictCompletion = await groq.chat.completions.create({
        model: "openai/gpt-oss-120b",
        messages: [
          { role: "system", content: conflictCheckPrompt },
          {
            role: "user",
            content: `Product description: "${description}"\nPrimary recommended sector: "${primarySector}"`,
          },
        ],
        temperature: 0.1,
        max_tokens: 600,
      });

      const conflictContent = conflictCompletion.choices[0]?.message?.content || "";
      const jsonMatch = conflictContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        if (parsed.hasOverlap) {
          crossConflictWarning =
            parsed.warningText ||
            (parsed.overlappingSector
              ? `This product may also fall under ${parsed.overlappingSector} regulations — you may want to check those requirements too.`
              : null);
        }
      }
    } catch (conflictErr) {
      console.error("Non-fatal error checking cross-sector overlap:", conflictErr);
      crossConflictWarning = null;
    }

    return NextResponse.json({ answer, sources, crossConflictWarning });
  } catch (err: unknown) {
    console.error("Error in /api/recommend:", err);
    let message = "Something went wrong while processing your recommendation. Please try again.";
    
    if (err instanceof Error) {
      const errLower = err.message.toLowerCase();
      if (errLower.includes("429") || errLower.includes("rate limit")) {
        message = "AI service rate limit reached. Please wait a moment and try again.";
      } else if (errLower.includes("fetch failed") || errLower.includes("econnrefused") || errLower.includes("network")) {
        message = "Network connection to AI service failed. Please check your connection and try again.";
      } else if (errLower.includes("api key") || errLower.includes("401") || errLower.includes("unauthorized")) {
        message = "Invalid or missing Groq API key. Please check your GROQ_API_KEY setting.";
      } else if (err.message) {
        message = err.message;
      }
    }
    
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
