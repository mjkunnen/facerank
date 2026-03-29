"use client";

import { useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

/* ───── Quiz Data ───── */

const QUIZ = [
  {
    question: "I am",
    layout: "gender" as const,
    options: [
      { label: "Male", icon: "male" },
      { label: "Female", icon: "female" },
    ],
    key: "gender",
  },
  {
    question: "How old are you?",
    layout: "list" as const,
    options: [
      { label: "12 – 15" },
      { label: "16 – 20" },
      { label: "21 – 25" },
      { label: "26 – 30" },
      { label: "31 – 40" },
      { label: "40+" },
    ],
    key: "age",
  },
  {
    question: "What's your goal?",
    layout: "list" as const,
    options: [
      { label: "Rate my face" },
      { label: "Improve my appearance" },
      { label: "Find my best features" },
      { label: "Boost my confidence" },
    ],
    key: "goal",
  },
  {
    question: "What interests you?",
    sub: "Pick as many as you like",
    layout: "multi" as const,
    options: [
      { label: "Face score" },
      { label: "Best countries for me" },
      { label: "Heritage match" },
      { label: "Glow-up plan" },
      { label: "Best hairstyle" },
      { label: "Face heat map" },
    ],
    key: "interests",
  },
];

const FEATURES = [
  { icon: "shutter_speed", title: "Face Score", desc: "Rated across 6 attributes" },
  { icon: "public", title: "World Rankings", desc: "Top 10 countries for you" },
  { icon: "genetics", title: "Heritage Match", desc: "Your ancestry breakdown" },
  { icon: "trending_up", title: "Glow-Up Plan", desc: "Steps to maximize potential" },
  { icon: "content_cut", title: "Best Hairstyle", desc: "AI-matched to your shape" },
  { icon: "grid_view", title: "Heat Map", desc: "Your strongest facial zones" },
];

const HERITAGE = [
  { name: "Greek", pct: 34 },
  { name: "Italian", pct: 28 },
  { name: "Turkish", pct: 18 },
  { name: "Spanish", pct: 12 },
  { name: "French", pct: 8 },
];

const GLOWUP_CARDS = [
  { title: "Skincare routine", difficulty: "Easy", color: "#00C853", icon: "spa", desc: "Clearer skin adds +0.4 to your score" },
  { title: "Hairstyle change", difficulty: "Medium", color: "#448AFF", icon: "face_retouching_natural", desc: "Better frame for your face shape" },
  { title: "Jawline exercises", difficulty: "Hard", color: "#FF5252", icon: "exercise", desc: "Define your strongest feature" },
];

/* ───── Component ───── */

export default function ScanPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [multiSelect, setMultiSelect] = useState<string[]>([]);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [vis, setVis] = useState(true);

  const TOTAL = 10;
  const progress = ((step + 1) / TOTAL) * 100;

  /* navigation */
  const advance = () => {
    setVis(false);
    setTimeout(() => {
      setStep((s) => s + 1);
      setVis(true);
    }, 200);
  };

  /* quiz handlers */
  const pick = (q: (typeof QUIZ)[number], val: string) => {
    if (q.layout === "multi") {
      setMultiSelect((p) =>
        p.includes(val) ? p.filter((v) => v !== val) : [...p, val]
      );
    } else {
      setAnswers((p) => ({ ...p, [q.key]: val }));
      setTimeout(advance, 250);
    }
  };

  /* image upload */
  const processImage = useCallback((file: File) => {
    setError(null);
    setLoading(true);
    if (!file.type.startsWith("image/")) {
      setError("Upload an image file.");
      setLoading(false);
      return;
    }
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.src = url;
    img.onload = () => {
      const MAX = 1024;
      const s = Math.min(MAX / img.width, MAX / img.height, 1);
      const c = document.createElement("canvas");
      c.width = img.width * s;
      c.height = img.height * s;
      c.getContext("2d")!.drawImage(img, 0, 0, c.width, c.height);
      const d = c.toDataURL("image/jpeg", 0.85);
      setPreview(d);
      sessionStorage.setItem("facerank_image", d);
      URL.revokeObjectURL(url);
      setLoading(false);
    };
  }, []);

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) processImage(e.target.files[0]);
  };

  const useDemo = () => {
    const c = document.createElement("canvas");
    c.width = 512;
    c.height = 512;
    const ctx = c.getContext("2d")!;
    const g = ctx.createRadialGradient(256, 230, 60, 256, 256, 240);
    g.addColorStop(0, "#e8c9a0");
    g.addColorStop(1, "#c4956a");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 512, 512);
    ctx.fillStyle = "#555";
    ctx.beginPath();
    ctx.arc(200, 215, 8, 0, Math.PI * 2);
    ctx.arc(312, 215, 8, 0, Math.PI * 2);
    ctx.fill();
    const d = c.toDataURL("image/jpeg", 0.85);
    setPreview(d);
    sessionStorage.setItem("facerank_image", d);
  };

  const isQuiz = step < QUIZ.length;         // 0-3
  const isFeatures = step === 4;
  const isRankings = step === 5;
  const isHeritage = step === 6;
  const isHeatmap = step === 7;
  const isGlowup = step === 8;
  const isUpload = step === 9;

  return (
    <main className="relative flex flex-col min-h-dvh overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 px-7 h-[96px] flex items-center justify-between max-w-[400px] left-1/2 -translate-x-1/2 bg-[#08080C]">
        <div className="flex items-center justify-center w-10 h-10">
          {step > 0 && (
            <button onClick={() => { setVis(false); setTimeout(() => { setStep(s => s - 1); setVis(true); }, 200); }} className="transition-opacity active:scale-95">
              <span className="material-symbols-outlined text-[#7C4DFF]">arrow_back</span>
            </button>
          )}
        </div>
        <h1 className="font-headline font-black text-xl tracking-widest bg-gradient-to-r from-[#7C4DFF] to-[#448AFF] bg-clip-text text-transparent uppercase">FaceRank</h1>
        <div className="w-10"></div>
        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/5">
          <div
            className="h-full progress-bar-gradient transition-all duration-1000 ease-in-out shadow-[0_0_10px_rgba(124,77,255,0.5)]"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </header>

      {/* Content wrapper */}
      <div
        className="relative z-10 flex-1 flex flex-col w-full max-w-[400px] mx-auto px-7 pt-[140px] pb-12"
        style={{
          opacity: vis ? 1 : 0,
          transform: vis ? "translateY(0)" : "translateY(10px)",
          transition: "opacity 0.3s cubic-bezier(.22,1,.36,1), transform 0.3s cubic-bezier(.22,1,.36,1)",
        }}
      >
        {/* ════════ STEP 0: GENDER ════════ */}
        {isQuiz && step === 0 && (() => {
          const q = QUIZ[0];
          return (
            <>
              {/* Dramatic Headline */}
              <div className="w-full mb-12 text-left">
                <p className="text-[#7C4DFF] font-label font-bold text-[11px] uppercase tracking-[0.3em] mb-2 opacity-80">Identification</p>
                <h2 className="text-[64px] font-black text-white tracking-[-0.05em] leading-[0.9] text-glow">
                  I am
                </h2>
              </div>
              {/* Character Selection Grid */}
              <div className="w-full space-y-6">
                {/* Male */}
                <button
                  onClick={() => pick(q, "Male")}
                  className={`premium-card w-full rounded-2xl py-12 px-8 flex items-center justify-between group ${answers[q.key] === "Male" ? "selected" : ""}`}
                >
                  <div className="card-glow"></div>
                  <div className="flex flex-col items-start">
                    <span className="text-[28px] font-bold text-white group-active:text-white mb-1 transition-colors">Male</span>
                    <span className="text-[10px] font-label font-medium uppercase tracking-[0.2em] text-white/30 group-active:text-white/60">Tap to select identity</span>
                  </div>
                  <div className="relative">
                    <div className="shape-male opacity-40 group-active:opacity-100 group-active:scale-110 transition-all duration-500"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="material-symbols-outlined text-white/40 text-2xl">male</span>
                    </div>
                  </div>
                </button>
                {/* Female */}
                <button
                  onClick={() => pick(q, "Female")}
                  className={`premium-card w-full rounded-2xl py-12 px-8 flex items-center justify-between group ${answers[q.key] === "Female" ? "selected" : ""}`}
                >
                  <div className="card-glow"></div>
                  <div className="flex flex-col items-start">
                    <span className="text-[28px] font-bold text-white group-active:text-white mb-1 transition-colors">Female</span>
                    <span className="text-[10px] font-label font-medium uppercase tracking-[0.2em] text-white/30 group-active:text-white/60">Tap to select identity</span>
                  </div>
                  <div className="relative">
                    <div className="shape-female opacity-40 group-active:opacity-100 group-active:scale-110 transition-all duration-500"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="material-symbols-outlined text-white/40 text-2xl">female</span>
                    </div>
                  </div>
                </button>
              </div>
              {/* Decorative Spacer */}
              <div className="flex-grow"></div>
              {/* Contextual Hint */}
              <div className="text-center mt-12 px-4">
                <p className="font-body text-[12px] text-white/30 tracking-wide leading-relaxed italic">
                  Our neural engine requires gender identification to accurately map 128 unique facial landmarks.
                </p>
              </div>
            </>
          );
        })()}

        {/* ════════ STEP 1: AGE ════════ */}
        {isQuiz && step === 1 && (() => {
          const q = QUIZ[1];
          return (
            <>
              {/* Progress Bar Section */}
              <div className="w-full h-[3px] bg-white/10 rounded-full mb-[60px] relative">
                <div className="absolute top-0 left-0 h-full w-1/4 bg-gradient-to-r from-[#7C4DFF] to-[#448AFF] rounded-full progress-glow"></div>
              </div>
              {/* Headline */}
              <div className="mb-[32px]">
                <h2 className="text-[24px] font-semibold text-white tracking-tight leading-tight">How old are you?</h2>
              </div>
              {/* Age Options Container */}
              <div className="flex flex-col gap-3 flex-grow">
                {q.options.map((opt) => {
                  const sel = answers[q.key] === opt.label;
                  return (
                    <button
                      key={opt.label}
                      onClick={() => pick(q, opt.label)}
                      className={`w-full h-[48px] ${sel ? "glass-card-selected border-[#7C4DFF]/30" : "glass-card border-white/5 hover:bg-white/5"} rounded-lg flex items-center ${sel ? "justify-between" : ""} px-6 transition-all duration-300 group border`}
                    >
                      <span className={`text-[15px] font-medium ${sel ? "text-white" : "text-white/60 group-hover:text-white"} transition-colors`}>{opt.label}</span>
                      {sel && (
                        <span className="material-symbols-outlined text-[#7C4DFF] text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                      )}
                    </button>
                  );
                })}
              </div>
              {/* Bottom CTA */}
              <div className="mt-auto pt-8">
                <button
                  onClick={() => { if (answers[q.key]) advance(); }}
                  className="w-full h-[56px] rounded-xl bg-gradient-to-r from-[#7C4DFF] to-[#448AFF] flex items-center justify-center font-semibold text-white tracking-wide active:scale-[0.98] transition-all shadow-[0_8px_24px_rgba(124,77,255,0.3)]"
                >
                  Continue
                </button>
                <p className="text-[11px] text-white/20 text-center mt-4 font-label uppercase tracking-widest">Step 1 of 4</p>
              </div>
            </>
          );
        })()}

        {/* ════════ STEP 2: GOAL ════════ */}
        {isQuiz && step === 2 && (() => {
          const q = QUIZ[2];
          return (
            <>
              {/* Progress Bar Section */}
              <div className="w-full h-[3px] bg-white/10 rounded-full mb-[60px] relative">
                <div className="absolute top-0 left-0 h-full w-2/4 bg-gradient-to-r from-[#7C4DFF] to-[#448AFF] rounded-full progress-glow"></div>
              </div>
              {/* Headline */}
              <div className="mb-[32px]">
                <h2 className="text-[24px] font-semibold text-white tracking-tight leading-tight">What&apos;s your goal?</h2>
              </div>
              <div className="flex flex-col gap-3 flex-grow">
                {q.options.map((opt) => {
                  const sel = answers[q.key] === opt.label;
                  return (
                    <button
                      key={opt.label}
                      onClick={() => pick(q, opt.label)}
                      className={`w-full h-[48px] ${sel ? "glass-card-selected border-[#7C4DFF]/30" : "glass-card border-white/5 hover:bg-white/5"} rounded-lg flex items-center ${sel ? "justify-between" : ""} px-6 transition-all duration-300 group border`}
                    >
                      <span className={`text-[15px] font-medium ${sel ? "text-white" : "text-white/60 group-hover:text-white"} transition-colors`}>{opt.label}</span>
                      {sel && (
                        <span className="material-symbols-outlined text-[#7C4DFF] text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                      )}
                    </button>
                  );
                })}
              </div>
              <div className="mt-auto pt-8">
                <p className="text-[11px] text-white/20 text-center mt-4 font-label uppercase tracking-widest">Step 2 of 4</p>
              </div>
            </>
          );
        })()}

        {/* ════════ STEP 3: INTERESTS (MULTI) ════════ */}
        {isQuiz && step === 3 && (() => {
          const q = QUIZ[3];
          return (
            <>
              {/* Progress Bar Section */}
              <div className="w-full h-[3px] bg-white/10 rounded-full mb-[60px] relative">
                <div className="absolute top-0 left-0 h-full w-3/4 bg-gradient-to-r from-[#7C4DFF] to-[#448AFF] rounded-full progress-glow"></div>
              </div>
              {/* Headline */}
              <div className="mb-[32px]">
                <h2 className="text-[24px] font-semibold text-white tracking-tight leading-tight">What interests you?</h2>
                <p className="text-[13px] text-white/25 mt-1">Pick as many as you like</p>
              </div>
              <div className="flex flex-col gap-3 flex-grow">
                {q.options.map((opt) => {
                  const sel = multiSelect.includes(opt.label);
                  return (
                    <button
                      key={opt.label}
                      onClick={() => pick(q, opt.label)}
                      className={`w-full h-[48px] ${sel ? "glass-card-selected border-[#7C4DFF]/30" : "glass-card border-white/5 hover:bg-white/5"} rounded-lg flex items-center ${sel ? "justify-between" : ""} px-6 transition-all duration-300 group border`}
                    >
                      <span className={`text-[15px] font-medium ${sel ? "text-white" : "text-white/60 group-hover:text-white"} transition-colors`}>{opt.label}</span>
                      {sel && (
                        <span className="material-symbols-outlined text-[#7C4DFF] text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                      )}
                    </button>
                  );
                })}
              </div>
              {multiSelect.length > 0 && (
                <div className="mt-auto pt-8">
                  <button
                    onClick={() => {
                      setAnswers((p) => ({ ...p, [q.key]: multiSelect }));
                      advance();
                    }}
                    className="w-full h-[56px] rounded-xl bg-gradient-to-r from-[#7C4DFF] to-[#448AFF] flex items-center justify-center font-semibold text-white tracking-wide active:scale-[0.98] transition-all shadow-[0_8px_24px_rgba(124,77,255,0.3)]"
                  >
                    Continue
                  </button>
                  <p className="text-[11px] text-white/20 text-center mt-4 font-label uppercase tracking-widest">Step 3 of 4</p>
                </div>
              )}
            </>
          );
        })()}

        {/* ════════ STEP 4: SCORE OVERVIEW (04_score_overview.html) ════════ */}
        {isFeatures && (
          <>
            {/* Header Section */}
            <section className="mb-[32px]">
              <h2 className="text-[22px] font-semibold tracking-[-0.035em] mb-2">Your complete analysis</h2>
              <p className="text-[13px] text-white/40 font-medium">6 AI-powered insights about your face</p>
            </section>
            {/* Feature Grid (2x3) */}
            <div className="grid grid-cols-2 gap-[16px]">
              {FEATURES.map((f) => (
                <div key={f.title} className="bg-white/[0.03] p-4 rounded-[12px] transition-all duration-300 card-glow-hover border border-white/[0.02]">
                  <span className="material-symbols-outlined text-[#7C4DFF] mb-3 block text-[24px]">{f.icon}</span>
                  <h3 className="text-[14px] font-semibold mb-1">{f.title}</h3>
                  <p className="text-[11px] text-white/40 leading-tight">{f.desc}</p>
                </div>
              ))}
            </div>
            {/* Visual Teaser */}
            <div className="mt-[48px] relative overflow-hidden rounded-xl h-[120px] bg-white/[0.02] flex items-center justify-center">
              <div className="absolute inset-0 opacity-20 premium-gradient blur-3xl"></div>
              <div className="relative z-10 flex flex-col items-center">
                <span className="material-symbols-outlined text-white/20 text-[40px]" style={{ fontVariationSettings: "'FILL' 1" }}>face</span>
                <p className="text-[12px] text-white/20 font-label tracking-widest uppercase mt-2">Ready for analysis</p>
              </div>
            </div>
            {/* Bottom CTA */}
            <div className="mt-auto pt-8">
              <button
                onClick={advance}
                className="w-full premium-gradient h-[56px] rounded-xl flex items-center justify-center gap-2 shadow-[0_12px_24px_-8px_rgba(124,77,255,0.5)] active:scale-95 transition-all duration-200"
              >
                <span className="text-[16px] font-semibold tracking-tight">Scan my face</span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </button>
            </div>
          </>
        )}

        {/* ════════ STEP 5: WORLD MAP (05_world_map.html) ════════ */}
        {isRankings && (
          <>
            {/* Header Section */}
            <section className="mb-[48px]">
              <h1 className="text-[22px] font-semibold text-white mb-2 leading-tight tracking-tight">Where you&apos;d score highest</h1>
              <p className="text-[13px] text-white/40 leading-relaxed font-normal">Based on your features, hair color, eye color and facial structure</p>
            </section>
            {/* Hero Map Element */}
            <section className="relative aspect-[16/10] w-full mb-[56px] group">
              <div className="absolute inset-0 bg-gradient-to-b from-[#7C4DFF]/5 to-transparent rounded-3xl blur-3xl opacity-20"></div>
              {/* Stylized World Map SVG Container */}
              <div className="relative w-full h-full glass-card rounded-2xl flex items-center justify-center p-6 overflow-hidden border border-white/[0.03]">
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)", backgroundSize: "24px 24px" }}></div>
                {/* Placeholder for the stylized Mercator Map */}
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Glow Overlays (Absolute Positioned Markers) */}
                  <div className="absolute top-[65%] left-[28%] w-12 h-12 bg-[#7C4DFF]/40 rounded-full blur-xl" style={{ filter: "drop-shadow(0 0 12px rgba(124, 77, 255, 0.4))" }}></div>
                  <div className="absolute top-[40%] left-[52%] w-10 h-10 bg-[#448AFF]/40 rounded-full blur-xl" style={{ filter: "drop-shadow(0 0 12px rgba(68, 138, 255, 0.4))" }}></div>
                  <div className="absolute top-[48%] left-[62%] w-8 h-8 bg-[#26A69A]/40 rounded-full blur-xl" style={{ filter: "drop-shadow(0 0 12px rgba(38, 166, 154, 0.4))" }}></div>
                  {/* Data Scan Line */}
                  <div className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#7C4DFF]/50 to-transparent top-1/2 -translate-y-1/2 animate-pulse"></div>
                </div>
              </div>
              {/* Lat/Long Labels (Scientific Aesthetic) */}
              <div className="absolute -bottom-6 left-0 flex justify-between w-full px-2">
                <span className="text-[9px] font-label text-white/20 tracking-widest uppercase">SCAN_MODE_ACTIVE</span>
                <span className="text-[9px] font-label text-white/20 tracking-widest uppercase">LAT: 34.0522 N</span>
              </div>
            </section>
            {/* Insights Section */}
            <section className="space-y-4 mb-[48px]">
              <div className="glass-card p-4 rounded-xl border border-white/[0.03] flex items-center gap-4 group hover:bg-white/[0.06] transition-all">
                <div className="w-2 h-2 rounded-full bg-[#7C4DFF] shadow-[0_0_8px_rgba(124,77,255,0.6)]"></div>
                <p className="text-[15px] font-medium text-white/70">
                  <span className="text-white font-semibold">Blonde hair</span> scores <span className="text-[#7C4DFF]">+2.1</span> in South America
                </p>
              </div>
              <div className="glass-card p-4 rounded-xl border border-white/[0.03] flex items-center gap-4 group hover:bg-white/[0.06] transition-all">
                <div className="w-2 h-2 rounded-full bg-[#448AFF] shadow-[0_0_8px_rgba(68,138,255,0.6)]"></div>
                <p className="text-[15px] font-medium text-white/70">
                  <span className="text-white font-semibold">Blue eyes</span> valued highly in Southern Europe
                </p>
              </div>
              <div className="glass-card p-4 rounded-xl border border-white/[0.03] flex items-center gap-4 group hover:bg-white/[0.06] transition-all">
                <div className="w-2 h-2 rounded-full bg-[#26A69A] shadow-[0_0_8px_rgba(38,166,154,0.6)]"></div>
                <p className="text-[15px] font-medium text-white/70">
                  <span className="text-white font-semibold">Sharp jawline</span> preferred in Middle East
                </p>
              </div>
            </section>
            {/* Footer & Action */}
            <footer className="text-center mt-auto">
              <p className="text-[12px] text-white/25 mb-8 font-label tracking-wide">YOUR TOP 10 COUNTRIES REVEALED AFTER SCAN</p>
              <button
                onClick={advance}
                className="w-full h-[56px] rounded-full bg-gradient-to-r from-[#7C4DFF] to-[#448AFF] text-white font-semibold text-[16px] shadow-[0_10px_30px_rgba(124,77,255,0.3)] active:scale-95 transition-transform duration-200"
              >
                Continue
              </button>
            </footer>
          </>
        )}

        {/* ════════ STEP 6: HERITAGE (06_heritage.html) ════════ */}
        {isHeritage && (
          <>
            <div className="text-center mb-10">
              <h2 className="text-[20px] font-semibold text-white tracking-tight mb-2">Discover your heritage</h2>
              <p className="text-[13px] text-white/25">AI matches your facial structure to ancestries</p>
            </div>
            {/* Hero Visual: DNA Helix */}
            <div className="relative h-[200px] w-full flex items-center justify-center mb-[16px]">
              <div className="relative w-full h-full flex justify-center items-center opacity-90">
                {/* DNA Strands Simulation */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-32 h-48 border-l-4 border-r-4 border-[#7C4DFF]/20 rounded-[40%] rotate-12"></div>
                  <div className="absolute w-32 h-48 border-l-4 border-r-4 border-[#448AFF]/20 rounded-[40%] -rotate-12"></div>
                  {/* Nodes */}
                  <div className="absolute w-full h-full flex flex-col justify-between items-center py-4">
                    <div className="w-2 h-2 rounded-full dna-gradient shadow-[0_0_15px_#7C4DFF]"></div>
                    <div className="w-2 h-2 rounded-full dna-gradient shadow-[0_0_15px_#7C4DFF] translate-x-8"></div>
                    <div className="w-2 h-2 rounded-full dna-gradient shadow-[0_0_15px_#7C4DFF] -translate-x-8"></div>
                    <div className="w-2 h-2 rounded-full dna-gradient shadow-[0_0_15px_#7C4DFF] translate-x-4"></div>
                    <div className="w-2 h-2 rounded-full dna-gradient shadow-[0_0_15px_#7C4DFF] -translate-x-4"></div>
                  </div>
                </div>
                {/* Center Core Glow */}
                <div className="w-24 h-24 rounded-full bg-[#7C4DFF]/10 blur-[40px] animate-pulse"></div>
                <span className="material-symbols-outlined text-[80px] text-[#7C4DFF]" style={{ fontVariationSettings: "'FILL' 1" }}>genetics</span>
              </div>
            </div>
            {/* Heritage Cards Container */}
            <div className="flex flex-col gap-[10px] flex-grow">
              {/* Greek Card */}
              <div className="bg-white/[0.03] p-3 rounded-xl flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-4 bg-blue-600 rounded-sm overflow-hidden relative">
                      <div className="absolute inset-0 bg-white flex items-center justify-center">
                        <div className="w-full h-[2px] bg-blue-600"></div>
                        <div className="h-full w-[2px] bg-blue-600 absolute"></div>
                      </div>
                    </div>
                    <span className="text-[15px] font-medium text-white/60">Greek</span>
                  </div>
                  <span className="font-label text-[15px] text-white">34%</span>
                </div>
                <div className="h-[3px] w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full progress-gradient w-[34%]"></div>
                </div>
              </div>
              {/* Italian Card */}
              <div className="bg-white/[0.03] p-3 rounded-xl flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-4 flex rounded-sm overflow-hidden">
                      <div className="w-1/3 h-full bg-green-600"></div>
                      <div className="w-1/3 h-full bg-white"></div>
                      <div className="w-1/3 h-full bg-red-600"></div>
                    </div>
                    <span className="text-[15px] font-medium text-white/60">Italian</span>
                  </div>
                  <span className="font-label text-[15px] text-white">28%</span>
                </div>
                <div className="h-[3px] w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full progress-gradient w-[28%]"></div>
                </div>
              </div>
              {/* Turkish Card */}
              <div className="bg-white/[0.03] p-3 rounded-xl flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-4 bg-red-600 rounded-sm overflow-hidden relative">
                      <div className="absolute inset-0 flex items-center justify-center text-[10px] text-white">{"\u263E"}</div>
                    </div>
                    <span className="text-[15px] font-medium text-white/60">Turkish</span>
                  </div>
                  <span className="font-label text-[15px] text-white">18%</span>
                </div>
                <div className="h-[3px] w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full progress-gradient w-[18%]"></div>
                </div>
              </div>
              {/* Spanish Card */}
              <div className="bg-white/[0.03] p-3 rounded-xl flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-4 flex flex-col rounded-sm overflow-hidden">
                      <div className="h-1/4 bg-red-600 w-full"></div>
                      <div className="h-2/4 bg-yellow-500 w-full"></div>
                      <div className="h-1/4 bg-red-600 w-full"></div>
                    </div>
                    <span className="text-[15px] font-medium text-white/60">Spanish</span>
                  </div>
                  <span className="font-label text-[15px] text-white">12%</span>
                </div>
                <div className="h-[3px] w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full progress-gradient w-[12%]"></div>
                </div>
              </div>
              {/* French Card */}
              <div className="bg-white/[0.03] p-3 rounded-xl flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-4 flex rounded-sm overflow-hidden">
                      <div className="w-1/3 h-full bg-blue-800"></div>
                      <div className="w-1/3 h-full bg-white"></div>
                      <div className="w-1/3 h-full bg-red-600"></div>
                    </div>
                    <span className="text-[15px] font-medium text-white/60">French</span>
                  </div>
                  <span className="font-label text-[15px] text-white">8%</span>
                </div>
                <div className="h-[3px] w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full progress-gradient w-[8%]"></div>
                </div>
              </div>
            </div>
            {/* Continue Button */}
            <button
              onClick={advance}
              className="w-full h-14 bg-gradient-to-r from-[#7C4DFF] to-[#448AFF] rounded-xl font-semibold text-white mt-12 mb-4 hover:opacity-90 active:scale-[0.98] transition-all"
            >
              Continue
            </button>
          </>
        )}

        {/* ════════ STEP 7: HEAT MAP (07_diagnostic.html) ════════ */}
        {isHeatmap && (
          <>
            <div className="text-center mb-10">
              <h2 className="text-[22px] font-semibold tracking-tight text-white mb-2">Diagnostic Heat Map</h2>
              <p className="text-[13px] text-white/40 font-medium px-4">AI analysis of your primary facial structural zones</p>
            </div>
            {/* Heat Map Canvas */}
            <div className="relative w-full aspect-[3/4] flex items-center justify-center mb-10">
              {/* Background Decorative Glow */}
              <div className="absolute inset-0 bg-glow-purple rounded-full"></div>
              {/* Face Wireframe Container */}
              <div className="relative w-72 h-96 border border-white/10 rounded-[120px] flex items-center justify-center overflow-visible">
                {/* SVG Wireframe (Technical Grid) */}
                <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M50 10 Q 85 10 85 45 T 50 95 T 15 45 T 50 10" fill="none" stroke="white" strokeWidth="0.5"/>
                  <path d="M25 35 Q 50 30 75 35" fill="none" stroke="white" strokeWidth="0.2"/>
                  <path d="M20 50 Q 50 45 80 50" fill="none" stroke="white" strokeWidth="0.2"/>
                  <path d="M30 75 Q 50 85 70 75" fill="none" stroke="white" strokeWidth="0.2"/>
                  <line x1="50" y1="10" x2="50" y2="95" stroke="white" strokeWidth="0.2"/>
                </svg>
                {/* Thermal Zones */}
                {/* Forehead: Green (Strong) */}
                <div className="absolute top-12 w-40 h-16 bg-[#4ADE80] thermal-glow opacity-30 rounded-full"></div>
                {/* Eyes: Orange (Average) */}
                <div className="absolute top-36 left-14 w-12 h-6 bg-[#F59E0B] thermal-glow opacity-40 rounded-full"></div>
                <div className="absolute top-36 right-14 w-12 h-6 bg-[#F59E0B] thermal-glow opacity-40 rounded-full"></div>
                {/* Nose: Green (Strong) */}
                <div className="absolute top-[168px] w-8 h-24 bg-[#4ADE80] thermal-glow opacity-40 rounded-full"></div>
                {/* Cheekbones: Red (Weak) */}
                <div className="absolute top-[208px] left-10 w-14 h-14 bg-[#EF4444] thermal-glow opacity-30 rounded-full"></div>
                <div className="absolute top-[208px] right-10 w-14 h-14 bg-[#EF4444] thermal-glow opacity-30 rounded-full"></div>
                {/* Jawline: Orange (Average) */}
                <div className="absolute bottom-10 w-48 h-12 bg-[#F59E0B] thermal-glow opacity-30 rounded-full"></div>
                {/* Labels and Pointers */}
                {/* Forehead Label */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
                  <span className="zone-label text-[#4ADE80]">Forehead</span>
                  <div className="w-[1px] h-6 bg-[#4ADE80]/40 mt-1"></div>
                </div>
                {/* Eyes Label */}
                <div className="absolute top-32 -left-12 flex items-center">
                  <span className="zone-label text-[#F59E0B]">Eyes</span>
                  <div className="w-8 h-[1px] bg-[#F59E0B]/40 ml-1"></div>
                </div>
                {/* Cheekbones Label */}
                <div className="absolute top-56 -right-16 flex items-center">
                  <div className="w-8 h-[1px] bg-[#EF4444]/40 mr-1"></div>
                  <span className="zone-label text-[#EF4444]">Cheekbones</span>
                </div>
                {/* Skin Label */}
                <div className="absolute top-1/2 -left-12 -translate-y-1/2 flex items-center">
                  <span className="zone-label text-[#4ADE80]">Skin</span>
                  <div className="w-6 h-[1px] bg-[#4ADE80]/40 ml-1"></div>
                </div>
                {/* Nose Label */}
                <div className="absolute top-1/2 -right-12 -translate-y-1/2 flex items-center">
                  <div className="w-6 h-[1px] bg-[#4ADE80]/40 mr-1"></div>
                  <span className="zone-label text-[#4ADE80]">Nose</span>
                </div>
                {/* Jawline Label */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
                  <div className="w-[1px] h-6 bg-[#F59E0B]/40 mb-1"></div>
                  <span className="zone-label text-[#F59E0B]">Jawline</span>
                </div>
              </div>
              {/* Scanning Line Effect */}
              <div className="absolute inset-x-4 h-[2px] bg-gradient-to-r from-transparent via-[#7C4DFF]/60 to-transparent shadow-[0_0_15px_rgba(124,77,255,0.5)] z-10 pointer-events-none" style={{ animation: "scan-heatmap 3s linear infinite" }}></div>
            </div>
            {/* Simplified Legend Section */}
            <div className="w-full grid grid-cols-3 gap-3 mb-8">
              <div className="flex flex-col items-center p-3 bg-white/[0.03] rounded-xl border border-white/5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#4ADE80] shadow-[0_0_8px_#4ADE80] mb-2"></div>
                <span className="text-[10px] uppercase font-bold text-white/40 tracking-widest mb-1">Strong</span>
                <span className="font-label text-lg font-bold text-white leading-none">3</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-white/[0.03] rounded-xl border border-white/5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] shadow-[0_0_8px_#F59E0B] mb-2"></div>
                <span className="text-[10px] uppercase font-bold text-white/40 tracking-widest mb-1">Average</span>
                <span className="font-label text-lg font-bold text-white leading-none">3</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-white/[0.03] rounded-xl border border-white/5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444] shadow-[0_0_8px_#EF4444] mb-2"></div>
                <span className="text-[10px] uppercase font-bold text-white/40 tracking-widest mb-1">Needs Work</span>
                <span className="font-label text-lg font-bold text-white leading-none">1</span>
              </div>
            </div>
            {/* Primary CTA */}
            <div className="mt-auto pt-4">
              <button
                onClick={advance}
                className="w-full h-14 bg-gradient-to-r from-[#7C4DFF] to-[#448AFF] text-white font-semibold rounded-2xl shadow-[0_10px_30px_rgba(124,77,255,0.3)] active:scale-95 transition-all duration-200"
              >
                View Full Report
              </button>
            </div>
          </>
        )}

        {/* ════════ STEP 8: GLOW-UP (08_glowup.html) ════════ */}
        {isGlowup && (
          <>
            {/* Header Section */}
            <section className="mb-12">
              <h2 className="text-[22px] font-semibold tracking-tight text-white mb-2">Your glow-up roadmap</h2>
              <p className="text-[13px] text-white/40 leading-relaxed">Personalized steps to maximize your potential</p>
            </section>
            {/* Score Comparison Section */}
            <section className="mb-16 relative">
              <div className="flex items-center justify-between relative">
                {/* Current Score */}
                <div className="flex flex-col items-center">
                  <span className="text-[11px] font-label font-medium uppercase tracking-[0.1em] text-white/25 mb-3">Now</span>
                  <div className="w-24 h-24 rounded-full border border-white/5 flex items-center justify-center glass-card">
                    <span className="text-[32px] font-label font-semibold text-white/90">7.4</span>
                  </div>
                </div>
                {/* Connector Line */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-full px-20">
                  <div className="w-full h-[1px] bg-gradient-to-r from-white/5 via-[#7C4DFF]/40 to-white/5 relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1">
                      <span className="material-symbols-outlined text-[#7C4DFF] text-sm" style={{ fontVariationSettings: "'wght' 700" }}>chevron_right</span>
                    </div>
                  </div>
                </div>
                {/* Potential Score */}
                <div className="flex flex-col items-center">
                  <span className="text-[11px] font-label font-medium uppercase tracking-[0.1em] text-[#7C4DFF] mb-3">Potential</span>
                  <div className="w-24 h-24 rounded-full border border-[#7C4DFF]/20 flex items-center justify-center glass-card shadow-[0_0_30px_rgba(124,77,255,0.15)]">
                    <span className="text-[32px] font-label font-semibold text-white glow-text">8.9</span>
                  </div>
                </div>
              </div>
            </section>
            {/* Improvement Cards Stack */}
            <section className="space-y-4">
              {GLOWUP_CARDS.map((card) => (
                <div key={card.title} className="glass-card rounded-xl p-5 border border-white/[0.02] flex items-start gap-4 hover:bg-white/[0.05] transition-colors duration-300">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: card.color + "1A" }}>
                    <span className="material-symbols-outlined" style={{ color: card.color, fontVariationSettings: "'FILL' 1" }}>{card.icon}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-[15px] font-medium text-white/90">{card.title}</h3>
                      <span className="text-[10px] font-label font-bold uppercase px-2 py-0.5 rounded-full tracking-wider" style={{ backgroundColor: card.color + "33", color: card.color }}>{card.difficulty}</span>
                    </div>
                    <p className="text-[13px] text-white/60 leading-tight">{card.desc}</p>
                  </div>
                </div>
              ))}
            </section>
            {/* Subtle AI Analysis visualization */}
            <section className="mt-16 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.05]">
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 rounded-full bg-[#7C4DFF]/20 border border-[#08080C] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[12px] text-[#7C4DFF]">auto_awesome</span>
                  </div>
                </div>
                <span className="text-[12px] text-white/30 font-label">Analysis based on 42 biometric facial markers</span>
              </div>
            </section>
            {/* CTA */}
            <div className="mt-auto pt-8">
              <button
                onClick={advance}
                className="w-full h-[56px] rounded-[16px] bg-gradient-to-r from-[#7C4DFF] to-[#448AFF] flex items-center justify-center shadow-[0_0_20px_rgba(124,77,255,0.3)] hover:brightness-110 transition-all active:scale-[0.98] duration-200"
              >
                <span className="font-body font-medium text-[15px] text-white mr-2">Continue</span>
                <span className="material-symbols-outlined text-white">arrow_forward</span>
              </button>
            </div>
          </>
        )}

        {/* ════════ STEP 9: UPLOAD (09_selfie_upload.html) ════════ */}
        {isUpload && (
          <div className="flex-1 flex flex-col items-center">
            {!preview ? (
              <>
                {/* Progress Indicator */}
                <div className="w-full mb-20">
                  <div className="w-full h-[3px] bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full w-[80%] bg-gradient-to-r from-[#7C4DFF] to-[#448AFF] rounded-full"></div>
                  </div>
                </div>
                {/* Headline Section */}
                <div className="text-center mb-12">
                  <h2 className="text-[22px] font-semibold tracking-[-0.035em] text-white">One selfie. Instant results.</h2>
                  <p className="text-[13px] text-white/40 mt-1">Takes 2 seconds — get your full analysis immediately</p>
                </div>
                {/* Upload Zone */}
                <div className="relative group cursor-pointer active:scale-95 transition-transform duration-200" onClick={() => fileInputRef.current?.click()}>
                  <div className="w-[170px] aspect-[3/4] upload-dashed flex flex-col items-center justify-center bg-white/[0.03] hover:bg-white/[0.05] transition-colors duration-300">
                    <span className="material-symbols-outlined text-white/20 mb-3 text-3xl">add_a_photo</span>
                    <span className="text-[13px] font-medium text-white/40">Tap to upload</span>
                  </div>
                  {/* Visual Accent: Glass Reflection */}
                  <div className="absolute inset-0 rounded-[24px] pointer-events-none bg-gradient-to-br from-white/5 to-transparent opacity-50"></div>
                </div>
                {/* Secondary Actions & Trust */}
                <div className="mt-8 flex flex-col items-center gap-6">
                  <button onClick={useDemo} className="text-[12px] font-medium text-white/15 hover:text-white/40 transition-colors uppercase tracking-widest">
                    Try with demo photo
                  </button>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.02]">
                      <span className="material-symbols-outlined text-[14px] text-white/40">lock</span>
                      <span className="text-[12px] text-white/40">Not stored</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.02]">
                      <span className="material-symbols-outlined text-[14px] text-white/40">bolt</span>
                      <span className="text-[12px] text-white/40">Instant</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.02]">
                      <span className="material-symbols-outlined text-[14px] text-white/40">center_focus_strong</span>
                      <span className="text-[12px] text-white/40">AI-powered</span>
                    </div>
                  </div>
                </div>
                {/* Filler Space to push footer */}
                <div className="flex-grow min-h-[120px]"></div>
                {/* Privacy Disclaimer */}
                <footer className="pb-12 pt-8">
                  <p className="text-[10px] text-white/10 text-center tracking-tight">
                    Your photo is analyzed locally and never saved
                  </p>
                </footer>
              </>
            ) : (
              <>
                {/* Preview */}
                <div className="text-center mb-8">
                  <h2 className="text-[22px] font-semibold tracking-[-0.035em] text-white">Looking good</h2>
                  <p className="text-[13px] text-white/40 mt-1">Ready to analyze your face</p>
                </div>
                <div className="relative w-[170px] aspect-[3/4] rounded-[24px] overflow-hidden ring-1 ring-white/[0.06] mb-12">
                  <img
                    src={preview}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <div className="scan-line" />
                  <button
                    onClick={() => {
                      setPreview(null);
                      sessionStorage.removeItem("facerank_image");
                    }}
                    className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/40 text-[10px] hover:text-white/70 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">close</span>
                  </button>
                </div>
                {/* CTA */}
                <div className="w-full mt-auto">
                  <button
                    onClick={() => router.push("/analyzing")}
                    className="w-full premium-gradient h-[56px] rounded-xl flex items-center justify-center gap-2 shadow-[0_12px_24px_-8px_rgba(124,77,255,0.5)] active:scale-95 transition-all duration-200"
                  >
                    <span className="text-[16px] font-semibold tracking-tight">Scan my face</span>
                    <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                  </button>
                </div>
              </>
            )}

            {error && (
              <p className="text-[#FF6B6B] text-[13px] mt-5">{error}</p>
            )}
          </div>
        )}
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="user"
        className="hidden"
        onChange={onFile}
      />

      {/* Background Decorative Elements */}
      <div className="fixed top-[-10%] right-[-10%] w-[60%] aspect-square bg-[#7C4DFF]/10 blur-[120px] -z-10 rounded-full pointer-events-none"></div>
      <div className="fixed bottom-[-5%] left-[-10%] w-[50%] aspect-square bg-[#448AFF]/5 blur-[100px] -z-10 rounded-full pointer-events-none"></div>
    </main>
  );
}
