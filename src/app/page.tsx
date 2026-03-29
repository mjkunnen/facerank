"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between text-white min-h-dvh">
      {/* Top Navigation */}
      <header className="fixed top-0 w-full z-50 flex justify-center items-center h-20 px-8">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#b6a0ff]" style={{ fontVariationSettings: "'FILL' 1" }}>face_5</span>
          <span className="font-headline font-black tracking-widest text-[#b6a0ff] uppercase text-xl">FACERANK</span>
        </div>
      </header>

      <div className="ambient-glow"></div>

      {/* Main Content Canvas */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center w-full">
        {/* Hero Section */}
        <div className="flex flex-col items-center">
          <h1 className="font-sora text-[30px] font-[800] leading-[1.1] tracking-tighter text-white">
            How attractive are you, really?
          </h1>

          {/* Features Row */}
          <div className="mt-[6px] flex flex-wrap justify-center gap-2">
            <div className="bg-white/[0.04] backdrop-blur-md px-3 py-1 rounded-full border border-white/[0.03]">
              <span className="font-label text-[11px] text-white/40 uppercase tracking-wider">World ranking</span>
            </div>
            <div className="bg-white/[0.04] backdrop-blur-md px-3 py-1 rounded-full border border-white/[0.03]">
              <span className="font-label text-[11px] text-white/40 uppercase tracking-wider">Your genetics</span>
            </div>
            <div className="bg-white/[0.04] backdrop-blur-md px-3 py-1 rounded-full border border-white/[0.03]">
              <span className="font-label text-[11px] text-white/40 uppercase tracking-wider">Glow-up plan</span>
            </div>
          </div>

          {/* AI Stat */}
          <p className="mt-[4px] font-body text-[13px] text-white/35 font-medium">
            AI scans 47 features in 30 seconds
          </p>

          {/* Call to Action */}
          <div className="mt-[48px] flex flex-col items-center w-full max-w-[320px]">
            <Link
              href="/scan"
              className="cta-gradient w-full h-[56px] rounded-full flex items-center justify-center shadow-[0_0_40px_-10px_rgba(182,160,255,0.4)] hover:shadow-[0_0_50px_-5px_rgba(182,160,255,0.6)] transition-all active:scale-95 no-underline"
            >
              <span className="font-label font-bold text-black text-sm uppercase tracking-widest">Find out now</span>
            </Link>
            {/* Subtext */}
            <p className="mt-[10px] font-label text-[11px] text-white/20 tracking-wide">
              2.8M+ ANALYZED WORLDWIDE · 100% ANONYMOUS
            </p>
          </div>
        </div>
      </main>

      {/* Aesthetic Decorative Element */}
      <div className="w-full px-6 pb-12 opacity-40">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      </div>

      {/* Footer */}
      <footer className="w-full py-8 border-t border-white/10 flex flex-col items-center gap-2">
        <span className="font-label text-[10px] uppercase tracking-[0.2em] text-white/40">
          &copy; 2024 FACERANK. THE NEON CARTOGRAPHER ELITE.
        </span>
      </footer>
    </div>
  );
}
