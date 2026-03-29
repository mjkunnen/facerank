"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const STATS = [
  { score: "8.1", label: "Jawline", visible: true, labelVisible: false, pct: 81 },
  { score: "7.8", label: "Eyes", visible: true, labelVisible: false, pct: 78 },
  { score: "7.4", label: "Harmony", visible: true, labelVisible: true, pct: 74 },
  { score: "7.2", label: "Cheeks", visible: true, labelVisible: false, pct: 72 },
  { score: "6.9", label: "\u2588\u2588\u2588\u2588\u2588", visible: false, labelVisible: false, pct: 69 },
  { score: "6.5", label: "\u2588\u2588\u2588\u2588\u2588", visible: false, labelVisible: false, pct: 65 },
];

const COUNTRIES = [
  { flag: "\u{1F1FA}\u{1F1F8}", name: "United States", score: "8.9", visible: false },
  { flag: "\u{1F1E7}\u{1F1F7}", name: "Brazil", score: "8.7", visible: false },
  { flag: "\u{1F1EA}\u{1F1F8}", name: "Spain", score: "8.4", visible: true },
  { flag: "\u{1F1EE}\u{1F1F9}", name: "Italy", score: "8.1", visible: false },
  { flag: "\u{1F1EB}\u{1F1F7}", name: "France", score: "7.9", visible: false },
];

