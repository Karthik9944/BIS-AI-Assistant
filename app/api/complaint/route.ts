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
Your task is to take a consumer's grievance and auto-draft a formal, structured, professional grievance report ready for direct submission via the official BIS CARE mobile application or National Consumer Grievance Portal.

CRITICAL FORMATTING INSTRUCTION:
- Output the complaint strictly as a NORMAL PLAIN TEXT DRAFT.
- NEVER USE '#' (NO markdown heading hashes like #, ##, ###, or ####) ANYWHERE in the draft.
- Do NOT use markdown heading syntax or hashtags.
- Use plain uppercase titles, numbering (1., 2., etc.), bullet points (* or -), and plain line dividers (---) for structure.
- Make the text directly copy-pasteable into plain-text grievance text fields in the BIS CARE mobile app.

Structure the draft clearly with the following sections:
TO:
The Head / Grievance Officer,
Enforcement and Quality Assurance Department,
Bureau of Indian Standards (BIS)

SUBJECT: Formal summary line

1. COMPLAINANT INFORMATION:
* Name: [Your Name]
* Mobile Number: [Your Contact Number]
* Email ID: [Your Email Address]
* Address: [Your City / Address]

2. COMPLAINT CATEGORY:
State the relevant category (e.g. Misuse of ISI Mark / Unlicensed Product under Mandatory Certification / Substandard Quality of Certified Goods / Hallmarking Violation / CRS Registration Violation)

3. PRODUCT & STANDARD SPECIFICATIONS:
* Product Name & Category:
* Brand / Model:
* Applicable Indian Standard (IS Number if identifiable):
* BIS License / Registration Number (CM/L or R-Number, or indicate 'Missing / Forged'):
* Batch / Lot No. & Date of Manufacture (if known):

4. SELLER & PURCHASE DETAILS:
* Purchased From:
* Seller / Retailer Name:
* Seller Address / Location:
* Invoice / Cash Memo Number & Date:
* Purchase Price:

5. DETAILED NATURE OF ALLEGED NON-COMPLIANCE / DEFECT:
Elaborate on specific quality failures, counterfeit markings, safety hazards, or regulatory breaches under the Bureau of Indian Standards Act, 2016.

6. EVIDENCE & ATTACHMENTS TO BE ATTACHED:
List supporting documents (e.g., retail tax invoice, photos of product and label showing fake/missing mark, screenshot of invalid verification on BIS CARE App).

7. RELIEF / ACTION REQUESTED:
Specify formal enforcement relief (e.g., immediate market surveillance/inspection, seizure of non-compliant stock, penalty under Section 29 of BIS Act 2016, consumer refund/redressal).

Maintain a formal, objective, and legal-quality tone without any markdown '#' headings.`;

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
      max_tokens: 1200,
    });

    let complaintDraft =
      completion.choices[0]?.message?.content ??
      "Unable to draft complaint at this time.";

    // Strictly guarantee no '#' heading hashes or hashtags in the draft
    complaintDraft = complaintDraft
      .replace(/^#{1,6}\s*/gm, "")
      .replace(/#/g, "");

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
