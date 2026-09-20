import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function POST(req: NextRequest) {
  try {
    const { text, targetLang } = await req.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "A 'text' string is required for translation." },
        { status: 400 }
      );
    }

    const langName = targetLang === "hi" ? "Hindi (हिन्दी)" : "English";

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GROQ_API_KEY is not configured in environment variables." },
        { status: 500 }
      );
    }

    const groq = new Groq({ apiKey });

    const systemPrompt = `You are a professional Bureau of Indian Standards (BIS) technical translator.
Translate the provided text into fluent, natural ${langName}.
CRITICAL TRANSLATION RULES:
1. Preserve all Indian Standard numbers verbatim (e.g. IS 18087:2022, IS 14543, IS 13252).
2. Preserve Markdown tables, bullet points, asterisks, and citations intact.
3. Preserve technical chemical / physical units (e.g., %, pH, mg/l, ppm, N, mm) and numeric values.
4. Keep standard certification scheme acronyms clear (e.g., ISI Mark, CRS, Hallmarking, HUID, NABL, MSME).
5. Output ONLY the translated content without meta explanations or chat prefixes.`;

    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: text },
      ],
      temperature: 0.2,
      max_tokens: 1024,
    });

    const translatedText =
      completion.choices[0]?.message?.content ?? text;

    return NextResponse.json({ translatedText });
  } catch (err: unknown) {
    console.error("Error in /api/translate:", err);
    let message = "Translation failed. Please try again.";
    if (err instanceof Error && err.message) {
      message = err.message;
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
