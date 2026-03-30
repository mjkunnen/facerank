"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PricingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [guess, setGuess] = useState(149);

  const sliderPct = ((guess - 10) / (249 - 10)) * 100;

  return (
    <main className="bg-[#08080C] text-white font-body min-h-dvh">
      {/* Step 0: Price Guess (11_price_guess.html) */}
      <div
        className="flex flex-col items-center"
        style={{
          opacity: step === 0 ? 1 : 0,
          transform: step === 0 ? "translateY(0)" : "translateY(-20px)",
          pointerEvents: step === 0 ? "auto" : "none",
          position: step === 0 ? "relative" : "absolute",
          transition: "all 0.5s ease",
        }}
      >
        {/* Top Navigation Bar */}
        <header className="w-full max-w-[400px] flex items-center justify-between px-[24px] pt-[60px] pb-[20px]">
          <h1 className="font-headline font-semibold text-[20px] tracking-tight text-white/90">Price Guess</h1>
          <div className="w-6"></div>
        </header>

        <div className="w-full max-w-[400px] flex-1 flex flex-col px-[24px] overflow-hidden">
          {/* Header Section */}
          <section className="mb-[24px]">
            <h2 className="text-[24px] font-bold text-white leading-[1.2] mb-3">How much do you think this would normally cost?</h2>
            <p className="text-[14px] text-white/40 leading-relaxed font-label">A complete AI face analysis like this usually costs...</p>
          </section>

          {/* Reference Cards */}
          <section className="space-y-3 mb-[40px]">
            <div className="flex justify-between items-center px-5 py-4 bg-white/[0.03] rounded-xl border border-white/[0.05]">
              <span className="text-[15px] font-medium text-white/60">MyHeritage DNA</span>
              <span className="text-[15px] font-bold text-white tracking-tight">$199</span>
            </div>
            <div className="flex justify-between items-center px-5 py-4 bg-white/[0.03] rounded-xl border border-white/[0.05]">
              <span className="text-[15px] font-medium text-white/60">Face scanning apps</span>
              <span className="text-[15px] font-bold text-white tracking-tight">$49&ndash;99/year</span>
            </div>
            <div className="flex justify-between items-center px-5 py-4 bg-white/[0.03] rounded-xl border border-white/[0.05]">
              <span className="text-[15px] font-medium text-white/60">Professional analysis</span>
              <span className="text-[15px] font-bold text-white tracking-tight">$200&ndash;500</span>
            </div>
          </section>

          {/* Interactive Slider Section */}
          <section className="flex-1 flex flex-col justify-center items-center py-4">
            <div className="mb-10 text-center">
              <span className="text-[48px] font-bold text-white tracking-tighter leading-none">${guess}</span>
            </div>
            <div className="w-full relative px-2 mb-4">
              {/* Custom Slider Track Background */}
              <div className="absolute top-1/2 left-2 right-2 h-[4px] -translate-y-1/2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#7C4DFF] to-[#448AFF]" style={{ width: `${sliderPct}%` }}></div>
              </div>
              <input
                className="price-slider relative w-full h-[4px] bg-transparent appearance-none cursor-pointer z-10"
                max={249}
                min={10}
                type="range"
                value={guess}
                onChange={(e) => setGuess(Number(e.target.value))}
              />
            </div>
            <p className="text-[11px] font-bold text-white/30 uppercase tracking-[0.2em] font-label">Drag to guess</p>
          </section>

          {/* CTA Section */}
          <footer className="w-full pb-[48px] pt-4">
            <button
              onClick={() => setStep(1)}
              className="w-full h-[60px] bg-gradient-to-r from-[#7C4DFF] to-[#448AFF] text-white font-bold text-[17px] rounded-full shadow-[0_12px_40px_rgba(124,77,255,0.4)] active:scale-[0.97] transition-all duration-200 flex items-center justify-center gap-2"
            >
              Reveal the price &rarr;
            </button>
          </footer>
        </div>
      </div>

      {/* Step 1: Free Reveal (12_free_reveal.html) */}
      <div
        style={{
          opacity: step === 1 ? 1 : 0,
          transform: step === 1 ? "translateY(0)" : "translateY(20px)",
          pointerEvents: step === 1 ? "auto" : "none",
          position: step === 1 ? "relative" : "absolute",
          transition: "all 0.5s ease",
        }}
      >
        {/* Top Navigation */}
        <header className="fixed top-0 left-1/2 -translate-x-1/2 flex justify-between items-center w-full px-7 h-24 max-w-[400px] bg-[#08080C] z-50">
          <button className="text-white hover:opacity-80 transition-opacity duration-300 active:scale-95 transition-transform">
            <span className="material-symbols-outlined text-[26px]">close</span>
          </button>
          <h1 className="font-['Sora'] font-semibold text-[26px] tracking-[-0.035em] text-[#7C4DFF]">Reveal Result</h1>
          <div className="w-[26px]"></div>
        </header>

        {/* Main Canvas */}
        <div className="min-h-screen flex flex-col justify-center items-center px-[28px] py-[96px] max-w-[400px] mx-auto text-center max-h-[844px]">
          {/* Decorative Glow Background */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden flex justify-center items-center">
            <div className="w-[300px] h-[300px] bg-[#7C4DFF]/10 rounded-full blur-[120px]"></div>
          </div>

          {/* Content Section */}
          <div className="relative z-10 w-full space-y-[80px]">
            {/* Message Cluster */}
            <div className="space-y-[12px]">
              <p className="text-[14px] text-white/40 tracking-wide font-label uppercase">
                Other apps charge $49&ndash;199
              </p>
              <div className="space-y-0">
                <h2 className="text-[44px] font-extrabold tracking-[-0.035em] text-white leading-[1.05]">
                  Ours is free
                </h2>
                <h2 className="text-[44px] font-extrabold tracking-[-0.035em] gradient-text leading-[1.05]">
                  if you invite friends,
                </h2>
                <h2 className="text-[44px] font-extrabold tracking-[-0.035em] gradient-text leading-[1.05]">
                  because we care.
                </h2>
              </div>
            </div>

            {/* Divider & Subtext */}
            <div className="flex flex-col items-center gap-[24px]">
              <div className="w-12 h-[1px] bg-white/10"></div>
              <p className="text-[14px] text-white/50 leading-relaxed max-w-[280px]">
                We believe everyone deserves to know their face score.
              </p>
            </div>

            {/* Action Cluster */}
            <div className="w-full space-y-[16px] pt-[32px]">
              <button
                onClick={() => router.push("/results")}
                className="w-full h-[56px] premium-gradient text-white font-semibold text-[16px] rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity active:scale-[0.98] transition-transform"
              >
                Go to your scan preview
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </button>
              <p className="text-[12px] text-white/25 font-label">
                Free &middot; No credit card needed
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="w-full max-w-[400px] mx-auto px-7 pb-12 flex flex-col items-center gap-4 bg-transparent">
          <div className="flex gap-6">
            <a className="font-['Sora'] text-[13px] text-white/25 hover:text-white/50 transition-colors" href="#">Privacy</a>
            <a className="font-['Sora'] text-[13px] text-white/25 hover:text-white/50 transition-colors" href="#">Terms</a>
          </div>
          <p className="font-['Sora'] text-[13px] text-white/25">&copy; 2024 FACERANK AI</p>
        </footer>

        {/* Aesthetic Decorative Image */}
        <div className="fixed bottom-0 left-0 w-full h-1/3 pointer-events-none opacity-20 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="w-full h-full object-cover"
            alt="abstract flowing liquid shapes in deep purple and indigo"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAil74rquhyBCDU0wDwz5gCFEjVJA8L2hK4fon4XK3pT9Oho7ofBPUzRAoUKvgrOXD1SimEj_NtXRWNHb0R0XQ-YKvhRzZ9x8UXJak0CiABpSF7GcIvGFj1u-d0AGJtZH_C5XIUCuy8n1mCKJ-LNPMrvlLS-yM8X_AY_CLvL0zWBDkk8N9U1qDQicX7v7prBteWWU8D2dZwN1iWseyo_j4gK3KnxAGHsJmx0njfP73eo9RzUhg5l8xFLpp4EUU6SuyFlTrhWhg-7Tz0"
          />
        </div>
      </div>
    </main>
  );
}
