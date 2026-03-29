"use client";

import BlurOverlay from "@/components/BlurOverlay";

const DIFFICULTY_COLORS: Record<string, string> = {
  Easy: "#7C4DFF",
  Medium: "#448AFF",
  Hard: "#FF6B6B",
};

interface Props {
  data: {
    current: number;
    potential: number;
    categories: { name: string; priority: number; difficulty: string; advice: string }[];
  };
  locked: boolean;
}

export default function GlowUpPlan({ data, locked }: Props) {
  return (
    <div className="bg-[#1A1A1A] rounded-3xl border border-white/[0.06] p-8">
      <h3 className="font-score text-xl mb-8 text-center">Glow-Up Plan</h3>

      {/* Score potential */}
      <div className="flex items-center justify-center gap-8 mb-10">
        <div className="text-center">
          <p className="font-score text-4xl text-white/40">
            {data.current.toFixed(1)}
          </p>
          <p className="text-xs text-white/30 mt-1">Now</p>
        </div>
        <div className="text-[#7C4DFF] text-2xl">→</div>
        <div className="text-center">
          <p className="font-score text-4xl text-[#7C4DFF]">
            {data.potential.toFixed(1)}
          </p>
          <p className="text-xs text-[#7C4DFF] mt-1">Potential</p>
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-3">
        {data.categories.map((cat) => (
          <div key={cat.name} className="bg-white/[0.03] rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium">{cat.name}</span>
              <span
                className="text-xs px-2.5 py-1 rounded-full font-medium"
                style={{
                  color: DIFFICULTY_COLORS[cat.difficulty],
                  backgroundColor: `${DIFFICULTY_COLORS[cat.difficulty]}10`,
                }}
              >
                {cat.difficulty}
              </span>
            </div>
            <BlurOverlay locked={locked}>
              <p className="text-sm text-white/40 leading-relaxed">{cat.advice}</p>
            </BlurOverlay>
          </div>
        ))}
      </div>
    </div>
  );
}
