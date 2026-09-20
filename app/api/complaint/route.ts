import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function POST(req: NextRequest) {
  try {
    const { productName, issueDescription, wherePurchased } = await req.json();

    if (!productName || !issueDescription) {
      return NextResponse.json(
        { error: "Product name and issue description are required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GROQ_API_KEY is not configured in environment variables." },
        { status: 500 }
      );
    }

    const groq = new Groq({ apiKey });

    const systemPrompt = `You are a Bureau of Indian Standards (BIS) Consumer Redressal specialist.
Your task is to take a consumer's grievance and auto-draft a formal, structured, professional grievance report ready for submission via the official BIS CARE mobile application or National Consumer Grievance Portal.

Structure the draft clearly with the following sections:
1. SUBJECT: Formal summary line
2. DETAILS OF PRODUCT & PURCHASE: (Product, Purchased From, Date/Location)
3. NATURE OF ALLEGED NON-COMPLIANCE / DEFECT: Detail standard violations (e.g. counterfeit ISI mark, substandard safety, failure of essential parameters)
4. CONSUMER STATEMENT & EVIDENCE: Summary of consumer's experience and photographic/documentary evidence cited
5. RELIEF / ACTION REQUESTED: Specific enforcement action sought (factory inspection, sample test, recall, replacement/refund)

Maintain a formal, objective, and legal-quality tone. Use concise paragraphs.`;

    const userPrompt = `Product Name: ${productName}
Where Purchased: ${wherePurchased || "Retail/Online Marketplace"}
Issue Description: ${issueDescription}`;

    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.3,
      max_tokens: 1000,
    });

    const complaintDraft =
      completion.choices[0]?.message?.content ??
      "Unable to draft complaint at this time.";

    return NextResponse.json({ complaintDraft });
  } catch (err: unknown) {
    console.error("Error in /api/complaint:", err);
    const msg = err instanceof Error ? err.message : "Failed to generate complaint draft";
    return NextResponse.json(
      { error: msg },
      { status: 500 }
    );
  }
}
