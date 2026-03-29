"use client";

function getMatchColor(match: number): string {
  if (match >= 90) return "#7C4DFF";
  if (match >= 80) return "#448AFF";
  return "#FF6B6B";
}

interface Props {
  data: {
    face_shape: string;
    recommendations: { name: string; match: number }[];
  };
  locked: boolean;
}

export default function HairstyleRecs({ data, locked }: Props) {
  return (
    <div className="bg-[#1A1A1A] rounded-3xl border border-white/[0.06] p-8">
      <h3 className="font-score text-xl mb-8 text-center">Hairstyle Recs</h3>

      <div className="space-y-2">
        {data.recommendations.map((rec, i) => (
          <div
            key={rec.name}
            className="flex items-center gap-3 bg-white/[0.03] rounded-2xl p-4"
          >
            <span className="font-data text-xs text-white/20 w-5">#{i + 1}</span>
            <span className="text-sm flex-1">{rec.name}</span>
            <span
              className="font-data text-sm font-bold"
              style={{ color: getMatchColor(rec.match) }}
            >
              {rec.match}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