export default function ResultsPage() {
  const router = useRouter();
  const unlockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("facerank_results");
    if (!raw) {
      router.replace("/scan");
    }
  }, [router]);

  const scrollToUnlock = () => {
    unlockRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="bg-[#08080C] text-white font-body selection:bg-[#7C4DFF]/30">
      {/* Top AppBar */}
      <header className="fixed top-0 w-full z-50 flex items-center justify-between px-7 h-24 max-w-[400px] mx-auto left-1/2 -translate-x-1/2 bg-[#08080C]/80 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-white/60 hover:opacity-80 transition-opacity cursor-pointer">menu</span>
          <h1 className="text-xl font-black tracking-tighter text-white uppercase font-headline">FACERANK</h1>
        </div>
        <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 bg-white/5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="User profile"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgsbs8x3hE9vkfVN6LM8g0s9pzj90D2dPg8trH_LhKkXE07Hh8Sl_FVnqDGP6nkXh3ka5rmMxpDt3-SK_DVGyDWUDB7pUZME-zOQPpnTPNSK9DLJxkBCzUQ1gFIPNtR2dhPOj5yspAIkKgYvfwsZHpW4Ua6Dd8evbSrzG6OC7TSZoccLlpMOSOSAY4vDcrLYfcmP-EgubPkJwCrBNfW9nVSqO992_b-Tw3oPYn6m_gemLCncgfE0gdDq8OoUOfHhK8-P2rbAby467C"
            className="w-full h-full object-cover"
          />
        </div>
      </header>

      {/* Main Content Scroll Area */}
      <div className="relative w-full max-w-[400px] mx-auto pt-28 pb-48 px-7 min-h-screen">
        {/* FIFA Card Section */}
        <div className="relative rounded-[32px] overflow-hidden bg-gradient-to-b from-white/5 to-transparent p-[1px]">
          <div className="rounded-[32px] bg-[#0A0A0F] p-8 fifa-shimmer border border-white/5">
            {/* Score Header */}
            <div className="flex items-end justify-between mb-2">
              <div className="flex items-baseline gap-0">
                <span className="text-[32px] font-bold text-white tracking-tighter leading-none">7.</span>
                <span className="text-[32px] font-bold text-white/40 heavy-blur leading-none">4</span>
                <span className="text-[14px] text-white/25 ml-2 font-label">/ 10</span>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-white/30 uppercase tracking-widest font-label flex items-center justify-end gap-1">
                  Top <span className="text-blur">2</span>%
                </div>
                <div className="text-[10px] text-white/30 uppercase tracking-widest font-label">Attractive</div>
              </div>
            </div>

            <div className="h-[1px] w-full bg-white/5 my-6"></div>

            {/* Best Scores Grid */}
            <div className="space-y-4">
              <p className="text-[10px] text-white/25 uppercase tracking-[0.2em] font-label">Your best scores</p>
              <div className="grid grid-cols-2 gap-x-8 gap-y-6" onClick={scrollToUnlock}>
                {STATS.map((s) => {
                  const isBlurred = !s.visible;
                  return (
                    <div key={s.label + s.score} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-bold ${isBlurred ? "text-white/40 text-blur" : "text-white"} font-label`}>{s.score}</span>
                        <span className={`text-[10px] ${s.labelVisible ? "text-white/60 font-medium" : "text-white/40 text-blur"}`}>
                          {isBlurred ? s.label : (s.labelVisible ? s.label : s.label)}
                        </span>
                      </div>
                      <div className={`h-[3px] w-full bg-white/5 rounded-full overflow-hidden ${isBlurred ? "opacity-30" : ""}`}>
                        <div
                          className={`h-full ${isBlurred ? "bg-white/20" : "bg-gradient-to-r from-[#7C4DFF] to-[#448AFF]"}`}
                          style={{ width: `${s.pct}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="h-[1px] w-full bg-white/5 my-8"></div>

            {/* Countries Section */}
            <div className="space-y-5" onClick={scrollToUnlock}>
              <p className="text-[10px] text-white/25 uppercase tracking-[0.2em] font-label">{"\u{1F30D}"} Top 5 Countries</p>
              <div className="space-y-4">
                {COUNTRIES.map((c, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`text-[14px] ${!c.visible ? "text-blur opacity-50" : ""}`}>{c.flag}</span>
                      <span className={`text-[13px] ${c.visible ? "text-white/80" : "text-white/40 text-blur"} font-medium`}>{c.name}</span>
                    </div>
                    <span className="text-xs font-bold font-label">{c.score}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-[1px] w-full bg-white/5 my-8"></div>

            {/* Heritage Section */}
            <div className="space-y-4" onClick={scrollToUnlock}>
              <p className="text-[10px] text-white/25 uppercase tracking-[0.2em] font-label">{"\u{1F9EC}"} Heritage</p>
              <div className="flex items-center gap-3 text-[13px] font-medium overflow-hidden whitespace-nowrap">
                <span className="flex items-center gap-1.5">{"\u{1F1EC}\u{1F1F7}"} <span className="text-white/80">34%</span></span>
                <span className="text-white/10">&middot;</span>
                <span className="flex items-center gap-1.5">{"\u{1F1EE}\u{1F1F9}"} <span className="text-white/80">28%</span></span>
                <span className="text-white/10">&middot;</span>
                <span className="text-white/20 text-blur">{"\u2588\u2588"}% {"\u2588\u2588"}% {"\u2588\u2588"}%</span>
              </div>
            </div>

            {/* Additional Cards */}
            <div className="mt-10 space-y-3">
              {/* Heat Map Card */}
              <div className="relative h-[60px] w-full rounded-2xl overflow-hidden border border-white/5 group cursor-pointer" onClick={scrollToUnlock}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="Heatmap overlay"
                  className="absolute inset-0 w-full h-full object-cover blur-xl opacity-40 scale-110"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuChRqe3-LUOaMmPgKPqoTr6gsLaEVsUUf6D5fDGEk-we73Xzxpv5xt1QJ4VQ3W6hCsY2aJRc_GqQXstjVVeUOLIvfLizMazo39_lt0AzH3xR6nVc49Q66sEGcu9_gnOp5U4jTCcXqDIWIM4BL9J1OlfZ4GyyEVTXrH8YU5KeQEpnpXiyQE1wG8hLXnCcbInJwcBa3YN77F0aRhNLCf4jGow0nkZISbZbGC4026woG4wfdx4L0OHifJVR8bfgFNgnFulNe4S7cm2E7dc"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-between px-5">
                  <span className="text-[11px] font-bold uppercase tracking-widest font-label">{"\u{1F525}"} Heat Map</span>
                  <span className="material-symbols-outlined text-sm text-white/40">lock</span>
                </div>
              </div>
              {/* Glow Up Card */}
              <div className="flex items-center justify-between px-5 h-12 rounded-2xl bg-white/[0.03] border border-white/5 cursor-pointer" onClick={scrollToUnlock}>
                <span className="text-[11px] font-bold uppercase tracking-widest font-label">{"\u{1F4C8}"} Glow-Up</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-label text-white/60">7.<span className="text-blur">8</span> &rarr; 8.<span className="text-blur">2</span> potential</span>
                  <span className="material-symbols-outlined text-sm text-white/40">lock</span>
                </div>
              </div>
              {/* Hairstyle Card */}
              <div className="flex items-center justify-between px-5 h-12 rounded-2xl bg-white/[0.03] border border-white/5 cursor-pointer" onClick={scrollToUnlock}>
                <span className="text-[11px] font-bold uppercase tracking-widest font-label">{"\u{1F487}"} Hairstyle</span>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-white/20 text-blur">{"\u2588\u2588"}</span>
                  <span className="text-[10px] font-medium text-[#7C4DFF]">#2 Textured Fringe</span>
                  <span className="text-[10px] text-white/20 text-blur">{"\u2588\u2588"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Unlock anchor */}
        <div ref={unlockRef} />
      </div>

      {/* Bottom Actions Container */}
      <div className="fixed bottom-0 w-full max-w-[400px] left-1/2 -translate-x-1/2 z-[60] bg-gradient-to-t from-[#08080C] via-[#08080C]/95 to-transparent px-7 pb-10 pt-10">
        <div className="space-y-3">
          <button className="w-full h-14 rounded-2xl bg-gradient-to-br from-[#7C4DFF] to-[#448AFF] text-white font-bold text-[14px] shadow-[0_10px_40px_rgba(124,77,255,0.3)] flex flex-col items-center justify-center leading-tight active:scale-95 transition-transform">
            <span>Unlock Full Report</span>
            <span className="text-[10px] opacity-70 font-normal mt-0.5">$4.95/week &middot; Cancel anytime in 1 tap</span>
          </button>
          <button className="w-full h-14 rounded-2xl border border-white/10 bg-white/[0.02] text-white/60 font-medium text-[13px] hover:bg-white/[0.05] transition-colors active:scale-95">
            or invite 3 friends to unlock free
          </button>
        </div>
      </div>

      {/* Hidden Navigation Shell */}
      <nav className="fixed bottom-0 w-full z-40 flex justify-around items-center px-8 pb-8 pt-4 max-w-[400px] left-1/2 -translate-x-1/2 opacity-0 pointer-events-none">
        <div className="flex flex-col items-center justify-center text-white/30 p-3">
          <span className="material-symbols-outlined">genetics</span>
        </div>
        <div className="flex flex-col items-center justify-center bg-gradient-to-br from-[#7C4DFF] to-[#448AFF] text-white rounded-2xl p-3 shadow-[0_0_15px_rgba(124,77,255,0.4)]">
          <span className="material-symbols-outlined">style</span>
        </div>
        <div className="flex flex-col items-center justify-center text-white/30 p-3">
          <span className="material-symbols-outlined">star</span>
        </div>
        <div className="flex flex-col items-center justify-center text-white/30 p-3">
          <span className="material-symbols-outlined">person</span>
        </div>
      </nav>
    </main>
  );
}
