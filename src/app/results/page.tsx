"use client";

import { useEffect, useState } from "react";
import FaceScanOverlay from "@/components/FaceScanOverlay";

interface AnalysisData {
  overall_score: number;
  percentile: number;
  tier: string;
  scores: Record<string, { score: number; label: string }>;
  countries: { flag: string; name: string; score: number; reason: string }[];
  heritage: { name: string; percentage: number; features: string }[];
  strong_points: { area: string; detail: string; score: number }[];
  weak_points: { area: string; detail: string; score: number }[];
  glowup: { current: number; potential: number; steps: { name: string; gain: number; tip: string }[] };
  hairstyles: { rank: number; name: string; note: string }[];
}

export default function ResultsPage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [data, setData] = useState<AnalysisData | null>(null);
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [referralCount, setReferralCount] = useState(0);
  const [shared, setShared] = useState(false);

  useEffect(() => {
    const img = sessionStorage.getItem("facerank_image");
    if (img) setImageUrl(img);

    const raw = sessionStorage.getItem("primemog_results");
    if (raw) setData(JSON.parse(raw));

    const userData = sessionStorage.getItem("primemog_user");
    if (userData) {
      const user = JSON.parse(userData);
      setReferralCode(user.referral_code);
      fetch(`https://qfbcxljxskebkyuvprqw.supabase.co/rest/v1/referrals?referrer_id=eq.${user.id}&completed=eq.true&select=count`, {
        headers: { 'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmYmN4bGp4c2tlYmt5dXZwcnF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4NDc5NDIsImV4cCI6MjA5MDQyMzk0Mn0.ih3jjjvYHpPo6_JO7W2vmO0vHskU9HG122FGa6_-5sQ' }
      }).then(r => r.json()).then(d => { if (d?.[0]?.count) setReferralCount(d[0].count); });
    }
  }, []);

  const scrollToUnlock = () => {
    document.getElementById("unlock-section")?.scrollIntoView({ behavior: "smooth" });
  };

  // Split overall score into integer + decimal
  const scoreInt = data ? Math.floor(data.overall_score).toString() + "." : "7.";
  const scoreDec = data ? (data.overall_score % 1).toFixed(1).substring(2) : "4";

  // Get scores as array, first one visible, rest blurred
  const scoreEntries = data ? Object.values(data.scores) : [];

  // Glow-up current/potential split
  const glowCurrent = data?.glowup?.current?.toFixed(1) || "7.4";
  const glowPotential = data?.glowup?.potential?.toFixed(1) || "8.2";

  return (
    <div className="bg-[#08080C] text-white font-body antialiased">
      {/* Top App Bar */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-center items-center h-20 max-w-[400px] mx-auto bg-[#08080C]/90 backdrop-blur-md">
        <h1 className="text-2xl font-black tracking-tighter text-white uppercase font-headline">PRIMEMOG</h1>
      </header>

      {/* Main Content Canvas */}
      <main className="pt-32 pb-48 px-7 max-w-[400px] mx-auto space-y-12">
        {/* SECTION 1: SCORE */}
        <section className="flex items-end justify-between cursor-pointer tap-bounce" onClick={scrollToUnlock}>
          <div className="flex items-baseline gap-0.5">
            <span className="text-[32px] font-bold tracking-tighter leading-none">{scoreInt}</span>
            <span className="text-[32px] font-bold tracking-tighter leading-none heavy-blur opacity-80">{scoreDec}</span>
            <span className="text-[14px] font-label opacity-40 ml-2">/ 10</span>
          </div>
          <div className="text-right">
            <p className="text-[14px] font-medium">Top <span className="heavy-blur">{data?.percentile || "██"}</span>%</p>
            <p className="text-[10px] font-label opacity-25 uppercase tracking-widest">{data?.tier || "Attractive"}</p>
          </div>
        </section>

        {/* USER PHOTO WITH FACE-TRACKED SCAN OVERLAY */}
        {imageUrl && (
          <div className="flex justify-center">
            <FaceScanOverlay
              imageUrl={imageUrl}
              size={120}
              className="rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(74,222,128,0.15)]"
            />
          </div>
        )}

        <hr className="border-white/5" />

        {/* SECTION 2: FACIAL ANALYSIS */}
        <section className="space-y-6 cursor-pointer tap-bounce" onClick={scrollToUnlock}>
          <h3 className="text-[14px] font-bold font-label uppercase tracking-widest text-white/60">Your facial analysis</h3>
          <div className="grid grid-cols-2 gap-[6px]">
            {scoreEntries.slice(0, 1).map((s, i) => (
              <div key={i} className="glass-card p-4 rounded-xl border border-white/[0.02]">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-lg font-bold font-label text-gradient">{s.score}</span>
                  <div className="w-1 h-4 bg-primary rounded-full shadow-[0_0_8px_rgba(124,77,255,0.5)]"></div>
                </div>
                <span className="text-[12px] opacity-60">{s.label}</span>
              </div>
            ))}
            {scoreEntries.slice(1, 4).map((s, i) => (
              <div key={i} className="glass-card p-4 rounded-xl opacity-60">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-lg font-bold font-label">{s.score}</span>
                  <div className="w-1 h-4 bg-white/20 rounded-full"></div>
                </div>
                <span className="text-[12px] heavy-blur">{s.label}</span>
              </div>
            ))}
            {scoreEntries.slice(4).map((s, i) => (
              <div key={i} className="glass-card p-4 rounded-xl opacity-30 flex items-center justify-center">
                <span className="heavy-blur text-lg font-bold font-label">{s.score} {s.label}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5" />

        {/* SECTION 3: WORLD RANKINGS */}
        <section className="space-y-6 cursor-pointer tap-bounce" onClick={scrollToUnlock}>
          <h3 className="text-[14px] font-bold font-label uppercase tracking-widest text-white/60">🌍 These countries love you the most...</h3>
          <div className="space-y-[5px]">
            {(data?.countries || []).map((c, i) => {
              if (i === 2) return (
                <div key={i} className="flex items-center justify-between p-3 glass-card rounded-lg border border-primary/20">
                  <div className="flex items-center gap-3">
                    <span className="text-[12px] font-bold text-primary">#{i + 1}</span>
                    <span className="text-[14px]">{c.flag} {c.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] opacity-40 italic heavy-blur">&quot;{c.reason}&quot;</span>
                    <span className="font-label font-bold text-gradient">{c.score}</span>
                  </div>
                </div>
              );
              return (
                <div key={i} className="flex items-center justify-between p-3 heavy-blur opacity-25">
                  <span>#{i + 1} {c.flag} {c.name}</span>
                  <span className="font-label">{c.score}</span>
                </div>
              );
            })}
          </div>
        </section>

        <hr className="border-white/5" />

        {/* SECTION 4: HERITAGE */}
        <section className="space-y-6 cursor-pointer tap-bounce" onClick={scrollToUnlock}>
          <h3 className="text-[14px] font-bold font-label uppercase tracking-widest text-white/60">🧬 Your heritage based on facial structure</h3>
          <div className="flex flex-wrap gap-3">
            {(data?.heritage || []).slice(0, 2).map((h, i) => (
              <div key={i} className="px-4 py-2 glass-card rounded-full flex items-center gap-2 border border-white/5">
                <span className="text-[13px] font-medium">{h.name}</span>
                <span className="text-[13px] font-label text-primary">{h.percentage}%</span>
              </div>
            ))}
            {(data?.heritage || []).slice(2).map((h, i) => (
              <div key={i} className="px-4 py-2 glass-card rounded-full heavy-blur" style={{ opacity: 0.4 - i * 0.1 }}>
                <span className="text-[13px]">{h.name} {h.percentage}%</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5" />

        {/* SECTION 5: HEAT MAP */}
        <section className="space-y-6 cursor-pointer tap-bounce" onClick={scrollToUnlock}>
          <div className="flex justify-between items-center">
            <h3 className="text-[14px] font-bold font-label uppercase tracking-widest text-white/60">🔥 Heat Map</h3>
            <span className="text-[10px] font-label text-primary tracking-widest uppercase">Analysis: Pro</span>
          </div>
          <div className="relative h-[200px] w-full glass-card rounded-3xl overflow-hidden flex items-center justify-center border border-white/5">
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10 opacity-40"></div>
            {imageUrl ? (
              <div className="w-32 h-44 rounded-[40px] medium-blur opacity-80 relative">
                <img className="w-full h-full object-cover rounded-[40px] mix-blend-screen opacity-70" alt="heat map" src={imageUrl} />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-orange-500/20 to-red-500/20 mix-blend-overlay"></div>
              </div>
            ) : (
              <div className="w-32 h-44 rounded-[40px] medium-blur opacity-80 relative bg-white/5">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-orange-500/20 to-red-500/20"></div>
              </div>
            )}
            <div className="absolute top-4 right-4 bg-gradient-cta px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase shadow-lg shadow-primary/40">
              🔒 PRO
            </div>
          </div>
          {/* Strong Points */}
          <div className="space-y-2">
            <p className="text-[11px] font-label text-green-400 uppercase tracking-widest font-bold">Strong points</p>
            {(data?.strong_points || []).map((p, i) => (
              <div key={i} className="flex items-center gap-2 p-3 glass-card rounded-xl border border-green-500/10">
                <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_6px_#4ADE80]"></div>
                <span className="text-[13px] text-white/70">{p.area}</span>
                <span className="text-[13px] text-white/70 heavy-blur ml-1">— {p.detail}</span>
                <span className="text-[12px] font-label text-green-400 ml-auto heavy-blur">{p.score}</span>
              </div>
            ))}
          </div>
          {/* Weak Points */}
          <div className="space-y-2">
            <p className="text-[11px] font-label text-red-400 uppercase tracking-widest font-bold">Weak points</p>
            {(data?.weak_points || []).map((p, i) => (
              <div key={i} className={`flex items-center gap-2 p-3 glass-card rounded-xl border border-red-500/10 ${i === 0 ? "" : "heavy-blur"} ${i > 1 ? "opacity-50" : ""}`}>
                <div className="w-2 h-2 rounded-full bg-red-400 shadow-[0_0_6px_#EF4444]"></div>
                {i === 0 ? (
                  <>
                    <span className="text-[13px] text-white/70">{p.area}</span>
                    <span className="text-[13px] text-white/70 heavy-blur ml-1">— {p.detail}</span>
                    <span className="text-[12px] font-label text-red-400 ml-auto heavy-blur">{p.score}</span>
                  </>
                ) : (
                  <>
                    <span className="text-[13px]">{p.area} — {p.detail}</span>
                    <span className="text-[12px] font-label ml-auto">{p.score}</span>
                  </>
                )}
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5" />

        {/* SECTION 6: GLOW-UP PLAN */}
        <section className="space-y-8 cursor-pointer tap-bounce" onClick={scrollToUnlock}>
          <h3 className="text-[14px] font-bold font-label uppercase tracking-widest text-white/60">📈 Glow-Up Plan</h3>
          <div className="flex items-center justify-around py-4">
            <div className="flex flex-col items-center gap-2">
              <div className="w-20 h-20 rounded-full border-2 border-white/10 flex items-center justify-center glass-card">
                <span className="text-lg font-bold font-label">{glowCurrent.split(".")[0]}.<span className="heavy-blur">{glowCurrent.split(".")[1]}</span></span>
              </div>
              <span className="text-[11px] opacity-40">Current</span>
            </div>
            <span className="material-symbols-outlined text-primary text-3xl">trending_flat</span>
            <div className="flex flex-col items-center gap-2">
              <div className="w-20 h-20 rounded-full border-2 border-primary/30 flex items-center justify-center bg-primary/5 shadow-[0_0_20px_rgba(124,77,255,0.1)]">
                <span className="text-lg font-bold font-label text-gradient">{glowPotential.split(".")[0]}.<span className="heavy-blur">{glowPotential.split(".")[1]}</span></span>
              </div>
              <span className="text-[11px] font-medium text-primary">Potential</span>
            </div>
          </div>
          <div className="space-y-3">
            {(data?.glowup?.steps || []).map((s, i) => (
              <div key={i} className="p-4 glass-card rounded-2xl border border-white/[0.02]">
                <div className="flex items-center justify-between">
                  <span className={`text-[14px] ${i === 0 ? "text-white" : "heavy-blur"}`}>{s.name}</span>
                  <span className="text-[13px] font-label font-bold text-green-400">+{s.gain}</span>
                </div>
                <p className={`text-[12px] text-white/40 mt-2 ${i === 0 ? "" : "heavy-blur"}`}>{s.tip}</p>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5" />

        {/* SECTION 7: BEST HAIRSTYLE */}
        <section className="space-y-6 cursor-pointer tap-bounce" onClick={scrollToUnlock}>
          <h3 className="text-[14px] font-bold font-label uppercase tracking-widest text-white/60">💇 Best Hairstyle</h3>
          <p className="text-[12px] text-white/40 -mt-2">These hairstyles fit you best based on our full analysis</p>
          <div className="space-y-3">
            {(data?.hairstyles || []).map((h, i) => {
              if (i === 2) return (
                <div key={i} className="p-5 glass-card rounded-2xl border border-primary/20 bg-primary/[0.02] shadow-[0_0_15px_rgba(124,77,255,0.05)]">
                  <div className="flex items-center gap-3">
                    <span className="text-[12px] font-bold font-label text-primary">#{h.rank}</span>
                    <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
                    <div>
                      <p className="text-[15px] font-semibold">{h.name}</p>
                      <p className="text-[11px] opacity-40">{h.note}</p>
                    </div>
                  </div>
                </div>
              );
              return (
                <div key={i} className="flex items-center gap-3 p-4 glass-card rounded-2xl opacity-40 heavy-blur">
                  <span className="text-[12px] font-bold font-label text-white/60">#{h.rank}</span>
                  <span className="text-[14px]">{h.name} — {h.note}</span>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* PREMIUM UNLOCK SECTION */}
      <div id="unlock-section" className="w-full max-w-[400px] mx-auto px-7 pt-8 pb-20">
        {/* Locked Insight Teasers */}
        <div className="space-y-3 mb-10">
          <div className="p-4 glass-card rounded-2xl border border-white/5 flex items-center justify-between cursor-pointer tap-bounce" onClick={scrollToUnlock}>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-[20px]">warning</span>
              <span className="text-[13px] font-medium heavy-blur">Your biggest facial limiter is ████████</span>
            </div>
            <span className="material-symbols-outlined text-white/20 text-[18px]">lock</span>
          </div>
          <div className="p-4 glass-card rounded-2xl border border-white/5 flex items-center justify-between cursor-pointer tap-bounce" onClick={scrollToUnlock}>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-[20px]">trending_up</span>
              <span className="text-[13px] font-medium heavy-blur">How to gain +{data?.glowup?.steps?.[0]?.gain || "0.4"} to +{data?.glowup?.steps?.[2]?.gain || "1.1"} on your score</span>
            </div>
            <span className="material-symbols-outlined text-white/20 text-[18px]">lock</span>
          </div>
          <div className="p-4 glass-card rounded-2xl border border-white/5 flex items-center justify-between cursor-pointer tap-bounce" onClick={scrollToUnlock}>
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
          <button className="btn-glow w-full h-14 bg-gradient-cta rounded-2xl font-bold text-[15px] flex flex-col items-center justify-center shadow-[0_8px_32px_rgba(124,77,255,0.3)] active:scale-95 transition-transform">
            <span>Get My Complete Analysis</span>
            <span className="text-[10px] opacity-70 font-normal">$4.95/week · Cancel anytime in 1 tap</span>
          </button>
          <button
            className="w-full h-12 rounded-2xl border border-white/10 font-medium text-[13px] text-white/60 hover:text-white transition-colors active:scale-95 transition-transform bg-white/5"
            onClick={async () => {
              if (!referralCode) return;
              const url = `https://primemog.com/?ref=${referralCode}`;
              const text = "I just got my face analyzed by AI. Try it:";
              if (navigator.share) {
                try { await navigator.share({ text, url }); setShared(true); } catch {}
              } else {
                navigator.clipboard.writeText(`${text} ${url}`);
                setShared(true);
              }
            }}
          >
            {shared ? `Link copied! (${referralCount}/3 friends joined)` : `Unlock free by inviting 3 friends`}
          </button>
          {referralCount > 0 && (
            <p className="text-[11px] text-center text-white/30">{referralCount}/3 friends completed their scan</p>
          )}
        </div>
      </div>
    </div>
  );
}
