import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const SYSTEM_PROMPT = `You are PrimeMog AI, a facial analysis engine. Analyze the provided selfie and return a JSON object with these exact fields. Be honest but encouraging. Scores should be realistic (most people score 5-8, very few score 9+).

Return ONLY valid JSON, no markdown, no explanation:

{
  "overall_score": 7.2,
  "percentile": 22,
  "tier": "Attractive",
  "scores": {
    "harmony": { "score": 7.4, "label": "Harmony" },
    "symmetry": { "score": 8.1, "label": "Symmetry" },
    "jawline": { "score": 6.8, "label": "Jawline" },
    "skin": { "score": 7.2, "label": "Skin Health" },
    "eyes": { "score": 7.8, "label": "Eye Area" },
    "bone_structure": { "score": 6.5, "label": "Bone Structure" }
  },
  "countries": [
    { "flag": "🇮🇹", "name": "Italy", "score": 8.9, "reason": "Facial symmetry match" },
    { "flag": "🇪🇸", "name": "Spain", "score": 8.7, "reason": "Hunter eyes preference" },
    { "flag": "🇺🇸", "name": "USA", "score": 8.4, "reason": "Masculine bone structure" },
    { "flag": "🇩🇪", "name": "Germany", "score": 8.1, "reason": "Angular facial features" },
    { "flag": "🇬🇧", "name": "UK", "score": 7.9, "reason": "Defined cheekbone structure" }
  ],
  "heritage": [
    { "name": "Greek", "percentage": 34, "features": "Sharp jawline · Deep-set eyes" },
    { "name": "Italian", "percentage": 28, "features": "Almond eyes · Strong brow ridge" },
    { "name": "Spanish", "percentage": 18, "features": "Defined chin · Warm skin tone" },
    { "name": "French", "percentage": 12, "features": "Narrow nose · Soft brow arch" },
    { "name": "German", "percentage": 8, "features": "Angular midface · High forehead" }
  ],
  "strong_points": [
    { "area": "Eye area", "detail": "symmetry & depth", "score": 8.1 },
    { "area": "Forehead", "detail": "proportional", "score": 7.9 }
  ],
  "weak_points": [
    { "area": "Mid face area", "detail": "proportion imbalance", "score": 5.8 },
    { "area": "Skin texture", "detail": "uneven tone", "score": 6.2 },
    { "area": "Jawline", "detail": "definition lacking", "score": 6.0 }
  ],
  "glowup": {
    "current": 7.2,
    "potential": 8.4,
    "steps": [
      { "name": "Debloat", "gain": 0.4, "tip": "Use gua sha facial massages" },
      { "name": "Skin routine", "gain": 0.7, "tip": "Retinol + SPF daily for 8 weeks" },
      { "name": "Face exercises", "gain": 1.1, "tip": "Targeted mewing and jaw exercises" }
    ]
  },
  "hairstyles": [
    { "rank": 1, "name": "Buzz Cut", "note": "masculine aesthetic" },
    { "rank": 2, "name": "Slicked Back", "note": "sharp professional" },
    { "rank": 3, "name": "Textured Fringe", "note": "oval face shape match" }
  ]
}

Adapt all scores, heritage, countries, hairstyles etc. to the ACTUAL face in the photo. Be specific to what you see. Country scores should reflect where that specific face type is most appreciated. Heritage should reflect actual facial bone structure similarities. Hairstyles should match the face shape you observe.`;

export async function POST(req: Request) {
  try {
    const { image } = await req.json();

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: [
            { type: "text", text: "Analyze this face. Return only the JSON." },
            { type: "image_url", image_url: { url: image, detail: "low" } },
          ],
        },
      ],
      max_tokens: 1500,
      temperature: 0.7,
    });

    const raw = response.choices[0]?.message?.content || "";
    // Strip markdown code fences if present
    const cleaned = raw.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const data = JSON.parse(cleaned);

    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error("Analysis error:", error);
    return NextResponse.json({ error: "Analysis failed" }, { status: 500 });
  }
}
