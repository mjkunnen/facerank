"use client";

import BlurOverlay from "@/components/BlurOverlay";

const FLAG_EMOJI: Record<string, string> = {
  IT: "\u{1F1EE}\u{1F1F9}", GR: "\u{1F1EC}\u{1F1F7}", ES: "\u{1F1EA}\u{1F1F8}",
  TR: "\u{1F1F9}\u{1F1F7}", PT: "\u{1F1F5}\u{1F1F9}", FR: "\u{1F1EB}\u{1F1F7}",
  DE: "\u{1F1E9}\u{1F1EA}", GB: "\u{1F1EC}\u{1F1E7}", NL: "\u{1F1F3}\u{1F1F1}",
  BR: "\u{1F1E7}\u{1F1F7}", JP: "\u{1F1EF}\u{1F1F5}", KR: "\u{1F1F0}\u{1F1F7}",
};

interface Props {
  data: {
    guesses: { nationality: string; percentage: number; flag: string }[];
  };
  locked: boolean;
}

export default function NationalityCard({ data, locked }: Props) {
  const visibleIndex = 1;

  return (
    <div className="bg-[#1A1A1A] rounded-3xl border border-white/[0.06] p-8">
      <h3 className="font-score text-xl mb-8 text-center">Nationality Match</h3>

      <div className="space-y-2">
        {data.guesses.map((guess, i) => {
          const isVisible = i === visibleIndex;
          const flag = FLAG_EMOJI[guess.flag] || guess.flag;

          if (isVisible) {
            return (
              <div
                key={guess.nationality}
                className="flex items-center gap-3 bg-[#448AFF]/[0.05] rounded-2xl p-4"
              >
                <span className="font-data text-xs text-[#448AFF] w-5">#{i + 1}</span>
                <span className="text-xl">{flag}</span>
                <span className="text-sm flex-1">{guess.nationality}</span>
                <span className="font-data text-sm text-[#448AFF]">{guess.percentage}%</span>
              </div>
            );
          }

          return (
            <BlurOverlay key={guess.nationality} locked={locked}>
              <div className="flex items-center gap-3 bg-white/[0.03] rounded-2xl p-4">
                <span className="font-data text-xs text-white/20 w-5">#{i + 1}</span>
                <span className="text-xl">{flag}</span>
                <span className="text-sm flex-1">{guess.nationality}</span>
                <span className="font-data text-sm">{guess.percentage}%</span>
              </div>
            </BlurOverlay>
          );
        })}
      </div>
    </div>
  );
}
