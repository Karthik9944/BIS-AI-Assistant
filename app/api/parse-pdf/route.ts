import { NextRequest, NextResponse } from "next/server";
import { PDFParse } from "pdf-parse";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file was provided in the upload request." },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let extractedText = "";
    try {
      const parser = new PDFParse({ data: buffer });
      const res = await parser.getText();
      await parser.destroy();
      extractedText = typeof res === "string" ? res : res?.text || "";
    } catch (parseErr) {
      console.error("Error reading PDF via PDFParse:", parseErr);
      // Fallback: simple text scan on buffer if ASCII
      extractedText = buffer.toString("utf8");
    }

    if (!extractedText || extractedText.trim().length === 0) {
      return NextResponse.json(
        { error: "Could not extract readable text from this PDF." },
        { status: 422 }
      );
    }

    // Match known Haritaki / standard parameters
    const parameterPatterns: Record<string, RegExp> = {
      "Foreign Matter (%)": /foreign\s*matter[^\d]*([\d.]+)/i,
      "Loss on Drying (%)": /loss\s*(?:on)?\s*drying[^\d]*([\d.]+)/i,
      "Total Ash (%)": /total\s*ash[^\d]*([\d.]+)/i,
      "Acid Insoluble Ash (%)": /acid\s*insoluble\s*ash[^\d]*([\d.]+)/i,
      "Alcohol Soluble Extractive (%)": /alcohol\s*soluble[^\d]*([\d.]+)/i,
      "Water Soluble Extractive (%)": /water\s*soluble[^\d]*([\d.]+)/i,
    };

    const parsed: Record<string, number> = {};

    for (const [key, regex] of Object.entries(parameterPatterns)) {
      const match = extractedText.match(regex);
      if (match && match[1]) {
        const val = parseFloat(match[1]);
        if (!isNaN(val)) {
          parsed[key] = val;
        }
      }
    }

    // Also parse any lines with tabular/key-value pairs: "Name, Value" or "Name: Value"
    const lines = extractedText.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    for (const line of lines) {
      const kv = line.split(/[,:\t]+/).map((s) => s.trim());
      if (kv.length >= 2) {
        const rawKey = kv[0];
        const rawVal = parseFloat(kv[1]);
        if (!isNaN(rawVal)) {
          for (const targetKey of Object.keys(parameterPatterns)) {
            const normTarget = targetKey.toLowerCase().replace(/[^a-z]/g, "");
            const normRaw = rawKey.toLowerCase().replace(/[^a-z]/g, "");
            if ((normTarget.includes(normRaw) || normRaw.includes(normTarget)) && !parsed[targetKey]) {
              parsed[targetKey] = rawVal;
              break;
            }
          }
        }
      }
    }

    if (Object.keys(parsed).length === 0) {
      return NextResponse.json(
        {
          error:
            "PDF text was extracted, but no matching chemical/physical test parameters (Foreign Matter, Total Ash, Loss on Drying, Extractive values) were identified.",
          rawSnippet: extractedText.slice(0, 300),
        },
        { status: 422 }
      );
    }

    return NextResponse.json({
      success: true,
      filename: file.name,
      parameters: parsed,
      matchedCount: Object.keys(parsed).length,
    });
  } catch (err: unknown) {
    console.error("Error in /api/parse-pdf:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to process PDF file." },
      { status: 500 }
    );
  }
}
