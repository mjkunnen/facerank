"use client";

import { useEffect, useState } from "react";
import BlurOverlay from "@/components/BlurOverlay";

const SCORE_COLORS: Record<string, string> = {
  green: "#7C4DFF",
  yellow: "#448AFF",
  red: "#FF6B6B",
};

interface Props {
  data: {
    overall: number;
    metrics: Record<string, { score: number; color: string; trend: string }>;
    percentile: string;
    tier: string;
  };
  locked: boolean;
}

export default function ScoreCard({ data, locked }: Props) {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    const target = Math.floor(data.overall);
    const duration = 2000;
    const start = performance.now();

    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayScore(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [data.overall]);

  return (
    <div className="bg-[#1A1A1A] rounded-3xl border border-white/[0.06] p-8">
      {/* Score */}
      <div className="text-center mb-10">
        <div className="flex items-baseline justify-center gap-1">
          <span className="font-score text-8xl">{displayScore}</span>
          <span className="text-white/15 text-xl ml-1">/10</span>
        </div>
      </div>

      {/* Metrics */}
      <div className="space-y-5">
        {Object.entries(data.metrics).map(([key, metric]) => (
          <div key={key} className="flex items-center gap-4">
            <span className="text-sm text-white/35 w-24 capitalize">{key}</span>
            <div className="flex-1 h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full score-bar-fill"
                style={{
                  width: `${metric.score * 10}%`,
                  backgroundColor: SCORE_COLORS[metric.color] || "#448AFF",
                }}
              />
            </div>
            {locked ? (
              <span className="font-data text-sm text-white/10 w-10 text-right">--</span>
            ) : (
              <span className="font-data text-sm w-10 text-right" style={{ color: SCORE_COLORS[metric.color] }}>
                {metric.score.toFixed(1)}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Percentile */}
      <BlurOverlay locked={locked}>
        <div className="mt-8 pt-6 border-t border-white/[0.04] text-center">
          <p className="text-sm text-white/40">{data.percentile}</p>
        </div>
      </BlurOverlay>
    </div>
  );
}
