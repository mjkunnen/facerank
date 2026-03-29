"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="font-body antialiased">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-[#08080C]/80 backdrop-blur-md">
        <div className="flex justify-between items-center px-7 py-6 max-w-[400px] mx-auto">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#7C4DFF]">flare</span>
            <h1 className="text-2xl font-black tracking-tighter text-white uppercase font-headline">FACERANK</h1>
          </div>
          <div className="flex gap-4">
            <span className="material-symbols-outlined text-white/60 hover:text-[#7C4DFF] transition-colors duration-300">menu</span>
          </div>
        </div>
      </header>

      {/* Main Canvas (Fixed Height, No Scroll) */}
      <main className="relative h-full w-full flex flex-col items-center justify-center px-7 max-w-[400px] mx-auto text-center" style={{ maxHeight: "844px" }}>
        {/* Ambient Glow Orb */}
        <div className="absolute inset-0 ambient-glow pointer-events-none -z-10"></div>

        {/* Hero Section */}
        <div className="flex flex-col items-center">
          <h2 className="text-[30px] font-extrabold tracking-tighter text-white leading-tight mb-1.5 font-headline">
            How attractive are you, really?
          </h2>

          {/* Feature Pills Row */}
          <div className="flex flex-wrap justify-center gap-2 mt-1.5 mb-1">
            <div className="px-3 py-1 rounded-full bg-white/5 border border-white/5 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[14px] text-primary">language</span>
              <span className="text-[11px] font-medium tracking-wide text-white/80">World ranking</span>
            </div>
            <div className="px-3 py-1 rounded-full bg-white/5 border border-white/5 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[14px] text-primary">genetics</span>
              <span className="text-[11px] font-medium tracking-wide text-white/80">Your genetics</span>
            </div>
            <div className="px-3 py-1 rounded-full bg-white/5 border border-white/5 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[14px] text-primary">trending_up</span>
              <span className="text-[11px] font-medium tracking-wide text-white/80">Glow-up plan</span>
            </div>
          </div>

          {/* Subtext */}
          <p className="text-[13px] font-medium text-white/35 mt-1 tracking-tight">
            AI scans 47 features in 30 seconds
          </p>
        </div>

        {/* Spacer */}
        <div className="h-[48px]"></div>

        {/* CTA & Social Proof */}
        <div className="w-full flex flex-col items-center">
          <Link
            href="/scan"
            className="gradient-cta w-full h-[56px] rounded-full text-white font-bold text-base tracking-tight transition-transform active:scale-95 duration-200 shadow-lg flex items-center justify-center no-underline"
          >
            Find out now
          </Link>
          <p className="text-[11px] font-medium text-white/20 mt-[10px] tracking-tight">
            2.8M+ analyzed worldwide · 100% anonymous
          </p>
        </div>

        {/* Decorative Background Element */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-64 h-64 opacity-20 blur-3xl rounded-full bg-primary/20 pointer-events-none -z-20"></div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 w-full bg-[#08080C] border-t border-white/5">
        <div className="flex flex-col items-center gap-8 px-7 pb-12 pt-12 w-full max-w-[400px] mx-auto">
          <div className="flex gap-6">
            <a className="font-headline text-[13px] tracking-tight text-white/25 hover:text-white transition-opacity" href="#">Privacy</a>
            <a className="font-headline text-[13px] tracking-tight text-white/25 hover:text-white transition-opacity" href="#">Terms</a>
            <a className="font-headline text-[13px] tracking-tight text-white/25 hover:text-white transition-opacity" href="#">Science</a>
          </div>
          <p className="font-headline text-[13px] tracking-tight text-white/25 uppercase text-center">
            &copy; 2024 FACERANK AI. UNCOMPROMISING ANALYSIS.
          </p>
        </div>
      </footer>
    </div>
  );
}
