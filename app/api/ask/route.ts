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
    const body = await req.json();
    const { question, simple } = body as { question?: string; simple?: boolean };

    if (!question || typeof question !== "string") {
      return NextResponse.json(
        { error: "A 'question' string is required." },
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

    const matches = searchStandards(question);

    const contextBlock =
      matches.length > 0
        ? matches
            .map(
              (m, i) =>
                `[${i + 1}] ${m.is_number} — ${m.title}\n    Sector: ${m.sector} | Status: ${m.status} | Scheme: ${m.scheme}\n    Scope: ${m.scope}\n    Parameters: ${JSON.stringify(m.parameters)}`
            )
            .join("\n\n")
        : "NO MATCHING STANDARDS FOUND.";

    const baseSystemPrompt = simple
      ? `You are a friendly guide for the Bureau of Indian Standards (BIS).
Explain things in very simple, plain language as if speaking to someone completely new to standards and compliance.
Use short sentences. Avoid jargon and technical terms — if you must use one, explain it in parentheses.
Always mention the IS number and whether it is Published or Under Publication.
If no entries are relevant, say so honestly — do NOT make anything up.
Do NOT list or repeat the parameters — they will be shown separately in a table.`
      : `You are a helpful assistant for the Bureau of Indian Standards (BIS). 
Answer the user's question using ONLY the provided Indian Standard entries below. 
Always cite the IS number (e.g. IS 18087:2022) and its status (Published / Under Publication) for every standard you reference.
If no entries are relevant or provided, say so honestly — do NOT invent standards or information.
Keep answers concise and factual.`;

    const systemPrompt = `${baseSystemPrompt}

--- PROVIDED STANDARDS ---
${contextBlock}
--- END ---`;

    const groq = new Groq({ apiKey });

    const chatCompletion = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: question },
      ],
      temperature: simple ? 0.5 : 0.3,
      max_tokens: 1024,
    });

    const answer =
      chatCompletion.choices[0]?.message?.content ??
      "Sorry, I could not generate a response.";

    const sources = matches.map((m) => ({
      is_number: m.is_number,
      status: m.status,
    }));

    // Include parameters of matched standards when in simple mode
    const matchedParameters = simple
      ? matches.map((m) => ({
          is_number: m.is_number,
          title: m.title,
          parameters: m.parameters,
        }))
      : undefined;

    return NextResponse.json({ answer, sources, matchedParameters });
  } catch (err: unknown) {
    console.error("Error in /api/ask:", err);
    let message = "Something went wrong while processing your request. Please try again.";
    
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
