"use client";

import BlurOverlay from "@/components/BlurOverlay";

const FLAG_EMOJI: Record<string, string> = {
  BR: "\u{1F1E7}\u{1F1F7}", CO: "\u{1F1E8}\u{1F1F4}", IT: "\u{1F1EE}\u{1F1F9}",
  ES: "\u{1F1EA}\u{1F1F8}", MX: "\u{1F1F2}\u{1F1FD}", TR: "\u{1F1F9}\u{1F1F7}",
  GR: "\u{1F1EC}\u{1F1F7}", US: "\u{1F1FA}\u{1F1F8}", KR: "\u{1F1F0}\u{1F1F7}",
  JP: "\u{1F1EF}\u{1F1F5}", FR: "\u{1F1EB}\u{1F1F7}", DE: "\u{1F1E9}\u{1F1EA}",
  GB: "\u{1F1EC}\u{1F1E7}", AU: "\u{1F1E6}\u{1F1FA}", PT: "\u{1F1F5}\u{1F1F9}",
  NL: "\u{1F1F3}\u{1F1F1}", SE: "\u{1F1F8}\u{1F1EA}", NO: "\u{1F1F3}\u{1F1F4}",
};

function getScoreColor(score: number): string {
  if (score >= 8) return "#7C4DFF";
  if (score >= 6.5) return "#448AFF";
  return "#FF6B6B";
}

interface Props {
  data: {
    rankings: { rank: number; country: string; name: string; score: number; reason: string }[];
  };
  locked: boolean;
}

export default function WorldMap({ data, locked }: Props) {
  const rankings = data.rankings;

  return (
    <div className="bg-[#1A1A1A] rounded-3xl border border-white/[0.06] p-8">
      <h3 className="font-score text-xl mb-8 text-center">Country Rankings</h3>

      <div className="space-y-2">
        {rankings.map((r) => {
          const isVisible = r.rank === 3;

          if (isVisible) {
            return (
              <div
                key={r.country}
                className="flex items-center gap-3 bg-[#7C4DFF]/[0.05] rounded-2xl p-4"
              >
                <span className="font-data text-xs text-[#7C4DFF] w-6">#{r.rank}</span>
                <span className="text-lg">{FLAG_EMOJI[r.country]}</span>
                <span className="text-sm flex-1">{r.name}</span>
                <span className="font-data text-sm font-bold" style={{ color: getScoreColor(r.score) }}>
                  {r.score.toFixed(1)}
                </span>
              </div>
            );
          }

          return (
            <BlurOverlay key={r.country} locked={locked}>
              <div className="flex items-center gap-3 bg-white/[0.03] rounded-2xl p-4">
                <span className="font-data text-xs text-white/20 w-6">#{r.rank}</span>
                <span className="text-lg">{FLAG_EMOJI[r.country]}</span>
                <span className="text-sm flex-1">{r.name}</span>
                <span className="font-data text-sm">{r.score.toFixed(1)}</span>
              </div>
            </BlurOverlay>
          );
        })}
      </div>
    </div>
  );
}
