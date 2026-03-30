"use client";

import { useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

export default function ScanPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState(0);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const nextStep = () => setStep((s) => s + 1);

  /* image upload */
  const processImage = useCallback((file: File) => {
    setError(null);
    if (!file.type.startsWith("image/")) {
      setError("Upload an image file.");
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

  /* ═══════════════════════════════════════════════════════
     STEP 0: Gender (02_gender.html)
     ═══════════════════════════════════════════════════════ */
  if (step === 0) {
    return (
      <div className="font-body">
        {/* Top Navigation Shell */}
        <header className="fixed top-0 w-full z-50 px-7 h-[96px] flex items-center justify-between max-w-[400px] left-1/2 -translate-x-1/2">
          <div className="flex items-center justify-center w-10 h-10 cursor-pointer hover:opacity-80 transition-opacity active:scale-95">
            <span className="material-symbols-outlined text-white opacity-40">close</span>
          </div>
          <h1 className="font-headline font-black text-xl tracking-widest bg-gradient-to-r from-[#7C4DFF] to-[#448AFF] bg-clip-text text-transparent uppercase">FaceRank</h1>
          <div className="w-10"></div>
          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/5">
            <div className="h-full progress-bar-gradient transition-all duration-1000 ease-in-out shadow-[0_0_10px_rgba(124,77,255,0.5)]" style={{ width: "25%" }}></div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-[400px] mx-auto px-7 pt-[140px] pb-[48px] min-h-screen flex flex-col items-center">
          {/* Dramatic Headline */}
          <div className="w-full mb-12 text-left">
            <p className="text-[#7C4DFF] font-label font-bold text-[11px] uppercase tracking-[0.3em] mb-2 opacity-80">Identification</p>
            <h2 className="text-[64px] font-black text-white tracking-[-0.05em] leading-[0.9] text-glow">
              I am
            </h2>
          </div>

          {/* Character Selection Grid (Vertical Full-Width Cards) */}
          <div className="w-full space-y-6">
            {/* Male Selection Card */}
            <button onClick={nextStep} className="premium-card w-full rounded-2xl py-12 px-8 flex items-center justify-between group">
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
            <button onClick={nextStep} className="premium-card w-full rounded-2xl py-12 px-8 flex items-center justify-between group">
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

        {/* Footer */}
        <footer className="w-full py-8 px-7 flex flex-col items-center space-y-6 max-w-[400px] mx-auto">
          <div className="flex space-x-8">
            <a className="font-label text-[10px] uppercase font-bold text-white/20 hover:text-white/50 transition-colors tracking-widest" href="#">Privacy</a>
            <a className="font-label text-[10px] uppercase font-bold text-white/20 hover:text-white/50 transition-colors tracking-widest" href="#">Terms</a>
            <a className="font-label text-[10px] uppercase font-bold text-white/20 hover:text-white/50 transition-colors tracking-widest" href="#">Support</a>
          </div>
          <p className="font-label text-[9px] font-black text-[#7C4DFF] uppercase tracking-[0.4em] opacity-40">
            Engineered for Excellence
          </p>
        </footer>
      </div>
    );
  }

  /* ═══════════════════════════════════════════════════════
     STEP 1: Age (03_age.html)
     ═══════════════════════════════════════════════════════ */
  if (step === 1) {
    return (
      <div className="antialiased font-body">
        {/* Top Navigation Anchor */}
        <header className="fixed top-0 w-full z-50 flex justify-between items-center px-[28px] py-6 max-w-[400px] left-1/2 -translate-x-1/2 bg-[#08080C]">
          <div className="flex items-center gap-4">
            <span onClick={() => setStep(0)} className="material-symbols-outlined text-[#7C4DFF] cursor-pointer active:scale-95 transition-transform">arrow_back</span>
            <h1 className="font-['Sora'] font-semibold text-[26px] tracking-tight text-white">FaceRank</h1>
          </div>
          <div className="hidden"></div>
        </header>

        {/* Main Canvas */}
        <main className="relative w-full max-w-[390px] h-[844px] mx-auto flex flex-col pt-[96px] pb-[48px] px-[28px] overflow-hidden">
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
            {/* Option 1 */}
            <button onClick={nextStep} className="w-full h-[48px] glass-card rounded-lg flex items-center px-6 hover:bg-white/5 transition-all duration-300 group border border-white/5">
              <span className="text-[15px] font-medium text-white/60 group-hover:text-white transition-colors">12 – 15</span>
            </button>
            {/* Option 2 */}
            <button onClick={nextStep} className="w-full h-[48px] glass-card rounded-lg flex items-center px-6 hover:bg-white/5 transition-all duration-300 group border border-white/5">
              <span className="text-[15px] font-medium text-white/60 group-hover:text-white transition-colors">16 – 20</span>
            </button>
            {/* Option 3 */}
            <button onClick={nextStep} className="w-full h-[48px] glass-card rounded-lg flex items-center px-6 hover:bg-white/5 transition-all duration-300 group border border-white/5">
              <span className="text-[15px] font-medium text-white/60 group-hover:text-white transition-colors">21 – 25</span>
            </button>
            {/* Option 4: SELECTED */}
            <button onClick={nextStep} className="w-full h-[48px] glass-card-selected rounded-lg flex items-center justify-between px-6 border border-[#7C4DFF]/30 transition-all duration-300">
              <span className="text-[15px] font-medium text-white">26 – 30</span>
              <span className="material-symbols-outlined text-[#7C4DFF] text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            </button>
            {/* Option 5 */}
            <button onClick={nextStep} className="w-full h-[48px] glass-card rounded-lg flex items-center px-6 hover:bg-white/5 transition-all duration-300 group border border-white/5">
              <span className="text-[15px] font-medium text-white/60 group-hover:text-white transition-colors">31 – 40</span>
            </button>
            {/* Option 6 */}
            <button onClick={nextStep} className="w-full h-[48px] glass-card rounded-lg flex items-center px-6 hover:bg-white/5 transition-all duration-300 group border border-white/5">
              <span className="text-[15px] font-medium text-white/60 group-hover:text-white transition-colors">40+</span>
            </button>
          </div>

          {/* Bottom CTA */}
          <div className="mt-auto pt-8">
            <button onClick={nextStep} className="w-full h-[56px] rounded-xl bg-gradient-to-r from-[#7C4DFF] to-[#448AFF] flex items-center justify-center font-semibold text-white tracking-wide active:scale-[0.98] transition-all shadow-[0_8px_24px_rgba(124,77,255,0.3)]">
              Continue
            </button>
            <p className="text-[11px] text-white/20 text-center mt-4 font-label uppercase tracking-widest">Step 1 of 4</p>
          </div>
        </main>

        {/* Background Decorative Elements */}
        <div className="fixed top-[-10%] right-[-10%] w-[300px] h-[300px] bg-[#7C4DFF]/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
        <div className="fixed bottom-[-5%] left-[-5%] w-[250px] h-[250px] bg-[#448AFF]/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
      </div>
    );
  }

  /* ═══════════════════════════════════════════════════════
     STEP 2: Heritage Match (04_heritage_match.html)
     ═══════════════════════════════════════════════════════ */
  if (step === 2) {
    return (
      <div className="font-body">
        {/* TopAppBar */}
        <nav className="flex items-center justify-between w-full px-[28px] pt-[48px] pb-4 max-w-[400px] mx-auto bg-[#08080C] sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <span onClick={() => setStep(1)} className="material-symbols-outlined text-white opacity-60 hover:opacity-100 transition-opacity cursor-pointer">close</span>
            <h1 className="font-['Sora'] font-semibold text-[26px] tracking-[-0.035em] text-white">Heritage Match</h1>
          </div>
          <div className="text-xl font-bold text-white">
            {/* Brand Logo Placeholder */}
          </div>
        </nav>

        {/* Content Canvas */}
        <main className="max-w-[400px] mx-auto px-[28px] pt-8 pb-[140px]">
          {/* Hero Section */}
          <header className="mb-8">
            <h2 className="text-[22px] font-semibold text-white tracking-tight">Discover your heritage</h2>
            <p className="text-[13px] text-white/40 mt-2 leading-relaxed">AI analyzes your facial structure to match ethnicities and ancestries</p>
          </header>

          {/* DNA Visualization Placeholder */}
          <div className="w-full h-32 mb-12 flex items-center justify-center overflow-hidden rounded-2xl relative">
            <div className="absolute inset-0 opacity-20 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 animate-pulse"></div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="w-full h-full object-cover opacity-40 mix-blend-screen" alt="Abstract DNA double helix structure with neon purple and blue lighting, high-tech laboratory aesthetic, macro photography style" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDs-AtCVdKV2M0LOb-_zFkRYpLnFeD4mbPwVCa5F3CObiQvHDqua43lk0traOue9Y5Cz5ZqeTWKh41BX8d08nS95x2ixKdoG0YC84qv1Y_WZnPbAwDHOkeJiwgztQEy3HC4-vHUGJzEPKJHgdnDJ4iZ2mnj0u-UZHtBHh8zdZCdDYRx58d81N2NiVjlDyZyKywfnGwBQyBmZoGZNYuQ0eOqnWGOYPtUaVytStl_M5faf1QXlkcmuAkVLvTDJ0jfZD0Y0eV6j1kdzf0C" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-5xl opacity-80" style={{ fontVariationSettings: "'FILL' 1" }}>genetics</span>
            </div>
          </div>

          {/* Heritage Cards Container */}
          <div className="space-y-[12px]">
            {/* Card 1: Greek */}
            <div className="glass-card p-5 rounded-xl flex flex-col gap-4 border border-white/5">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="text-xl">🇬🇷</span>
                  <span className="text-[15px] font-medium text-white/90">Greek</span>
                </div>
                <span className="font-label text-sm font-semibold tracking-wider text-primary">34% match</span>
              </div>
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full premium-gradient rounded-full" style={{ width: "34%" }}></div>
              </div>
            </div>
            {/* Card 2: Italian */}
            <div className="glass-card p-5 rounded-xl flex flex-col gap-4 border border-white/5">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="text-xl">🇮🇹</span>
                  <span className="text-[15px] font-medium text-white/90">Italian</span>
                </div>
                <span className="font-label text-sm font-semibold tracking-wider text-primary">28% match</span>
              </div>
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full premium-gradient rounded-full" style={{ width: "28%" }}></div>
              </div>
            </div>
            {/* Card 3: Turkish */}
            <div className="glass-card p-5 rounded-xl flex flex-col gap-4 border border-white/5">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="text-xl">🇹🇷</span>
                  <span className="text-[15px] font-medium text-white/90">Turkish</span>
                </div>
                <span className="font-label text-sm font-semibold tracking-wider text-primary">18% match</span>
              </div>
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full premium-gradient rounded-full" style={{ width: "18%" }}></div>
              </div>
            </div>
            {/* Card 4: Spanish */}
            <div className="glass-card p-5 rounded-xl flex flex-col gap-4 border border-white/5">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="text-xl">🇪🇸</span>
                  <span className="text-[15px] font-medium text-white/90">Spanish</span>
                </div>
                <span className="font-label text-sm font-semibold tracking-wider text-primary">12% match</span>
              </div>
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full premium-gradient rounded-full" style={{ width: "12%" }}></div>
              </div>
            </div>
            {/* Card 5: French */}
            <div className="glass-card p-5 rounded-xl flex flex-col gap-4 border border-white/5">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="text-xl">🇫🇷</span>
                  <span className="text-[15px] font-medium text-white/90">French</span>
                </div>
                <span className="font-label text-sm font-semibold tracking-wider text-primary">8% match</span>
              </div>
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full premium-gradient rounded-full" style={{ width: "8%" }}></div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-12 px-4">
            <button onClick={nextStep} className="w-full h-[56px] premium-gradient rounded-[16px] font-semibold text-white tracking-wide shadow-[0_8px_32px_rgba(124,77,255,0.3)] active:scale-95 transition-transform duration-200">
              Continue
            </button>
          </div>
        </main>

        {/* BottomNavBar */}
        <nav className="fixed bottom-0 left-0 right-0 w-full z-50 flex justify-around items-center px-[28px] h-[96px] max-w-[400px] mx-auto bg-[#08080C]/80 backdrop-blur-lg rounded-t-[32px] shadow-[0_-4px_24px_rgba(124,77,255,0.05)]">
          {/* DNA / Heritage Tab (Active) */}
          <a className="flex flex-col items-center justify-center text-[#7C4DFF] drop-shadow-[0_0_8px_rgba(124,77,255,0.4)] transition-all scale-110" href="#">
            <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>genetics</span>
          </a>
          {/* History Tab */}
          <a className="flex flex-col items-center justify-center text-white/30 hover:text-white/60 transition-colors duration-200" href="#">
            <span className="material-symbols-outlined text-[28px]">history</span>
          </a>
          {/* Insights Tab */}
          <a className="flex flex-col items-center justify-center text-white/30 hover:text-white/60 transition-colors duration-200" href="#">
            <span className="material-symbols-outlined text-[28px]">insights</span>
          </a>
          {/* Profile Tab */}
          <a className="flex flex-col items-center justify-center text-white/30 hover:text-white/60 transition-colors duration-200" href="#">
            <span className="material-symbols-outlined text-[28px]">person</span>
          </a>
        </nav>
      </div>
    );
  }

  /* ═══════════════════════════════════════════════════════
     STEP 3: World Rankings (05_world_rankings.html)
     ═══════════════════════════════════════════════════════ */
  if (step === 3) {
    return (
      <div className="font-body selection:bg-primary/30">
        {/* Top App Bar */}
        <header className="flex justify-between items-center w-full px-[28px] pt-[64px] pb-[32px] max-w-[400px] mx-auto sticky top-0 bg-[#08080C]/80 backdrop-blur-md z-50">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#7C4DFF]">language</span>
            <span className="text-xl font-bold bg-gradient-to-r from-[#7C4DFF] to-[#448AFF] bg-clip-text text-transparent">Global Analytics</span>
          </div>
          <span className="material-symbols-outlined text-white/60 hover:text-white transition-colors cursor-pointer">account_circle</span>
        </header>

        <main className="max-w-[400px] mx-auto px-[28px] pb-[140px]">
          {/* Header Section */}
          <section className="mb-[48px]">
            <h1 className="text-[22px] font-semibold text-white mb-2 leading-tight tracking-tight">Where you&apos;d score highest</h1>
            <p className="text-[13px] text-white/40 leading-relaxed font-normal">Based on your features, hair color, eye color and facial structure</p>
          </section>

          {/* Hero Map Element */}
          <section className="relative aspect-[16/10] w-full mb-[56px] group">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent rounded-3xl blur-3xl opacity-20"></div>
            {/* Stylized World Map SVG Container */}
            <div className="relative w-full h-full glass-card rounded-2xl flex items-center justify-center p-6 overflow-hidden border border-white/[0.03]">
              <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)", backgroundSize: "24px 24px" }}></div>
              {/* Placeholder for the stylized Mercator Map */}
              <div className="relative w-full h-full flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="Stylized world map with scientific data overlay" className="w-full h-full object-contain opacity-40 grayscale brightness-50" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDeSU5bsEOzUcTKrRi-wC7jYGeAJsuE8gYgU2UVS4X91jZpxzTraqB2KDRnT6WiTVdTMJD6HyEkAMMucy-3YPhRd3KJsHdDPWIslKmPOZiwy5lfwHcd_311Qd1IUQi6toTk8ucpwsZnX_8UGbU9-nGy_-gOEy9ovmhAN4afZkRKMzBAVNocDSl5KkHQngv6tGG6Y0h15NKcPJleJW1l90Ks7_gFYOXod6QjHwLVOoqpdkk-lTMd5C3sSP22CJtcCI0hYeunsqGI3jgY" />
                {/* Glow Overlays (Absolute Positioned Markers) */}
                <div className="absolute top-[65%] left-[28%] w-12 h-12 bg-primary/40 rounded-full blur-xl map-glow-purple"></div>
                <div className="absolute top-[40%] left-[52%] w-10 h-10 bg-secondary/40 rounded-full blur-xl map-glow-blue"></div>
                <div className="absolute top-[48%] left-[62%] w-8 h-8 bg-accent/40 rounded-full blur-xl map-glow-teal"></div>
                {/* Data Scan Line */}
                <div className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent top-1/2 -translate-y-1/2 animate-pulse"></div>
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
              <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(124,77,255,0.6)]"></div>
              <p className="text-[15px] font-medium text-white/70">
                <span className="text-white font-semibold">Blonde hair</span> scores <span className="text-primary">+2.1</span> in South America
              </p>
            </div>
            <div className="glass-card p-4 rounded-xl border border-white/[0.03] flex items-center gap-4 group hover:bg-white/[0.06] transition-all">
              <div className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_rgba(68,138,255,0.6)]"></div>
              <p className="text-[15px] font-medium text-white/70">
                <span className="text-white font-semibold">Blue eyes</span> valued highly in Southern Europe
              </p>
            </div>
            <div className="glass-card p-4 rounded-xl border border-white/[0.03] flex items-center gap-4 group hover:bg-white/[0.06] transition-all">
              <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_rgba(38,166,154,0.6)]"></div>
              <p className="text-[15px] font-medium text-white/70">
                <span className="text-white font-semibold">Sharp jawline</span> preferred in Middle East
              </p>
            </div>
          </section>

          {/* Footer & Action */}
          <footer className="text-center">
            <p className="text-[12px] text-white/25 mb-8 font-label tracking-wide">YOUR TOP 10 COUNTRIES REVEALED AFTER SCAN</p>
            <button onClick={nextStep} className="w-full h-[56px] rounded-full bg-gradient-to-r from-[#7C4DFF] to-[#448AFF] text-white font-semibold text-[16px] shadow-[0_10px_30px_rgba(124,77,255,0.3)] active:scale-95 transition-transform duration-200">
              Continue
            </button>
          </footer>
        </main>

        {/* Bottom Navigation Bar */}
        <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-[28px] pb-[48px] h-[112px] bg-[#08080C]/80 backdrop-blur-xl border-t border-white/[0.03] shadow-[0_-10px_40px_rgba(124,77,255,0.1)]">
          <button className="flex flex-col items-center justify-center text-white/25 hover:text-white/80 transition-all">
            <span className="material-symbols-outlined">grid_view</span>
          </button>
          <button className="flex flex-col items-center justify-center text-white/25 hover:text-white/80 transition-all">
            <span className="material-symbols-outlined">explore</span>
          </button>
          <button className="flex flex-col items-center justify-center text-[#7C4DFF] drop-shadow-[0_0_8px_rgba(124,77,255,0.5)]">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>insights</span>
          </button>
          <button className="flex flex-col items-center justify-center text-white/25 hover:text-white/80 transition-all">
            <span className="material-symbols-outlined">person</span>
          </button>
        </nav>
      </div>
    );
  }

  /* ═══════════════════════════════════════════════════════
     STEP 4: Ancestral Blueprint (06_ancestral_blueprint.html)
     ═══════════════════════════════════════════════════════ */
  if (step === 4) {
    return (
      <div className="font-body selection:bg-primary/30">
        {/* Top Navigation (Shell) */}
        <header className="bg-[#08080C] flex items-center justify-between w-full px-[28px] py-6 max-w-[400px] mx-auto fixed top-0 left-0 right-0 z-50">
          <span onClick={() => setStep(3)} className="material-symbols-outlined text-white/60 hover:opacity-80 transition-opacity duration-300 cursor-pointer active:scale-95">close</span>
          <h1 className="font-['Sora'] font-semibold text-[26px] tracking-[-0.035em] text-white">Heritage Match</h1>
          <div className="w-6"></div>
        </header>

        {/* Main Canvas */}
        <main className="relative w-[390px] h-[844px] mx-auto overflow-hidden bg-[#08080C] flex flex-col pt-[96px] pb-[48px] px-[28px]">
          {/* Header Text */}
          <div className="text-center mb-10">
            <h2 className="text-[20px] font-semibold text-white tracking-tight mb-2">Discover your heritage</h2>
            <p className="text-[13px] text-white/25">AI matches your facial structure to ancestries</p>
          </div>

          {/* Hero Visual: DNA Helix */}
          <div className="relative h-[200px] w-full flex items-center justify-center mb-[16px]">
            {/* Stylized DNA Graphic */}
            <div className="relative w-full h-full flex justify-center items-center opacity-90">
              {/* DNA Strands Simulation */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-32 h-48 border-l-4 border-r-4 border-primary/20 rounded-[40%] rotate-12"></div>
                <div className="absolute w-32 h-48 border-l-4 border-r-4 border-secondary/20 rounded-[40%] -rotate-12"></div>
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
                <span className="font-['Space_Grotesk'] text-[15px] text-white">34%</span>
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
                <span className="font-['Space_Grotesk'] text-[15px] text-white">28%</span>
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
                    <div className="absolute inset-0 flex items-center justify-center text-[10px] text-white">☾</div>
                  </div>
                  <span className="text-[15px] font-medium text-white/60">Turkish</span>
                </div>
                <span className="font-['Space_Grotesk'] text-[15px] text-white">18%</span>
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
                <span className="font-['Space_Grotesk'] text-[15px] text-white">12%</span>
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
                <span className="font-['Space_Grotesk'] text-[15px] text-white">8%</span>
              </div>
              <div className="h-[3px] w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full progress-gradient w-[8%]"></div>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <button onClick={nextStep} className="w-full h-14 bg-gradient-to-r from-primary to-secondary rounded-xl font-semibold text-white mt-12 mb-4 hover:opacity-90 active:scale-[0.98] transition-all">
            Continue
          </button>
        </main>

        {/* Bottom Navigation Shell */}
        <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center px-[28px] pb-8 pt-4 max-w-[400px] mx-auto bg-[#08080C]/90 backdrop-blur-xl rounded-t-[32px] shadow-[0_-8px_30px_rgb(124,77,255,0.1)]">
          <div className="flex items-center justify-center text-[#7C4DFF] shadow-[0_0_20px_rgba(124,77,255,0.3)] bg-white/5 rounded-full p-3 transition-all duration-300">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>genetics</span>
          </div>
          <div className="flex items-center justify-center text-white/25 p-3 hover:text-white/80 transition-all duration-300">
            <span className="material-symbols-outlined">history</span>
          </div>
          <div className="flex items-center justify-center text-white/25 p-3 hover:text-white/80 transition-all duration-300">
            <span className="material-symbols-outlined">analytics</span>
          </div>
          <div className="flex items-center justify-center text-white/25 p-3 hover:text-white/80 transition-all duration-300">
            <span className="material-symbols-outlined">person</span>
          </div>
        </nav>
      </div>
    );
  }

  /* ═══════════════════════════════════════════════════════
     STEP 5: Diagnostic Heat Map (07_diagnostic_heatmap.html)
     ═══════════════════════════════════════════════════════ */
  if (step === 5) {
    return (
      <div className="bg-[#08080C] text-white font-body selection:bg-primary/30 min-h-screen">
        {/* Top Navigation Shell */}
        <header className="fixed top-0 w-full z-50 flex justify-between items-center px-7 h-24 max-w-[400px] mx-auto left-0 right-0 bg-[#08080C]">
          <div className="flex items-center gap-2">
            <span onClick={() => setStep(4)} className="material-symbols-outlined text-white/40 hover:opacity-80 transition-opacity active:scale-95 duration-200 cursor-pointer">close</span>
          </div>
          <h1 className="font-['Sora'] font-semibold text-[26px] tracking-tight text-[#7C4DFF]">FaceRank AI</h1>
          <div className="flex items-center">
            <span className="material-symbols-outlined text-white/40 hover:opacity-80 transition-opacity active:scale-95 duration-200 cursor-pointer">more_vert</span>
          </div>
        </header>

        <main className="max-w-[400px] mx-auto pt-32 pb-44 px-7 flex flex-col items-center">
          {/* Header Section */}
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
              <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100">
                <path d="M50 10 Q 85 10 85 45 T 50 95 T 15 45 T 50 10" fill="none" stroke="white" strokeWidth="0.5"></path>
                <path d="M25 35 Q 50 30 75 35" fill="none" stroke="white" strokeWidth="0.2"></path>
                <path d="M20 50 Q 50 45 80 50" fill="none" stroke="white" strokeWidth="0.2"></path>
                <path d="M30 75 Q 50 85 70 75" fill="none" stroke="white" strokeWidth="0.2"></path>
                <line stroke="white" strokeWidth="0.2" x1="50" x2="50" y1="10" y2="95"></line>
              </svg>
              {/* Thermal Zones (Limited to Green, Orange, Red) */}
              {/* Forehead: Green (Strong) */}
              <div className="absolute top-12 w-40 h-16 bg-status-strong thermal-glow opacity-30 rounded-full"></div>
              {/* Eyes: Orange (Average) */}
              <div className="absolute top-36 left-14 w-12 h-6 bg-status-average thermal-glow opacity-40 rounded-full"></div>
              <div className="absolute top-36 right-14 w-12 h-6 bg-status-average thermal-glow opacity-40 rounded-full"></div>
              {/* Nose: Green (Strong) */}
              <div className="absolute top-42 w-8 h-24 bg-status-strong thermal-glow opacity-40 rounded-full"></div>
              {/* Cheekbones: Red (Weak) */}
              <div className="absolute top-52 left-10 w-14 h-14 bg-status-weak thermal-glow opacity-30 rounded-full"></div>
              <div className="absolute top-52 right-10 w-14 h-14 bg-status-weak thermal-glow opacity-30 rounded-full"></div>
              {/* Jawline: Orange (Average) */}
              <div className="absolute bottom-10 w-48 h-12 bg-status-average thermal-glow opacity-30 rounded-full"></div>
              {/* Labels and Pointers */}
              {/* Forehead Label */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <span className="zone-label text-status-strong">Forehead</span>
                <div className="w-[1px] h-6 bg-status-strong/40 mt-1"></div>
              </div>
              {/* Eyes Label */}
              <div className="absolute top-32 -left-12 flex items-center">
                <span className="zone-label text-status-average">Eyes</span>
                <div className="w-8 h-[1px] bg-status-average/40 ml-1"></div>
              </div>
              {/* Cheekbones Label */}
              <div className="absolute top-56 -right-16 flex items-center">
                <div className="w-8 h-[1px] bg-status-weak/40 mr-1"></div>
                <span className="zone-label text-status-weak">Cheekbones</span>
              </div>
              {/* Skin Label */}
              <div className="absolute top-1/2 -left-12 -translate-y-1/2 flex items-center">
                <span className="zone-label text-status-strong">Skin</span>
                <div className="w-6 h-[1px] bg-status-strong/40 ml-1"></div>
              </div>
              {/* Nose Label */}
              <div className="absolute top-1/2 -right-12 -translate-y-1/2 flex items-center">
                <div className="w-6 h-[1px] bg-status-strong/40 mr-1"></div>
                <span className="zone-label text-status-strong">Nose</span>
              </div>
              {/* Jawline Label */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <div className="w-[1px] h-6 bg-status-average/40 mb-1"></div>
                <span className="zone-label text-status-average">Jawline</span>
              </div>
              {/* Central UI Element */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="w-full h-full object-contain mix-blend-screen opacity-50 pointer-events-none" alt="3D wireframe head" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-eFKIiwPsvT4EGg01JODxWGXDT2FcbKVQgUcuwmd74EO-PZcjmzbOKS9-T4vhFjAH3ZPm-NtXCajV1b0O8lk13J07QT3HqRHifM9VJnJsxsWekob7Anuf5r3OxxDsaBAXAJg043gCQmUKz31aiZ3AU3TmFkwe6HOYI5I2LDrFkiK7hzxazC72L1dxEk2VOzagunE0sZhTsbgGkpqdwgBRK25F7g54wBwQm6U-skm91RaqSv1_cM1GoKAdMmqOLhElVAEzL6e0E4tX" />
            </div>
            {/* Scanning Line Effect */}
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

          {/* Primary CTA */}
          <div className="fixed bottom-32 left-0 right-0 px-7 max-w-[400px] mx-auto z-40">
            <button onClick={nextStep} className="w-full h-14 bg-gradient-to-r from-[#7C4DFF] to-[#448AFF] text-white font-semibold rounded-2xl shadow-[0_10px_30px_rgba(124,77,255,0.3)] active:scale-95 transition-all duration-200">
              View Full Report
            </button>
          </div>
        </main>

        {/* Bottom Navigation Shell */}
        <nav className="fixed bottom-0 left-0 right-0 w-full z-50 flex justify-around items-center px-8 pb-10 pt-4 max-w-[400px] mx-auto bg-[#08080C]/80 backdrop-blur-xl rounded-t-[32px] border-t border-white/5 shadow-[0_-10px_40px_rgba(124,77,255,0.1)]">
          <div className="flex items-center justify-center bg-gradient-to-br from-[#7C4DFF] to-[#448AFF] text-white rounded-full p-3 shadow-[0_0_20px_rgba(124,77,255,0.4)] transition-all hover:text-white/60 active:scale-110">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>face</span>
          </div>
          <div className="flex items-center justify-center text-white/30 p-3 transition-all hover:text-white/60 active:scale-110">
            <span className="material-symbols-outlined">analytics</span>
          </div>
          <div className="flex items-center justify-center text-white/30 p-3 transition-all hover:text-white/60 active:scale-110">
            <span className="material-symbols-outlined">history</span>
          </div>
          <div className="flex items-center justify-center text-white/30 p-3 transition-all hover:text-white/60 active:scale-110">
            <span className="material-symbols-outlined">person</span>
          </div>
        </nav>
      </div>
    );
  }

  /* ═══════════════════════════════════════════════════════
     STEP 6: Scan Preview (10_scan_preview.html)
     ═══════════════════════════════════════════════════════ */
  if (step === 6) {
    return (
      <div className="font-body selection:bg-primary/30">
        {/* Top Navigation Anchor */}
        <header className="flex justify-between items-center w-full px-[28px] pt-[96px] pb-4 max-w-[400px] mx-auto bg-[#08080C] fixed top-0 left-0 right-0 z-50">
          <button onClick={() => setStep(5)} className="hover:opacity-80 transition-opacity duration-300 active:scale-95">
            <span className="material-symbols-outlined text-white text-[24px]">close</span>
          </button>
          <h1 className="font-['Sora'] text-[26px] font-semibold tracking-[-0.035em] text-white">Scan Preview</h1>
          <div className="w-6"></div>
        </header>

        <main className="max-w-[400px] mx-auto px-[28px] pt-[160px] pb-[140px]">
          {/* Header Section */}
          <section className="mb-[32px]">
            <h2 className="text-[22px] font-semibold tracking-[-0.035em] mb-2">Your complete analysis</h2>
            <p className="text-[13px] text-white/40 font-medium">6 AI-powered insights about your face</p>
          </section>

          {/* Feature Grid (2x3) */}
          <div className="grid grid-cols-2 gap-[16px]">
            {/* Face Score */}
            <div className="bg-white/[0.03] p-4 rounded-[12px] transition-all duration-300 card-glow border border-white/[0.02]">
              <span className="material-symbols-outlined text-[#7C4DFF] mb-3 block text-[24px]">shutter_speed</span>
              <h3 className="text-[14px] font-semibold mb-1">Face Score</h3>
              <p className="text-[11px] text-white/40 leading-tight">Rated across 6 attributes</p>
            </div>
            {/* World Rankings */}
            <div className="bg-white/[0.03] p-4 rounded-[12px] transition-all duration-300 card-glow border border-white/[0.02]">
              <span className="material-symbols-outlined text-[#7C4DFF] mb-3 block text-[24px]">public</span>
              <h3 className="text-[14px] font-semibold mb-1">World Rankings</h3>
              <p className="text-[11px] text-white/40 leading-tight">Top 10 countries for you</p>
            </div>
            {/* Heritage Match */}
            <div className="bg-white/[0.03] p-4 rounded-[12px] transition-all duration-300 card-glow border border-white/[0.02]">
              <span className="material-symbols-outlined text-[#7C4DFF] mb-3 block text-[24px]">genetics</span>
              <h3 className="text-[14px] font-semibold mb-1">Heritage Match</h3>
              <p className="text-[11px] text-white/40 leading-tight">Your ancestry breakdown</p>
            </div>
            {/* Glow-Up Plan */}
            <div className="bg-white/[0.03] p-4 rounded-[12px] transition-all duration-300 card-glow border border-white/[0.02]">
              <span className="material-symbols-outlined text-[#7C4DFF] mb-3 block text-[24px]">trending_up</span>
              <h3 className="text-[14px] font-semibold mb-1">Glow-Up Plan</h3>
              <p className="text-[11px] text-white/40 leading-tight">Steps to maximize potential</p>
            </div>
            {/* Best Hairstyle */}
            <div className="bg-white/[0.03] p-4 rounded-[12px] transition-all duration-300 card-glow border border-white/[0.02]">
              <span className="material-symbols-outlined text-[#7C4DFF] mb-3 block text-[24px]">content_cut</span>
              <h3 className="text-[14px] font-semibold mb-1">Best Hairstyle</h3>
              <p className="text-[11px] text-white/40 leading-tight">AI-matched to your shape</p>
            </div>
            {/* Heat Map */}
            <div className="bg-white/[0.03] p-4 rounded-[12px] transition-all duration-300 card-glow border border-white/[0.02]">
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30" alt="close-up abstract shot of high-tech digital facial scanning grid with neon purple highlights on deep black background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrD7r43vBce6e6oYPiRK-PdzHK23tkcNHjEdR1yIFJ59KtobZsXH8IjeKDhDOu-U6IVw_HbbjMh1gGsyhAuMkEyncejUp7SoKWJymb5DdK66B31AOSSto9Swk7LGFRxVp6bXI8x1JRA6S9Nf5_fXlmNhPF37Nk3XvCw7PSzomYw4QJ8KrUXTxvl-jm_PAceaeQOqpeO_tqVBLK8Jp575ZoKNz6DqhO01TgRlrw56rbHRxpBiMsO5Y42KNOk5ybPk_szEldgSYz51H9" />
          </div>
        </main>

        {/* Fixed Bottom CTA */}
        <div className="fixed bottom-0 left-0 right-0 max-w-[400px] mx-auto px-[28px] pb-[48px] pt-8 bg-gradient-to-t from-[#08080C] via-[#08080C] to-transparent z-50">
          <button onClick={nextStep} className="w-full premium-gradient h-[56px] rounded-xl flex items-center justify-center gap-2 shadow-[0_12px_24px_-8px_rgba(124,77,255,0.5)] active:scale-95 transition-all duration-200">
            <span className="text-[16px] font-semibold tracking-tight">Scan my face</span>
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </button>
        </div>

        {/* Bottom Navigation Component (Icons Only) */}
        <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-[28px] pb-[48px] max-w-[400px] mx-auto bg-transparent pointer-events-none">
          <div className="flex justify-around items-center w-full bg-[#08080C]/80 backdrop-blur-xl rounded-full p-2 pointer-events-auto border border-white/[0.05] hidden">
            <button className="flex flex-col items-center justify-center bg-white/5 text-[#7C4DFF] rounded-full p-4 shadow-[0_0_15px_rgba(124,77,255,0.2)] subtle scale-110 transition-transform">
              <span className="material-symbols-outlined">shutter_speed</span>
            </button>
            <button className="flex flex-col items-center justify-center text-white/20 p-4 hover:text-white/40 transition-colors">
              <span className="material-symbols-outlined">auto_awesome</span>
            </button>
            <button className="flex flex-col items-center justify-center text-white/20 p-4 hover:text-white/40 transition-colors">
              <span className="material-symbols-outlined">person</span>
            </button>
          </div>
        </nav>
      </div>
    );
  }

  /* ═══════════════════════════════════════════════════════
     STEP 7: Selfie Upload (11_selfie_upload.html)
     ═══════════════════════════════════════════════════════ */
  if (step === 7) {
    return (
      <div className="font-body selection:bg-primary/30">
        {/* Top Navigation Shell */}
        <header className="bg-[#08080C] text-white flex justify-between items-center w-full px-7 pt-12 pb-4 max-w-[400px] mx-auto sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <span onClick={() => setStep(6)} className="material-symbols-outlined text-white/60 hover:text-white transition-colors cursor-pointer">arrow_back</span>
          </div>
          <h1 className="font-['Sora'] font-semibold text-[26px] tracking-[-0.035em] text-xl font-bold bg-gradient-to-r from-[#7C4DFF] to-[#448AFF] bg-clip-text text-transparent">FaceRank</h1>
          <div className="w-6"></div>
        </header>

        {/* Progress Indicator */}
        <div className="max-w-[400px] mx-auto px-7 mb-20">
          <div className="w-full h-[3px] bg-white/5 rounded-full overflow-hidden">
            <div className="h-full w-[80%] bg-gradient-to-r from-[#7C4DFF] to-[#448AFF] rounded-full"></div>
          </div>
        </div>

        {/* Main Content Canvas */}
        <main className="max-w-[400px] mx-auto px-7 flex flex-col items-center">
          {!preview ? (
            <>
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
              {/* Preview state */}
              <div className="text-center mb-8">
                <h2 className="text-[22px] font-semibold tracking-[-0.035em] text-white">Looking good</h2>
                <p className="text-[13px] text-white/40 mt-1">Ready to analyze your face</p>
              </div>
              <div className="relative w-[170px] aspect-[3/4] rounded-[24px] overflow-hidden ring-1 ring-white/[0.06] mb-12">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={preview} alt="" className="w-full h-full object-cover" />
                <div className="scan-line"></div>
                <button
                  onClick={() => { setPreview(null); sessionStorage.removeItem("facerank_image"); }}
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
        </main>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="user"
          className="hidden"
          onChange={onFile}
        />

        {/* Bottom Navigation Shell */}
        <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-7 pb-12 h-24 max-w-[400px] left-1/2 -translate-x-1/2 bg-[#08080C]/80 backdrop-blur-xl">
          <a className="flex items-center justify-center text-white/25 hover:text-white/50 transition-all duration-300 active:translate-y-[-2px]" href="#">
            <span className="material-symbols-outlined text-2xl">shutter_speed</span>
          </a>
          <a className="flex items-center justify-center text-white/25 hover:text-white/50 transition-all duration-300 active:translate-y-[-2px]" href="#">
            <span className="material-symbols-outlined text-2xl">history</span>
          </a>
          <a className="flex items-center justify-center text-white/25 hover:text-white/50 transition-all duration-300 active:translate-y-[-2px]" href="#">
            <span className="material-symbols-outlined text-2xl">insights</span>
          </a>
          <a className="flex items-center justify-center text-white/25 hover:text-white/50 transition-all duration-300 active:translate-y-[-2px]" href="#">
            <span className="material-symbols-outlined text-2xl">person</span>
          </a>
        </nav>

        {/* Decorative Background Elements */}
        <div className="fixed top-[-10%] right-[-10%] w-[60%] aspect-square bg-primary/10 blur-[120px] -z-10 rounded-full"></div>
        <div className="fixed bottom-[-5%] left-[-10%] w-[50%] aspect-square bg-secondary/5 blur-[100px] -z-10 rounded-full"></div>
      </div>
    );
  }

  return null;
}
