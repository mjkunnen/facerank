"use client";

export default function ResultsPage() {
  const scrollToUnlock = () => {
    document.getElementById("unlock-section")?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="bg-[#08080C] text-white font-body antialiased">
      {/* Top App Bar */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-7 h-24 max-w-[400px] mx-auto bg-[#08080C] border-none">
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-[#7C4DFF]">menu</span>
          <h1 className="text-xl font-black tracking-tighter text-white uppercase font-headline">FACERANK</h1>
        </div>
        <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10">
          <img
            className="w-full h-full object-cover"
            alt="portrait of a stylish young man with sharp facial features and clean haircut against a dark studio background"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwcAQ4H9y6SKrZkH0ttaPjfJOMUl9Mmmu3ieqybUE_cqauQU5nnfGfv9BygDhOMCuKwLcxvFmwwHLwwzJvQiy3szrRr1ztZz7AXDP9PQc4L-dMLUPMzbu9KXw74QoT2vozYG0C0BFpHMiR0ljKawJXetJcGSvrjKlZJpDhgWPgGooCrNsDF6hjz1NfMXJZzkdTby8cLxN4gxU4PKRL4pODgO4bQHrizXuxG1kwhpmxJW6TRFUA4U29hvV7QzRPW2nlt4L71-ns1nbh"
          />
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="pt-32 pb-48 px-7 max-w-[400px] mx-auto space-y-12">
        {/* SECTION 1: SCORE */}
        <section className="flex items-end justify-between">
          <div className="flex items-baseline gap-0.5">
            <span className="text-[32px] font-bold tracking-tighter leading-none">7.</span>
            <span className="text-[32px] font-bold tracking-tighter leading-none heavy-blur opacity-80">4</span>
            <span className="text-[14px] font-label opacity-40 ml-2">/ 10</span>
          </div>
          <div className="text-right">
            <p className="text-[14px] font-medium">Top <span className="heavy-blur">██</span>%</p>
            <p className="text-[10px] font-label opacity-25 uppercase tracking-widest">Attractive</p>
          </div>
        </section>

        <hr className="border-white/5" />

        {/* SECTION 2: YOUR BEST SCORES */}
        <section className="space-y-6">
          <h3 className="text-[14px] font-bold font-label uppercase tracking-widest text-white/60">Your best scores</h3>
          <div className="grid grid-cols-2 gap-[6px]">
            {/* Visible Stat */}
            <div className="glass-card p-4 rounded-xl border border-white/[0.02]">
              <div className="flex justify-between items-start mb-2">
                <span className="text-lg font-bold font-label text-gradient">7.4</span>
                <div className="w-1 h-4 bg-primary rounded-full shadow-[0_0_8px_rgba(124,77,255,0.5)]"></div>
              </div>
              <span className="text-[12px] opacity-60">Harmony</span>
            </div>
            {/* Blurred Stats */}
            <div className="glass-card p-4 rounded-xl opacity-60">
              <div className="flex justify-between items-start mb-2">
                <span className="text-lg font-bold font-label">8.1</span>
                <div className="w-1 h-4 bg-white/20 rounded-full"></div>
              </div>
              <span className="text-[12px] heavy-blur">Symmetry</span>
            </div>
            <div className="glass-card p-4 rounded-xl opacity-60">
              <div className="flex justify-between items-start mb-2">
                <span className="text-lg font-bold font-label">7.8</span>
                <div className="w-1 h-4 bg-white/20 rounded-full"></div>
              </div>
              <span className="text-[12px] heavy-blur">Jawline</span>
            </div>
            <div className="glass-card p-4 rounded-xl opacity-60">
              <div className="flex justify-between items-start mb-2">
                <span className="text-lg font-bold font-label">7.2</span>
                <div className="w-1 h-4 bg-white/20 rounded-full"></div>
              </div>
              <span className="text-[12px] heavy-blur">Skin Health</span>
            </div>
            {/* Locked Stats */}
            <div className="glass-card p-4 rounded-xl opacity-30 flex items-center justify-center">
              <span className="heavy-blur text-lg font-bold font-label">9.0 Visual</span>
            </div>
            <div className="glass-card p-4 rounded-xl opacity-30 flex items-center justify-center">
              <span className="heavy-blur text-lg font-bold font-label">8.5 Appeal</span>
            </div>
          </div>
        </section>

        <hr className="border-white/5" />

        {/* SECTION 3: WORLD RANKINGS */}
        <section className="space-y-6 cursor-pointer" onClick={scrollToUnlock}>
          <h3 className="text-[14px] font-bold font-label uppercase tracking-widest text-white/60">🌍 Top 5 Countries</h3>
          <div className="space-y-[5px]">
            <div className="flex items-center justify-between p-3 heavy-blur opacity-20">
              <span>#1 🇺🇸 USA</span>
              <span className="font-label">8.9</span>
            </div>
            <div className="flex items-center justify-between p-3 heavy-blur opacity-30">
              <span>#2 🇧🇷 Brazil</span>
              <span className="font-label">8.7</span>
            </div>
            <div className="flex items-center justify-between p-3 glass-card rounded-lg border border-primary/20">
              <div className="flex items-center gap-3">
                <span className="text-[12px] font-bold text-primary">#3</span>
                <span className="text-[14px]">🇪🇸 Spain</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[10px] opacity-40 italic">&quot;Hunter eyes&quot;</span>
                <span className="font-label font-bold text-gradient">8.4</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 heavy-blur opacity-30">
              <span>#4 🇮🇹 Italy</span>
              <span className="font-label">8.1</span>
            </div>
            <div className="flex items-center justify-between p-3 heavy-blur opacity-20">
              <span>#5 🇦🇺 Australia</span>
              <span className="font-label">7.9</span>
            </div>
          </div>
        </section>

        <hr className="border-white/5" />

        {/* SECTION 4: HERITAGE */}
        <section className="space-y-6 cursor-pointer" onClick={scrollToUnlock}>
          <h3 className="text-[14px] font-bold font-label uppercase tracking-widest text-white/60">🧬 Heritage</h3>
          <div className="flex flex-wrap gap-3">
            <div className="px-4 py-2 glass-card rounded-full flex items-center gap-2 border border-white/5">
              <span className="text-sm">🇬🇷</span>
              <span className="text-[13px] font-medium">Greek</span>
              <span className="text-[13px] font-label text-primary">34%</span>
            </div>
            <div className="px-4 py-2 glass-card rounded-full flex items-center gap-2 border border-white/5">
              <span className="text-sm">🇮🇹</span>
              <span className="text-[13px] font-medium">Italian</span>
              <span className="text-[13px] font-label text-primary">28%</span>
            </div>
            <div className="px-4 py-2 glass-card rounded-full heavy-blur opacity-40">
              <span className="text-[13px]">Northern European 15%</span>
            </div>
            <div className="px-4 py-2 glass-card rounded-full heavy-blur opacity-20">
              <span className="text-[13px]">East Asian 12%</span>
            </div>
            <div className="px-4 py-2 glass-card rounded-full heavy-blur opacity-10">
              <span className="text-[13px]">Middle Eastern 11%</span>
            </div>
          </div>
        </section>

        <hr className="border-white/5" />

        {/* SECTION 5: HEAT MAP */}
        <section className="space-y-6 cursor-pointer" onClick={scrollToUnlock}>
          <div className="flex justify-between items-center">
            <h3 className="text-[14px] font-bold font-label uppercase tracking-widest text-white/60">🔥 Heat Map</h3>
            <span className="text-[10px] font-label text-primary tracking-widest uppercase">Analysis: Pro</span>
          </div>
          <div className="relative h-[200px] w-full glass-card rounded-3xl overflow-hidden flex items-center justify-center border border-white/5">
            {/* Thermal Overlay Simulation */}
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10 opacity-40"></div>
            <div className="w-32 h-44 rounded-[40px] medium-blur opacity-80 relative">
              <img
                className="w-full h-full object-cover rounded-[40px] mix-blend-screen opacity-70"
                alt="stylized heat map overlay on a human face silhouette with vibrant green, orange, and red spectrums indicating facial symmetry points"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLfZwY2kO0yUHpw5oVUR1lOmCbsSvBZNzT7qxgH5pHg8WJgkkfCV4C3pjJ9MBHV_tjfm-GmDlUjHJRelqTalT6zN4HwSKplNx8_wDz_YQFl9bKvUhQLKIf-cJtICFJ4KnwROz5Qqkgg5hqC7aLxnuBdWLxFy33BKJUghrnrJCfuhMQOrFfT79Y7plEK-z7d8OtPDIVDv4aruJVU5ZQc1W8j9LQSmsS_WAPmaglj72Mt4iG1caTCqtZW0QL8el2iQbIXIBQmAfKeKha"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-orange-500/20 to-red-500/20 mix-blend-overlay"></div>
            </div>
            {/* PRO Badge */}
            <div className="absolute top-4 right-4 bg-gradient-cta px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase shadow-lg shadow-primary/40">
              🔒 PRO
            </div>
          </div>
        </section>

        <hr className="border-white/5" />

        {/* SECTION 6: GLOW-UP PLAN */}
        <section className="space-y-8 cursor-pointer" onClick={scrollToUnlock}>
          <h3 className="text-[14px] font-bold font-label uppercase tracking-widest text-white/60">📈 Glow-Up Plan</h3>
          <div className="flex items-center justify-around py-4">
            <div className="flex flex-col items-center gap-2">
              <div className="w-20 h-20 rounded-full border-2 border-white/10 flex items-center justify-center glass-card">
                <span className="text-lg font-bold font-label">7.<span className="heavy-blur">4</span></span>
              </div>
              <span className="text-[11px] opacity-40">Current</span>
            </div>
            <span className="material-symbols-outlined text-primary text-3xl">trending_flat</span>
            <div className="flex flex-col items-center gap-2">
              <div className="w-20 h-20 rounded-full border-2 border-primary/30 flex items-center justify-center bg-primary/5 shadow-[0_0_20px_rgba(124,77,255,0.1)]">
                <span className="text-lg font-bold font-label text-gradient">8.<span className="heavy-blur">2</span></span>
              </div>
              <span className="text-[11px] font-medium text-primary">Potential</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="p-4 glass-card rounded-2xl border border-white/[0.02]">
              <div className="flex items-center justify-between">
                <span className="text-[14px] text-white">Debloat</span>
                <span className="text-[10px] font-label px-3 py-1 bg-green-500/10 text-green-400 rounded-full uppercase tracking-tighter">Easy</span>
              </div>
              <p className="text-[12px] text-white/40 mt-2">Use gua sha facial massages and you will reach +0.7</p>
            </div>
            <div className="flex items-center justify-between p-4 glass-card rounded-2xl border border-white/[0.02]">
              <span className="text-[14px] heavy-blur">Optimize Skin Clarity</span>
              <span className="text-[10px] font-label px-3 py-1 bg-orange-500/10 text-orange-400 rounded-full uppercase tracking-tighter">Medium</span>
            </div>
            <div className="flex items-center justify-between p-4 glass-card rounded-2xl border border-white/[0.02]">
              <span className="text-[14px] heavy-blur">Facial Fat Reduction</span>
              <span className="text-[10px] font-label px-3 py-1 bg-red-500/10 text-red-400 rounded-full uppercase tracking-tighter">Hard</span>
            </div>
          </div>
        </section>

        <hr className="border-white/5" />

        {/* SECTION 7: BEST HAIRSTYLE */}
        <section className="space-y-6 cursor-pointer" onClick={scrollToUnlock}>
          <h3 className="text-[14px] font-bold font-label uppercase tracking-widest text-white/60">💇 Best Hairstyle</h3>
          <div className="space-y-3">
            <div className="p-4 glass-card rounded-2xl opacity-40 heavy-blur">
              Buzz Cut — masculine aesthetic
            </div>
            <div className="p-5 glass-card rounded-2xl border border-primary/20 bg-primary/[0.02] shadow-[0_0_15px_rgba(124,77,255,0.05)]">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">check_circle</span>
                <div>
                  <p className="text-[15px] font-semibold">Textured Fringe</p>
                  <p className="text-[11px] opacity-40">Perfect for oval face shape</p>
                </div>
              </div>
            </div>
            <div className="p-4 glass-card rounded-2xl opacity-40 heavy-blur">
              Slicked Back — sharp professional
            </div>
          </div>
        </section>
      </main>

      {/* PREMIUM UNLOCK SECTION */}
      <div id="unlock-section" className="w-full max-w-[400px] mx-auto px-7 pt-8 pb-20">

        {/* Locked Insight Teasers */}
        <div className="space-y-3 mb-10">
          <div className="p-4 glass-card rounded-2xl border border-white/5 flex items-center justify-between cursor-pointer" onClick={scrollToUnlock}>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-[20px]">warning</span>
              <span className="text-[13px] font-medium heavy-blur">Your biggest facial limiter is ████████</span>
            </div>
            <span className="material-symbols-outlined text-white/20 text-[18px]">lock</span>
          </div>
          <div className="p-4 glass-card rounded-2xl border border-white/5 flex items-center justify-between cursor-pointer" onClick={scrollToUnlock}>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-[20px]">trending_up</span>
              <span className="text-[13px] font-medium heavy-blur">How to gain +0.4 to +0.8 on your score</span>
            </div>
            <span className="material-symbols-outlined text-white/20 text-[18px]">lock</span>
          </div>
          <div className="p-4 glass-card rounded-2xl border border-white/5 flex items-center justify-between cursor-pointer" onClick={scrollToUnlock}>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-[20px]">route</span>
              <span className="text-[13px] font-medium heavy-blur">Your exact glow-up roadmap with timeline</span>
            </div>
            <span className="material-symbols-outlined text-white/20 text-[18px]">lock</span>
          </div>
        </div>

        {/* Premium Value Block */}
        <div className="text-center mb-8">
          <h2 className="text-[22px] font-bold tracking-tight text-white mb-2">Get My Complete Analysis</h2>
          <p className="text-[13px] text-white/40 leading-relaxed">See exactly what helps your face, what hurts it, and how to improve fast.</p>
        </div>

        {/* Value List */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
            <span className="text-[13px] text-white/70">Full facial strengths &amp; weaknesses</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
            <span className="text-[13px] text-white/70">Your biggest appearance limiter</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
            <span className="text-[13px] text-white/70">Best hairstyle for your exact face shape</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
            <span className="text-[13px] text-white/70">Your highest-ROI glow-up upgrades</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
            <span className="text-[13px] text-white/70">Your personalized improvement roadmap</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
            <span className="text-[13px] text-white/70">Your realistic score improvement potential</span>
          </div>
        </div>

        {/* Support Line */}
        <p className="text-[11px] text-white/20 text-center mb-6 tracking-wide">Personalized from your scan · Instant access · Cancel anytime</p>

        {/* CTAs */}
        <div className="space-y-3">
          <button className="w-full h-14 bg-gradient-cta rounded-2xl font-bold text-[15px] flex flex-col items-center justify-center shadow-[0_8px_32px_rgba(124,77,255,0.3)] active:scale-95 transition-transform">
            <span>Get My Complete Analysis</span>
            <span className="text-[10px] opacity-70 font-normal">$4.95/week · Cancel anytime in 1 tap</span>
          </button>
          <button className="w-full h-12 rounded-2xl border border-white/10 font-medium text-[13px] text-white/60 hover:text-white transition-colors active:scale-95 transition-transform bg-white/5">
            Unlock free by inviting 3 friends
          </button>
        </div>

      </div>
    </div>
  );
}
