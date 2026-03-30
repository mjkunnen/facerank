"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function FlowPage() {
  const [step, setStep] = useState(0);
  const [priceValue, setPriceValue] = useState(149);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const next = () => setStep((s) => s + 1);

  // Step 0: Gender (02_gender.html)
  if (step === 0) return (
    <div className="font-body">
      {/* Main Content */}
      <main className="max-w-[400px] mx-auto px-7 pt-[60px] pb-[48px] min-h-dvh flex flex-col items-center">
        {/* Dramatic Headline */}
        <div className="w-full mb-8 text-left">
          <p className="text-[#7C4DFF] font-label font-bold text-[11px] uppercase tracking-[0.3em] mb-2 opacity-80">Identification</p>
          <h2 className="text-[48px] font-black text-white tracking-[-0.05em] leading-[0.9] text-glow">
            I am
          </h2>
        </div>
        {/* Character Selection Grid (Vertical Full-Width Cards) */}
        <div className="w-full space-y-6">
          {/* Male Selection Card */}
          <button className="premium-card card-shimmer tap-bounce w-full rounded-2xl py-12 px-8 flex items-center justify-between group" onClick={next}>
            <div className="card-glow"></div>
            <div className="flex flex-col items-start">
              <span className="text-[28px] font-bold text-white group-active:text-white mb-1 transition-colors">Male</span>
              <span className="text-[10px] font-label font-medium uppercase tracking-[0.2em] text-white/30 group-active:text-white/60">Tap to select identity</span>
            </div>
            {/* Abstract Icon */}
            <div className="relative">
              <div className="shape-male opacity-40 group-active:opacity-100 group-active:scale-110 transition-all duration-500"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-white/40 text-2xl">male</span>
              </div>
            </div>
          </button>
          {/* Female Selection Card */}
          <button className="premium-card card-shimmer tap-bounce w-full rounded-2xl py-12 px-8 flex items-center justify-between group" onClick={next}>
            <div className="card-glow"></div>
            <div className="flex flex-col items-start">
              <span className="text-[28px] font-bold text-white group-active:text-white mb-1 transition-colors">Female</span>
              <span className="text-[10px] font-label font-medium uppercase tracking-[0.2em] text-white/30 group-active:text-white/60">Tap to select identity</span>
            </div>
            {/* Abstract Icon */}
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
      </main>
    </div>
  );

  // Step 1: Age (03_age.html)
  if (step === 1) return (
    <div className="antialiased font-body">
      {/* Main Canvas */}
      <main className="relative w-full max-w-[390px] mx-auto flex flex-col pt-[60px] px-[28px] pb-[120px] min-h-dvh overflow-hidden">
        {/* Progress Bar Section */}
        <div className="w-full h-[3px] bg-white/10 rounded-full mb-[60px] relative">
          <div className="absolute top-0 left-0 h-full w-1/4 bg-gradient-to-r from-[#7C4DFF] to-[#448AFF] rounded-full progress-glow"></div>
        </div>
        {/* Headline */}
        <div className="mb-[32px]">
          <h2 className="text-[24px] font-semibold text-white tracking-tight leading-tight">How old are you?</h2>
          <p className="text-[13px] text-white/30 mt-2">Age affects facial structure scoring — our AI adjusts analysis per age group</p>
        </div>
        {/* Age Options Container */}
        <div className="flex flex-col gap-3 flex-grow">
          <button className="tap-bounce w-full h-[52px] glass-card rounded-lg flex items-center px-5 gap-4 hover:bg-white/5 transition-all duration-300 group border border-white/5" onClick={next}>
            <span className="material-symbols-outlined text-[20px] text-primary/60 group-hover:text-primary group-hover:scale-110 transition-all">child_care</span>
            <span className="text-[15px] font-medium text-white/60 group-hover:text-white transition-colors">12 – 15</span>
          </button>
          <button className="tap-bounce w-full h-[52px] glass-card rounded-lg flex items-center px-5 gap-4 hover:bg-white/5 transition-all duration-300 group border border-white/5" onClick={next}>
            <span className="material-symbols-outlined text-[20px] text-primary/60 group-hover:text-primary group-hover:scale-110 transition-all">school</span>
            <span className="text-[15px] font-medium text-white/60 group-hover:text-white transition-colors">16 – 20</span>
          </button>
          <button className="tap-bounce w-full h-[52px] glass-card rounded-lg flex items-center px-5 gap-4 hover:bg-white/5 transition-all duration-300 group border border-white/5" onClick={next}>
            <span className="material-symbols-outlined text-[20px] text-primary/60 group-hover:text-primary group-hover:scale-110 transition-all">bolt</span>
            <span className="text-[15px] font-medium text-white/60 group-hover:text-white transition-colors">21 – 25</span>
          </button>
          <button className="tap-bounce w-full h-[52px] glass-card rounded-lg flex items-center px-5 gap-4 hover:bg-white/5 transition-all duration-300 group border border-white/5" onClick={next}>
            <span className="material-symbols-outlined text-[20px] text-primary/60 group-hover:text-primary group-hover:scale-110 transition-all">workspace_premium</span>
            <span className="text-[15px] font-medium text-white/60 group-hover:text-white transition-colors">26 – 30</span>
          </button>
          <button className="tap-bounce w-full h-[52px] glass-card rounded-lg flex items-center px-5 gap-4 hover:bg-white/5 transition-all duration-300 group border border-white/5" onClick={next}>
            <span className="material-symbols-outlined text-[20px] text-primary/60 group-hover:text-primary group-hover:scale-110 transition-all">diamond</span>
            <span className="text-[15px] font-medium text-white/60 group-hover:text-white transition-colors">31 – 40</span>
          </button>
          <button className="tap-bounce w-full h-[52px] glass-card rounded-lg flex items-center px-5 gap-4 hover:bg-white/5 transition-all duration-300 group border border-white/5" onClick={next}>
            <span className="material-symbols-outlined text-[20px] text-primary/60 group-hover:text-primary group-hover:scale-110 transition-all">military_tech</span>
            <span className="text-[15px] font-medium text-white/60 group-hover:text-white transition-colors">40+</span>
          </button>
        </div>
      </main>
      {/* Floating CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 px-7 pb-8 pt-4 bg-gradient-to-t from-[#08080C] via-[#08080C]/90 to-transparent max-w-[400px] mx-auto">
        <button className="btn-glow w-full h-14 bg-gradient-to-r from-[#7C4DFF] to-[#448AFF] rounded-2xl font-semibold text-white active:scale-95 transition-all" onClick={next}>
          Continue
        </button>
      </div>
      {/* Background Decorative Elements */}
      <div className="fixed top-[-10%] right-[-10%] w-[300px] h-[300px] bg-[#7C4DFF]/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
      <div className="fixed bottom-[-5%] left-[-5%] w-[250px] h-[250px] bg-[#448AFF]/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
    </div>
  );

  // Step 2: Heritage (04_heritage.html)
  if (step === 2) return (
    <div className="font-body">
      {/* Main Canvas */}
      <main className="relative w-full max-w-[390px] mx-auto overflow-hidden bg-[#08080C] flex flex-col pt-[60px] pb-[120px] px-[28px] min-h-dvh">
        {/* Header Text */}
        <div className="text-center mb-10">
          <h2 className="text-[20px] font-semibold text-white tracking-tight mb-2">Discover your heritage</h2>
          <p className="text-[13px] text-white/25 leading-relaxed">Our AI compares 47 facial landmarks against global ancestry databases to find your closest genetic matches</p>
        </div>
        {/* Hero Visual: DNA Helix */}
        <div className="relative h-[160px] w-full flex items-center justify-center mb-[16px]">
          <div className="relative w-full h-full flex justify-center items-center opacity-90 dna-animate">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-32 h-48 border-l-4 border-r-4 border-primary/20 rounded-[40%] rotate-12"></div>
              <div className="absolute w-32 h-48 border-l-4 border-r-4 border-secondary/20 rounded-[40%] -rotate-12"></div>
              <div className="absolute w-full h-full flex flex-col justify-between items-center py-4">
                <div className="w-2 h-2 rounded-full dna-gradient shadow-[0_0_15px_#7C4DFF] dna-node-1"></div>
                <div className="w-2 h-2 rounded-full dna-gradient shadow-[0_0_15px_#7C4DFF] dna-node-2"></div>
                <div className="w-2 h-2 rounded-full dna-gradient shadow-[0_0_15px_#7C4DFF] dna-node-3"></div>
                <div className="w-2 h-2 rounded-full dna-gradient shadow-[0_0_15px_#7C4DFF] dna-node-4"></div>
                <div className="w-2 h-2 rounded-full dna-gradient shadow-[0_0_15px_#7C4DFF] dna-node-5"></div>
              </div>
            </div>
            <div className="w-24 h-24 rounded-full bg-primary/10 blur-[40px] animate-pulse"></div>
            <span className="material-symbols-outlined text-[80px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>genetics</span>
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
            <p className="text-[11px] text-white/30">Sharp jawline · Straight nose bridge · Deep-set eyes</p>
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
            <p className="text-[11px] text-white/30">Almond-shaped eyes · Strong brow ridge · Olive undertone</p>
            <div className="h-[3px] w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full progress-gradient w-[28%]"></div>
            </div>
          </div>
          {/* Turkish Card */}
          <div className="bg-white/[0.03] p-3 rounded-xl flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-6 h-4 bg-red-600 rounded-sm overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center text-[10px] text-white">☾</div>
                </div>
                <span className="text-[15px] font-medium text-white/60">Turkish</span>
              </div>
              <span className="font-label text-[15px] text-white">18%</span>
            </div>
            <p className="text-[11px] text-white/30">Straight brow line · High cheekbones · Angular midface</p>
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
            <p className="text-[11px] text-white/30">Defined chin · Rounded forehead · Warm skin tone</p>
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
            <p className="text-[11px] text-white/30">Narrow nose · Soft brow arch · Symmetrical midface</p>
            <div className="h-[3px] w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full progress-gradient w-[8%]"></div>
            </div>
          </div>
        </div>
      </main>
      {/* Floating CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 px-7 pb-8 pt-4 bg-gradient-to-t from-[#08080C] via-[#08080C]/90 to-transparent max-w-[400px] mx-auto">
        <button className="btn-glow w-full h-14 bg-gradient-to-r from-[#7C4DFF] to-[#448AFF] rounded-2xl font-semibold text-white active:scale-95 transition-all" onClick={next}>
          Continue
        </button>
      </div>
    </div>
  );

  // Step 3: World Rankings (05_world.html)
  if (step === 3) return (
    <div className="flex items-center justify-center min-h-dvh">
      <main className="relative w-[390px] min-h-dvh bg-[#08080C] overflow-hidden flex flex-col">
        {/* Content Canvas */}
        <div className="flex-1 px-7 pt-12 pb-[120px] flex flex-col space-y-8 overflow-auto">
          {/* Title */}
          <h1 className="font-headline font-semibold text-[20px] tracking-[-0.035em] text-white text-center">Where you&apos;d rank highest</h1>
          {/* Section 1: Map Visualization */}
          <section className="relative w-full aspect-[1.8/1] rounded-2xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none"></div>
            <img alt="Global Ranking Map" className="w-full h-full object-cover opacity-60 grayscale brightness-125" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVV4M7F297iKPQoWYFlIfuemJiEc41olsWp-x5J8_hGvbG4wU7QLfGe1jbRqI2RrSv9EPXj2FWWFXW26GxTtCfTAZveR3Ohc48EPG88dwhC0k6mTmRNXR-GBickkcpwz1PRvn3E6m51v7bpSwx2MVTeZls_BmxPfOaeRmooXULGxtJTmQKLDMnsz5MUGTe_Q19gwmkkLG4HU4lVJ4sZuv-2Yhw3Fx6478HjtMXB-gfzR-oDjVh8ZbtPsG2rrICFQUjAuS_giyPZn-j" />
            <div className="absolute top-1/4 left-1/3 w-12 h-12 bg-primary/30 blur-2xl rounded-full"></div>
            <div className="absolute bottom-1/3 right-1/4 w-16 h-16 bg-secondary/20 blur-3xl rounded-full"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="px-4 py-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10 flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span className="text-[11px] font-label font-medium text-white/80 uppercase tracking-widest">Global Density Match</span>
              </div>
            </div>
          </section>
          {/* Section 2: Feature Tags */}
          <section className="flex flex-wrap gap-2">
            <div className="px-3 py-2 bg-white/[0.03] rounded-full flex items-center space-x-2">
              <span className="text-[13px] font-medium text-white/60">Blue eyes</span>
              <span className="text-[13px] font-label font-bold text-primary">+0.5</span>
            </div>
            <div className="px-3 py-2 bg-white/[0.03] rounded-full flex items-center space-x-2">
              <span className="text-[13px] font-medium text-white/60">Curly hair</span>
              <span className="text-[13px] font-label font-bold text-primary">+0.3</span>
            </div>
            <div className="px-3 py-2 bg-white/[0.03] rounded-full flex items-center space-x-2">
              <span className="text-[13px] font-medium text-white/60">Square jawline</span>
              <span className="text-[13px] font-label font-bold text-primary">+0.8</span>
            </div>
            <div className="px-3 py-2 bg-white/[0.03] rounded-full flex items-center space-x-2">
              <span className="text-[13px] font-medium text-white/60">Hunter eyes</span>
              <span className="text-[13px] font-label font-bold text-primary">+0.6</span>
            </div>
          </section>
          {/* Section 3: Ranked List */}
          <section className="flex flex-col space-y-3 flex-1">
            <div className="flex items-center justify-between p-4 bg-white/[0.03] rounded-xl group transition-all duration-300 hover:bg-white/[0.05]">
              <div className="flex items-center space-x-4">
                <span className="text-[14px] font-label font-bold text-white/20">#1</span>
                <div className="flex flex-col">
                  <span className="text-[15px] font-semibold text-white flex items-center gap-2">
                    <span>🇧🇷</span> Brazil
                  </span>
                  <span className="text-[12px] text-white/25 mt-0.5">Strong jawline valued</span>
                </div>
              </div>
              <div className="text-[20px] font-label font-bold gradient-text drop-shadow-[0_0_8px_rgba(124,77,255,0.3)]">8.9</div>
            </div>
            <div className="flex items-center justify-between p-4 bg-white/[0.02] rounded-xl group transition-all duration-300">
              <div className="flex items-center space-x-4">
                <span className="text-[14px] font-label font-bold text-white/20">#2</span>
                <div className="flex flex-col">
                  <span className="text-[15px] font-semibold text-white/80 flex items-center gap-2">
                    <span>🇮🇹</span> Italy
                  </span>
                  <span className="text-[12px] text-white/25 mt-0.5">Facial symmetry match</span>
                </div>
              </div>
              <div className="text-[18px] font-label font-bold text-white/80">8.7</div>
            </div>
            <div className="flex items-center justify-between p-4 bg-white/[0.02] rounded-xl group transition-all duration-300">
              <div className="flex items-center space-x-4">
                <span className="text-[14px] font-label font-bold text-white/20">#3</span>
                <div className="flex flex-col">
                  <span className="text-[15px] font-semibold text-white/80 flex items-center gap-2">
                    <span>🇪🇸</span> Spain
                  </span>
                  <span className="text-[12px] text-white/25 mt-0.5">Eye shape preference</span>
                </div>
              </div>
              <div className="text-[18px] font-label font-bold text-white/80">8.4</div>
            </div>
            <div className="flex items-center justify-between p-4 bg-white/[0.02] rounded-xl group transition-all duration-300">
              <div className="flex items-center space-x-4">
                <span className="text-[14px] font-label font-bold text-white/20">#4</span>
                <div className="flex flex-col">
                  <span className="text-[15px] font-semibold text-white/80 flex items-center gap-2">
                    <span>🇹🇷</span> Turkey
                  </span>
                  <span className="text-[12px] text-white/25 mt-0.5">Bone structure fit</span>
                </div>
              </div>
              <div className="text-[18px] font-label font-bold text-white/80">8.1</div>
            </div>
            <div className="flex items-center justify-between p-4 bg-white/[0.02] rounded-xl group transition-all duration-300">
              <div className="flex items-center space-x-4">
                <span className="text-[14px] font-label font-bold text-white/20">#5</span>
                <div className="flex flex-col">
                  <span className="text-[15px] font-semibold text-white/80 flex items-center gap-2">
                    <span>🇬🇷</span> Greece
                  </span>
                  <span className="text-[12px] text-white/25 mt-0.5">Classical proportions</span>
                </div>
              </div>
              <div className="text-[18px] font-label font-bold text-white/80">7.9</div>
            </div>
          </section>
        </div>
        {/* Floating CTA */}
        <div className="fixed bottom-0 left-0 right-0 z-50 px-7 pb-8 pt-4 bg-gradient-to-t from-[#08080C] via-[#08080C]/90 to-transparent max-w-[400px] mx-auto">
          <button className="btn-glow w-full h-14 bg-gradient-to-r from-[#7C4DFF] to-[#448AFF] rounded-2xl font-semibold text-white active:scale-95 transition-all" onClick={next}>
            Continue
          </button>
        </div>
      </main>
    </div>
  );

  // Step 4: Heatmap (06_heatmap.html)
  if (step === 4) return (
    <div className="bg-[#08080C] text-white font-body min-h-screen">
      <main className="max-w-[400px] mx-auto pt-12 pb-[120px] px-7 flex flex-col items-center">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h2 className="text-[22px] font-semibold tracking-tight text-white mb-2">Diagnostic Heat Map</h2>
          <p className="text-[13px] text-white/40 font-medium px-4">AI analysis of your primary facial structural zones</p>
        </div>
        {/* Heat Map Canvas */}
        <div className="relative w-full aspect-[3/4] flex items-center justify-center mb-10">
          <div className="absolute inset-0 bg-glow-purple rounded-full"></div>
          <div className="relative w-72 h-96 border border-white/10 rounded-[120px] flex items-center justify-center overflow-visible">
            <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100">
              <path d="M50 10 Q 85 10 85 45 T 50 95 T 15 45 T 50 10" fill="none" stroke="white" strokeWidth="0.5"></path>
              <path d="M25 35 Q 50 30 75 35" fill="none" stroke="white" strokeWidth="0.2"></path>
              <path d="M20 50 Q 50 45 80 50" fill="none" stroke="white" strokeWidth="0.2"></path>
              <path d="M30 75 Q 50 85 70 75" fill="none" stroke="white" strokeWidth="0.2"></path>
              <line stroke="white" strokeWidth="0.2" x1="50" x2="50" y1="10" y2="95"></line>
            </svg>
            <div className="absolute top-12 w-40 h-16 bg-status-strong thermal-glow opacity-30 rounded-full"></div>
            <div className="absolute top-36 left-14 w-12 h-6 bg-status-average thermal-glow opacity-40 rounded-full"></div>
            <div className="absolute top-36 right-14 w-12 h-6 bg-status-average thermal-glow opacity-40 rounded-full"></div>
            <div className="absolute top-42 w-8 h-24 bg-status-strong thermal-glow opacity-40 rounded-full"></div>
            <div className="absolute top-52 left-10 w-14 h-14 bg-status-weak thermal-glow opacity-30 rounded-full"></div>
            <div className="absolute top-52 right-10 w-14 h-14 bg-status-weak thermal-glow opacity-30 rounded-full"></div>
            <div className="absolute bottom-10 w-48 h-12 bg-status-average thermal-glow opacity-30 rounded-full"></div>
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
              <span className="zone-label text-status-strong">Forehead</span>
              <div className="w-[1px] h-6 bg-status-strong/40 mt-1"></div>
            </div>
            <div className="absolute top-32 -left-12 flex items-center">
              <span className="zone-label text-status-average">Eyes</span>
              <div className="w-8 h-[1px] bg-status-average/40 ml-1"></div>
            </div>
            <div className="absolute top-56 -right-16 flex items-center">
              <div className="w-8 h-[1px] bg-status-weak/40 mr-1"></div>
              <span className="zone-label text-status-weak">Cheekbones</span>
            </div>
            <div className="absolute top-1/2 -left-12 -translate-y-1/2 flex items-center">
              <span className="zone-label text-status-strong">Skin</span>
              <div className="w-6 h-[1px] bg-status-strong/40 ml-1"></div>
            </div>
            <div className="absolute top-1/2 -right-12 -translate-y-1/2 flex items-center">
              <div className="w-6 h-[1px] bg-status-strong/40 mr-1"></div>
              <span className="zone-label text-status-strong">Nose</span>
            </div>
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
              <div className="w-[1px] h-6 bg-status-average/40 mb-1"></div>
              <span className="zone-label text-status-average">Jawline</span>
            </div>
            <img className="w-full h-full object-contain mix-blend-screen opacity-50 pointer-events-none" alt="3D wireframe head" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-eFKIiwPsvT4EGg01JODxWGXDT2FcbKVQgUcuwmd74EO-PZcjmzbOKS9-T4vhFjAH3ZPm-NtXCajV1b0O8lk13J07QT3HqRHifM9VJnJsxsWekob7Anuf5r3OxxDsaBAXAJg043gCQmUKz31aiZ3AU3TmFkwe6HOYI5I2LDrFkiK7hzxazC72L1dxEk2VOzagunE0sZhTsbgGkpqdwgBRK25F7g54wBwQm6U-skm91RaqSv1_cM1GoKAdMmqOLhElVAEzL6e0E4tX" />
          </div>
          <div className="absolute inset-x-4 h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent shadow-[0_0_15px_rgba(124,77,255,0.5)] animate-scan z-10 pointer-events-none"></div>
        </div>
        {/* Simplified Legend Section */}
        <div className="w-full grid grid-cols-3 gap-3 mb-8">
          <div className="flex flex-col items-center p-3 bg-white/[0.03] rounded-xl border border-white/5">
            <div className="w-2.5 h-2.5 rounded-full bg-status-strong shadow-[0_0_8px_#4ADE80] mb-2"></div>
            <span className="text-[10px] uppercase font-bold text-white/40 tracking-widest mb-1">Strong</span>
            <span className="font-label text-lg font-bold text-white leading-none">3</span>
          </div>
          <div className="flex flex-col items-center p-3 bg-white/[0.03] rounded-xl border border-white/5">
            <div className="w-2.5 h-2.5 rounded-full bg-status-average shadow-[0_0_8px_#F59E0B] mb-2"></div>
            <span className="text-[10px] uppercase font-bold text-white/40 tracking-widest mb-1">Average</span>
            <span className="font-label text-lg font-bold text-white leading-none">3</span>
          </div>
          <div className="flex flex-col items-center p-3 bg-white/[0.03] rounded-xl border border-white/5">
            <div className="w-2.5 h-2.5 rounded-full bg-status-weak shadow-[0_0_8px_#EF4444] mb-2"></div>
            <span className="text-[10px] uppercase font-bold text-white/40 tracking-widest mb-1">Needs Work</span>
            <span className="font-label text-lg font-bold text-white leading-none">1</span>
          </div>
        </div>
      </main>
      {/* Floating CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 px-7 pb-8 pt-4 bg-gradient-to-t from-[#08080C] via-[#08080C]/90 to-transparent max-w-[400px] mx-auto">
        <button className="btn-glow w-full h-14 bg-gradient-to-r from-[#7C4DFF] to-[#448AFF] rounded-2xl font-semibold text-white active:scale-95 transition-all" onClick={next}>
          Continue
        </button>
      </div>
    </div>
  );

  // Step 5: Price Guess (07_price.html)
  if (step === 5) return (
    <div className="font-body flex flex-col items-center" style={{ overflow: "hidden", height: "100dvh" }}>
      <main className="w-full max-w-[400px] flex-1 flex flex-col px-[24px] pt-[60px] pb-[120px] overflow-hidden">
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
            <span className="text-[15px] font-bold text-white tracking-tight">$49–99/year</span>
          </div>
          <div className="flex justify-between items-center px-5 py-4 bg-white/[0.03] rounded-xl border border-white/[0.05]">
            <span className="text-[15px] font-medium text-white/60">Professional analysis</span>
            <span className="text-[15px] font-bold text-white tracking-tight">$200–500</span>
          </div>
        </section>
        {/* Interactive Slider Section */}
        <section className="flex-1 flex flex-col justify-center items-center py-4">
          <div className="mb-10 text-center">
            <span className="text-[48px] font-bold text-white tracking-tighter leading-none">${priceValue}</span>
          </div>
          <div className="w-full relative px-2 mb-4">
            <div className="absolute top-1/2 left-2 right-2 h-[4px] -translate-y-1/2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#7C4DFF] to-[#448AFF]" style={{ width: `${((priceValue - 10) / (249 - 10)) * 100}%` }}></div>
            </div>
            <input className="price-slider relative w-full h-[4px] bg-transparent appearance-none cursor-pointer z-10" max={249} min={10} type="range" value={priceValue} onChange={(e) => setPriceValue(Number(e.target.value))} />
          </div>
          <p className="text-[11px] font-bold text-white/30 uppercase tracking-[0.2em] font-label">Drag to guess</p>
        </section>
      </main>
      {/* Floating CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 px-7 pb-8 pt-4 bg-gradient-to-t from-[#08080C] via-[#08080C]/90 to-transparent max-w-[400px] mx-auto">
        <button className="btn-glow w-full h-14 bg-gradient-to-r from-[#7C4DFF] to-[#448AFF] rounded-2xl font-semibold text-white active:scale-95 transition-all" onClick={next}>
          Reveal the price
        </button>
      </div>
    </div>
  );

  // Step 6: Reveal (08_reveal.html)
  if (step === 6) return (
    <div className="font-body">
      {/* Main Canvas */}
      <main className="min-h-dvh flex flex-col justify-center items-center px-[28px] pb-[120px] pt-[60px] max-w-[400px] mx-auto text-center">
        {/* Decorative Glow Background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden flex justify-center items-center">
          <div className="w-[300px] h-[300px] bg-primary/10 rounded-full blur-[120px]"></div>
        </div>
        {/* Content Section */}
        <div className="relative z-10 w-full space-y-[80px]">
          {/* Message Cluster */}
          <div className="space-y-[12px]">
            <p className="text-[14px] text-white/40 tracking-wide font-label uppercase">
              Other apps charge $49–199
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
        </div>
      </main>
      {/* Floating CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 px-7 pb-8 pt-4 bg-gradient-to-t from-[#08080C] via-[#08080C]/90 to-transparent max-w-[400px] mx-auto">
        <button className="btn-glow w-full h-14 bg-gradient-to-r from-[#7C4DFF] to-[#448AFF] rounded-2xl font-semibold text-white active:scale-95 transition-all" onClick={next}>
          Go to your scan preview
        </button>
      </div>
      {/* Aesthetic Decorative Image */}
      <div className="fixed bottom-0 left-0 w-full h-1/3 pointer-events-none opacity-20 overflow-hidden -z-10">
        <img className="w-full h-full object-cover" alt="abstract flowing liquid shapes in deep purple and indigo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAil74rquhyBCDU0wDwz5gCFEjVJA8L2hK4fon4XK3pT9Oho7ofBPUzRAoUKvgrOXD1SimEj_NtXRWNHb0R0XQ-YKvhRzZ9x8UXJak0CiABpSF7GcIvGFj1u-d0AGJtZH_C5XIUCuy8n1mCKJ-LNPMrvlLS-yM8X_AY_CLvL0zWBDkk8N9U1qDQicX7v7prBteWWU8D2dZwN1iWseyo_j4gK3KnxAGHsJmx0njfP73eo9RzUhg5l8xFLpp4EUU6SuyFlTrhWhg-7Tz0" />
      </div>
    </div>
  );

  // Step 7: Overview / Scan Preview (09_overview.html)
  if (step === 7) return (
    <div className="font-body">
      <main className="max-w-[400px] mx-auto px-[28px] pt-[60px] pb-[120px]">
        {/* Header Section */}
        <section className="mb-[32px]">
          <h2 className="text-[22px] font-semibold tracking-[-0.035em] mb-2">Your complete analysis</h2>
          <p className="text-[13px] text-white/40 font-medium">6 AI-powered insights about your face</p>
        </section>
        {/* Feature Grid (2x3) */}
        <div className="grid grid-cols-2 gap-[16px]">
          <div className="bg-white/[0.03] p-4 rounded-[12px] transition-all duration-300 card-glow-hover border border-white/[0.02]">
            <span className="material-symbols-outlined text-[#7C4DFF] mb-3 block text-[24px]">shutter_speed</span>
            <h3 className="text-[14px] font-semibold mb-1">Face Score</h3>
            <p className="text-[11px] text-white/40 leading-tight">Rated across 6 attributes</p>
          </div>
          <div className="bg-white/[0.03] p-4 rounded-[12px] transition-all duration-300 card-glow-hover border border-white/[0.02]">
            <span className="material-symbols-outlined text-[#7C4DFF] mb-3 block text-[24px]">public</span>
            <h3 className="text-[14px] font-semibold mb-1">World Rankings</h3>
            <p className="text-[11px] text-white/40 leading-tight">Top 10 countries for you</p>
          </div>
          <div className="bg-white/[0.03] p-4 rounded-[12px] transition-all duration-300 card-glow-hover border border-white/[0.02]">
            <span className="material-symbols-outlined text-[#7C4DFF] mb-3 block text-[24px]">genetics</span>
            <h3 className="text-[14px] font-semibold mb-1">Heritage Match</h3>
            <p className="text-[11px] text-white/40 leading-tight">Your ancestry breakdown</p>
          </div>
          <div className="bg-white/[0.03] p-4 rounded-[12px] transition-all duration-300 card-glow-hover border border-white/[0.02]">
            <span className="material-symbols-outlined text-[#7C4DFF] mb-3 block text-[24px]">trending_up</span>
            <h3 className="text-[14px] font-semibold mb-1">Glow-Up Plan</h3>
            <p className="text-[11px] text-white/40 leading-tight">Steps to maximize potential</p>
          </div>
          <div className="bg-white/[0.03] p-4 rounded-[12px] transition-all duration-300 card-glow-hover border border-white/[0.02]">
            <span className="material-symbols-outlined text-[#7C4DFF] mb-3 block text-[24px]">content_cut</span>
            <h3 className="text-[14px] font-semibold mb-1">Best Hairstyle</h3>
            <p className="text-[11px] text-white/40 leading-tight">AI-matched to your shape</p>
          </div>
          <div className="bg-white/[0.03] p-4 rounded-[12px] transition-all duration-300 card-glow-hover border border-white/[0.02]">
            <span className="material-symbols-outlined text-[#7C4DFF] mb-3 block text-[24px]">grid_view</span>
            <h3 className="text-[14px] font-semibold mb-1">Heat Map</h3>
            <p className="text-[11px] text-white/40 leading-tight">Your strongest facial zones</p>
          </div>
        </div>
        {/* Visual Teaser */}
        <div className="mt-[48px] relative overflow-hidden rounded-xl h-[120px] bg-white/[0.02] flex items-center justify-center">
          <div className="absolute inset-0 opacity-20 premium-gradient blur-3xl"></div>
          <div className="relative z-10 flex flex-col items-center">
            <span className="material-symbols-outlined text-white/20 text-[40px]" style={{ fontVariationSettings: "'FILL' 1" }}>face</span>
            <p className="text-[12px] text-white/20 font-label tracking-widest uppercase mt-2">Ready for analysis</p>
          </div>
          <img className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30" alt="close-up abstract shot of high-tech digital facial scanning grid" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrD7r43vBce6e6oYPiRK-PdzHK23tkcNHjEdR1yIFJ59KtobZsXH8IjeKDhDOu-U6IVw_HbbjMh1gGsyhAuMkEyncejUp7SoKWJymb5DdK66B31AOSSto9Swk7LGFRxVp6bXI8x1JRA6S9Nf5_fXlmNhPF37Nk3XvCw7PSzomYw4QJ8KrUXTxvl-jm_PAceaeQOqpeO_tqVBLK8Jp575ZoKNz6DqhO01TgRlrw56rbHRxpBiMsO5Y42KNOk5ybPk_szEldgSYz51H9" />
        </div>
      </main>
      {/* Floating CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 px-7 pb-8 pt-4 bg-gradient-to-t from-[#08080C] via-[#08080C]/90 to-transparent max-w-[400px] mx-auto">
        <button className="btn-glow w-full h-14 bg-gradient-to-r from-[#7C4DFF] to-[#448AFF] rounded-2xl font-semibold text-white active:scale-95 transition-all" onClick={next}>
          Scan my face
        </button>
      </div>
    </div>
  );

  // Step 8: Upload (10_upload.html)
  if (step === 8) return (
    <div className="font-body">
      {/* Progress Indicator */}
      <div className="max-w-[400px] mx-auto px-7 pt-12 mb-20">
        <div className="w-full h-[3px] bg-white/5 rounded-full overflow-hidden">
          <div className="h-full w-[80%] bg-gradient-to-r from-[#7C4DFF] to-[#448AFF] rounded-full"></div>
        </div>
      </div>
      {/* Main Content Canvas */}
      <main className="max-w-[400px] mx-auto px-7 flex flex-col items-center">
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
          <div className="absolute inset-0 rounded-[24px] pointer-events-none bg-gradient-to-br from-white/5 to-transparent opacity-50"></div>
        </div>
        <input type="file" accept="image/*" capture="user" ref={fileInputRef} className="hidden" onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = () => {
              sessionStorage.setItem("facerank_image", reader.result as string);
              router.push("/analyzing");
            };
            reader.readAsDataURL(file);
          }
        }} />
        {/* Secondary Actions & Trust */}
        <div className="mt-8 flex flex-col items-center gap-6">
          <button className="text-[12px] font-medium text-white/15 hover:text-white/40 transition-colors uppercase tracking-widest" onClick={() => router.push("/analyzing")}>
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
        {/* Filler Space */}
        <div className="flex-grow min-h-[120px]"></div>
        {/* Privacy Disclaimer */}
        <div className="pb-12 pt-8">
          <p className="text-[10px] text-white/10 text-center tracking-tight">
            Your photo is analyzed locally and never saved
          </p>
        </div>
      </main>
      {/* Decorative Background Elements */}
      <div className="fixed top-[-10%] right-[-10%] w-[60%] aspect-square bg-primary/10 blur-[120px] -z-10 rounded-full"></div>
      <div className="fixed bottom-[-5%] left-[-10%] w-[50%] aspect-square bg-secondary/5 blur-[100px] -z-10 rounded-full"></div>
    </div>
  );

  return null;
}
