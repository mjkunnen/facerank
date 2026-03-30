"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUser, trackReferral, getUserByReferralCode } from "@/lib/supabase";

export default function EmailPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Enter a valid email");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const user = await createUser(email);
      if (!user) throw new Error("Failed to create user");

      // Store user data locally
      sessionStorage.setItem("primemog_user", JSON.stringify(user));

      // Check if this user came via a referral link
      const refCode = localStorage.getItem("primemog_ref");
      if (refCode) {
        const referrer = await getUserByReferralCode(refCode);
        if (referrer && referrer.id !== user.id) {
          await trackReferral(referrer.id, user.id);
        }
        localStorage.removeItem("primemog_ref");
      }

      router.push("/results");
    } catch (err) {
      setError("Something went wrong. Try again.");
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#08080C] text-white font-body min-h-dvh flex flex-col items-center justify-center px-7">
      <div className="max-w-[400px] w-full flex flex-col items-center">
        {/* Icon */}
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
          <span className="material-symbols-outlined text-primary text-3xl">verified</span>
        </div>

        {/* Headline */}
        <h1 className="text-[24px] font-bold tracking-tight text-center mb-2">Your scan is ready</h1>
        <p className="text-[14px] text-white/40 text-center mb-8">Enter your email to see your full analysis</p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-14 px-5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/25 text-[15px] font-medium outline-none focus:border-primary/50 transition-colors"
          />
          {error && <p className="text-red-400 text-[12px] text-center">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="btn-glow w-full h-14 bg-gradient-to-r from-[#7C4DFF] to-[#448AFF] rounded-2xl font-bold text-[15px] text-white active:scale-95 transition-all disabled:opacity-50"
          >
            {loading ? "Loading..." : "See my results"}
          </button>
        </form>

        {/* Trust */}
        <div className="flex items-center gap-4 mt-6">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[14px] text-white/30">lock</span>
            <span className="text-[11px] text-white/30">Private</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[14px] text-white/30">block</span>
            <span className="text-[11px] text-white/30">No spam</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[14px] text-white/30">delete</span>
            <span className="text-[11px] text-white/30">Delete anytime</span>
          </div>
        </div>
      </div>
    </div>
  );
}
