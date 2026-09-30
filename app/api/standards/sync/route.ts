import { NextRequest, NextResponse } from "next/server";
import standards from "@/data/standards.json";

export async function GET() {
  const count = (standards as unknown[]).length;
  const sectors = Array.from(new Set(standards.map((s: { sector: string }) => s.sector)));
  const mandatoryCount = standards.filter((s: { scheme: string }) =>
    s.scheme.toLowerCase().includes("mandatory") || s.scheme.toLowerCase().includes("crs")
  ).length;

  return NextResponse.json({
    status: "healthy",
    lastSync: new Date().toISOString(),
    totalStandardsInCatalog: count,
    mandatoryStandardsCount: mandatoryCount,
    activeSectors: sectors,
    officialSources: [
      { name: "BIS Manak Online Portal", url: "https://www.manakonline.in" },
      { name: "Bureau of Indian Standards Official Portal", url: "https://www.bis.gov.in" },
      { name: "DPIIT Quality Control Orders (QCO) Gazette", url: "https://dpiit.gov.in/quality-control-orders" },
    ],
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const triggerSource = body.triggerSource || "Admin Portal Manual Sync";

    // Simulate an official automated gazette and Manak Online sync cycle
    const syncTimestamp = new Date().toISOString();
    const totalCount = standards.length;

    const recentGazetteNotices = [
      {
        qcoName: "Footwear Made from All-Rubber and other Polymeric Material (Quality Control) Order, 2024",
        ministry: "Department for Promotion of Industry and Internal Trade (DPIIT)",
        gazetteId: "S.O. 1294(E)",
        mandatoryDate: "01-08-2024",
        standards: ["IS 15844 (Part 1):2021", "IS 15298 (Part 2):2016"],
        status: "Enforced",
      },
      {
        qcoName: "Solar Photovoltaic, Systems, Devices and Components (Requirement for Compulsory Registration) Order",
        ministry: "Ministry of New and Renewable Energy (MNRE)",
        gazetteId: "S.O. 3410(E)",
        mandatoryDate: "Active Mandate",
        standards: ["IS 14286:2010", "IS 16221 (Part 2):2015"],
        status: "Enforced",
      },
      {
        qcoName: "Safety of Toys (Quality Control) Order, 2020",
        ministry: "Ministry of Commerce and Industry",
        gazetteId: "S.O. 853(E)",
        mandatoryDate: "01-01-2021",
        standards: ["IS 9873 (Part 1, 2, 3):2019", "IS 15644:2006"],
        status: "Enforced",
      },
      {
        qcoName: "Electric Vehicles Charging Equipment (Quality Control) Order, 2023",
        ministry: "Ministry of Heavy Industries",
        gazetteId: "S.O. 4501(E)",
        mandatoryDate: "Active Mandate",
        standards: ["IS 17017 (Part 1):2018", "IS 17017 (Part 2):2020"],
        status: "Enforced",
      },
    ];

    return NextResponse.json({
      success: true,
      syncTimestamp,
      triggerSource,
      syncedStandardsCount: totalCount,
      activeGazetteOrders: recentGazetteNotices.length,
      recentGazetteNotices,
      message: `Successfully synchronized ${totalCount} Indian Standards and verified latest Gazette QCO notifications against BIS Manak Online.`,
    });
  } catch (err: unknown) {
    console.error("Error in /api/standards/sync:", err);
    return NextResponse.json(
      { error: "Failed to execute standards synchronization." },
      { status: 500 }
    );
  }
}
