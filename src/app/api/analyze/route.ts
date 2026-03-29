import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { image } = await req.json();

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    // TODO: Integrate GPT-4o / Gemini Flash Vision API
    // For now, return mock data (same as client-side mock)
    // The real implementation will send the image to the Vision API
    // with the mega-prompt and return structured JSON

    return NextResponse.json({ error: "API not yet configured" }, { status: 501 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
