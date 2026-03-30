"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

const STEPS = [
  "Detecting landmarks",
  "Mapping structure",
  "Measuring symmetry",
  "Calculating ratios",
  "Evaluating skin",
  "Scoring by country",
  "Matching heritage",
  "Building plan",
  "Finalizing",
  "Done",
];

export default function AnalyzingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;
    const image = sessionStorage.getItem("facerank_image");
    if (!image) { router.replace("/scan"); return; }
    setImageUrl(image);

    const analyze = async () => {
      try {
        const res = await fetch("/api/analyze", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ image }) });
        if (res.ok) { sessionStorage.setItem("facerank_results", JSON.stringify(await res.json())); return; }
      } catch {}
      sessionStorage.setItem("facerank_results", JSON.stringify(getMockData()));
    };
    analyze();

    const s = setInterval(() => setStep((v) => (v < STEPS.length - 1 ? v + 1 : v)), 1200);
    const p = setInterval(() => setProgress((v) => (v >= 100 ? 100 : v + 0.8)), 100);
    const n = setTimeout(() => router.push("/results"), 13000);
    return () => { clearInterval(s); clearInterval(p); clearTimeout(n); };
  }, [router]);

  return (
    <main className="bg-[#08080C] text-white font-body antialiased min-h-screen overflow-hidden">
      {/* TopAppBar */}
      <header className="fixed top-0 left-0 w-full z-50 px-7 pt-12 flex justify-between items-center">
        <button className="text-[#7C4DFF] hover:opacity-100 transition-opacity active:scale-95 duration-200">
          <span className="material-symbols-outlined">close</span>
        </button>
        <h1 className="font-['Sora'] font-semibold tracking-[-0.035em] uppercase text-[13px] opacity-25 text-white">ANALYZING</h1>
        <div className="w-6"></div>
      </header>

      {/* Main Scanning Canvas */}
      <div className="flex flex-col items-center justify-center min-h-screen max-w-[400px] mx-auto px-7 relative">
        {/* Photo Scanner Container */}
        <div className="relative mb-6">
          {/* Corner Brackets */}
          <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-[#7C4DFF] rounded-tl-sm opacity-60"></div>
          <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-[#7C4DFF] rounded-tr-sm opacity-60"></div>
          <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-[#7C4DFF] rounded-bl-sm opacity-60"></div>
          <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-[#7C4DFF] rounded-br-sm opacity-60"></div>
          {/* Image Wrap */}
          <div className="w-[144px] h-[144px] rounded-2xl overflow-hidden relative shadow-[0_0_40px_rgba(124,77,255,0.15)] bg-white/5">
            {imageUrl && <img src={imageUrl} alt="User portrait for analysis" className="w-full h-full object-cover" />}
            {/* Scanning Line */}
            <div className="scan-line-analyzing absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#7C4DFF] to-transparent shadow-[0_0_12px_#7C4DFF] z-10"></div>
          </div>
        </div>

        {/* Progress Details */}
        <div className="flex flex-col items-center mt-[24px]">
          <p className="text-[14px] font-medium text-white/60 tracking-tight mb-4">{STEPS[step]}...</p>
          {/* Progress Bar Shell */}
          <div className="w-[224px] h-[3px] bg-white/10 rounded-full overflow-hidden mb-2">
            <div
              className="h-full bg-gradient-to-r from-[#7C4DFF] to-[#448AFF] rounded-full shadow-[0_0_10px_rgba(124,77,255,0.4)] transition-all duration-200"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          {/* Percentage */}
          <span className="font-mono text-[12px] text-white/40 tracking-widest">{Math.round(progress)}%</span>
        </div>
      </div>

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-8 pb-12 max-w-[400px] mx-auto bg-transparent">
        {/* History (Inactive) */}
        <button className="flex flex-col items-center justify-center text-white/20 hover:text-white/60 transition-colors">
          <span className="material-symbols-outlined text-[28px]">history</span>
        </button>
        {/* Face (Active) */}
        <button className="flex flex-col items-center justify-center text-white drop-shadow-[0_0_10px_rgba(124,77,255,0.5)] scale-110 duration-300">
          <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>face</span>
        </button>
        {/* Settings (Inactive) */}
        <button className="flex flex-col items-center justify-center text-white/20 hover:text-white/60 transition-colors">
          <span className="material-symbols-outlined text-[28px]">settings</span>
        </button>
      </nav>

      {/* Background Decoration */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#7C4DFF]/5 rounded-full blur-[120px]"></div>
      </div>
    </main>
  );
}

function getMockData() {
  return {
    score_card: { overall: 7.4, metrics: { jawline: { score: 6.2, color: "yellow", trend: "up" }, symmetry: { score: 8.1, color: "green", trend: "stable" }, skin: { score: 7.0, color: "green", trend: "up" }, eyes: { score: 7.8, color: "green", trend: "stable" }, proportions: { score: 6.5, color: "yellow", trend: "up" }, hair: { score: 7.2, color: "green", trend: "stable" } }, percentile: "Top 22% males 20-25", tier: "Gold" },
    heat_map: { strong_zones: ["eyes", "cheekbones"], problem_zones: ["jawline", "skin_texture", "nose_bridge"], zone_scores: { forehead: 7.5, eyes: 8.4, nose: 6.8, cheekbones: 8.0, jawline: 6.2, chin: 6.9, skin_texture: 6.5, lips: 7.3 } },
    glow_up: { current: 7.4, potential: 8.5, categories: [{ name: "Jawline", priority: 1, difficulty: "Easy", advice: "Mewing exercises and chewing gum — 3-6 months." }, { name: "Skin", priority: 2, difficulty: "Medium", advice: "Retinol + SPF 50 daily — 8-12 weeks." }, { name: "Hair", priority: 3, difficulty: "Easy", advice: "Textured fringe for your face shape." }] },
    world_map: { rankings: [{ rank: 1, country: "BR", name: "Brazil", score: 9.1, reason: "" }, { rank: 2, country: "CO", name: "Colombia", score: 8.9, reason: "" }, { rank: 3, country: "IT", name: "Italy", score: 8.4, reason: "" }, { rank: 4, country: "ES", name: "Spain", score: 8.2, reason: "" }, { rank: 5, country: "MX", name: "Mexico", score: 8.0, reason: "" }, { rank: 6, country: "TR", name: "Turkey", score: 7.8, reason: "" }, { rank: 7, country: "GR", name: "Greece", score: 7.6, reason: "" }, { rank: 8, country: "US", name: "United States", score: 7.4, reason: "" }, { rank: 9, country: "KR", name: "South Korea", score: 5.8, reason: "" }, { rank: 10, country: "JP", name: "Japan", score: 5.5, reason: "" }] },
    nationality: { guesses: [{ nationality: "Italian", percentage: 34, flag: "IT" }, { nationality: "Greek", percentage: 22, flag: "GR" }, { nationality: "Spanish", percentage: 18, flag: "ES" }, { nationality: "Turkish", percentage: 15, flag: "TR" }, { nationality: "Portuguese", percentage: 11, flag: "PT" }] },
    hairstyle: { face_shape: "oval", recommendations: [{ name: "Textured Fringe", match: 94 }, { name: "Buzz Cut Fade", match: 87 }, { name: "Slicked Back", match: 82 }, { name: "Curtain Bangs", match: 78 }, { name: "Crew Cut", match: 75 }] },
  };
}
