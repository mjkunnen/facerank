"use client";

interface Props {
  data: {
    strong_zones: string[];
    problem_zones: string[];
    zone_scores: Record<string, number>;
  };
  locked: boolean;
}

export default function HeatMapPreview({ data, locked }: Props) {
  return (
    <div className="bg-[#1A1A1A] rounded-3xl border border-white/[0.06] p-8">
      <h3 className="font-score text-xl mb-8 text-center">Face Heat Map</h3>

      {locked ? (
        <>
          {/* Blurred preview */}
          <div className="relative w-full h-52 rounded-2xl bg-white/[0.03] overflow-hidden mb-8">
            <div className="absolute inset-0 opacity-25">
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-24 h-28 rounded-full bg-gradient-to-b from-[#7C4DFF] via-[#448AFF] to-[#FF6B6B] blur-xl" />
              <div className="absolute top-16 left-1/4 w-14 h-14 rounded-full bg-[#FF6B6B] blur-lg" />
              <div className="absolute top-8 right-1/4 w-16 h-12 rounded-full bg-[#7C4DFF] blur-lg" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-8 h-8 text-white/15" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-4">
            <div className="flex-1 rounded-2xl p-5 text-center bg-[#7C4DFF]/[0.05]">
              <p className="font-score text-3xl text-[#7C4DFF]">{data.strong_zones.length}</p>
              <p className="text-xs text-white/30 mt-1">Strong</p>
            </div>
            <div className="flex-1 rounded-2xl p-5 text-center bg-[#FF6B6B]/[0.05]">
              <p className="font-score text-3xl text-[#FF6B6B]">{data.problem_zones.length}</p>
              <p className="text-xs text-white/30 mt-1">To Improve</p>
            </div>
          </div>
        </>
      ) : (
        <div className="w-full h-64 rounded-2xl bg-white/[0.03] flex items-center justify-center">
          <p className="text-white/30 text-sm">Full heat map</p>
        </div>
      )}
    </div>
  );
}
