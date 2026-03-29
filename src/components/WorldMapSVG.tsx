"use client";

// Recognizable continent outlines for equirectangular projection (viewBox 0 0 1000 500)
const CONTINENTS = {
  northAmerica: "M45,70 C65,55 110,50 140,55 C180,48 220,45 250,52 C270,58 280,68 285,80 C288,95 282,115 272,135 C260,155 248,170 235,185 C222,198 208,208 195,205 C178,200 165,188 155,172 C142,155 128,140 112,128 C95,118 78,108 65,100 C52,92 45,82 45,70Z",
  greenland: "M310,18 C325,12 345,15 355,28 C360,42 355,58 345,65 C332,70 318,62 310,48 C305,35 305,25 310,18Z",
  southAmerica: "M215,215 C228,208 245,210 255,218 C268,228 278,245 282,265 C285,288 282,312 275,335 C268,355 258,372 245,382 C232,390 218,388 208,378 C198,365 192,348 188,328 C185,305 186,282 190,260 C195,242 204,225 215,215Z",
  europe: "M445,52 C455,45 470,42 485,45 C498,42 512,40 525,45 C535,42 545,45 550,55 C548,65 540,72 530,78 C520,85 508,88 495,85 C482,88 470,82 460,75 C452,68 448,60 445,52Z",
  africa: "M450,98 C465,92 482,90 498,95 C512,100 525,110 535,125 C542,140 548,158 550,178 C550,200 545,222 538,242 C528,260 516,275 502,282 C488,288 472,285 460,275 C448,262 440,245 435,225 C430,205 428,182 430,160 C432,138 438,118 450,98Z",
  asia: "M540,38 C560,30 588,25 618,22 C648,20 678,22 708,28 C735,35 758,45 775,58 C788,70 795,85 795,100 C792,115 782,128 768,135 C752,142 732,138 715,130 C698,125 680,128 662,135 C648,140 635,145 622,148 C610,150 598,148 588,140 C578,132 568,120 560,108 C552,95 546,80 542,65 C540,52 540,42 540,38Z",
  india: "M618,148 C628,145 640,148 648,158 C655,170 658,185 654,200 C650,212 640,222 628,225 C618,225 608,218 602,205 C598,192 598,178 602,165 C606,155 612,150 618,148Z",
  seAsia: "M715,132 C728,128 742,132 752,142 C758,152 760,165 755,178 C748,188 738,192 728,188 C718,182 712,172 710,160 C708,148 710,138 715,132Z",
  japan: "M810,52 C815,48 822,50 825,58 C828,68 825,78 820,82 C815,85 810,80 808,72 C806,62 808,55 810,52Z",
  australia: "M762,268 C778,260 800,258 818,265 C832,272 842,285 845,300 C846,315 840,328 828,338 C815,345 798,348 782,342 C768,336 758,325 752,312 C748,298 750,282 762,268Z",
  newZealand: "M860,325 C864,320 870,322 872,328 C872,335 868,340 864,338 C860,335 858,330 860,325Z",
};

// Green hotspot dots — countries where you might score high
const HOTSPOTS: { x: number; y: number; label: string }[] = [
  { x: 180, y: 120, label: "US" },
  { x: 245, y: 270, label: "BR" },
  { x: 480, y: 65, label: "IT" },
  { x: 520, y: 68, label: "GR" },
  { x: 540, y: 58, label: "TR" },
  { x: 460, y: 72, label: "ES" },
  { x: 240, y: 225, label: "CO" },
  { x: 200, y: 175, label: "MX" },
  { x: 810, y: 65, label: "JP" },
  { x: 790, y: 60, label: "KR" },
];

export default function WorldMapSVG({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1000 500"
      className={`w-full ${className}`}
      fill="none"
    >
      {/* Continent shapes */}
      {Object.values(CONTINENTS).map((d, i) => (
        <path
          key={i}
          d={d}
          fill="rgba(0,0,0,0.04)"
          stroke="rgba(0,0,0,0.08)"
          strokeWidth="1"
        />
      ))}

      {/* Hotspot dots with pulse */}
      {HOTSPOTS.map((dot, i) => (
        <g key={dot.label}>
          {/* Pulse ring */}
          <circle cx={dot.x} cy={dot.y} r="8" fill="none" stroke="#7C4DFF" strokeWidth="1" opacity="0.2">
            <animate attributeName="r" values="5;14;5" dur={`${2.5 + i * 0.2}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0;0.3" dur={`${2.5 + i * 0.2}s`} repeatCount="indefinite" />
          </circle>
          {/* Glow */}
          <circle cx={dot.x} cy={dot.y} r="6" fill="#7C4DFF" opacity="0.12" />
          {/* Dot */}
          <circle cx={dot.x} cy={dot.y} r="3" fill="#7C4DFF" opacity="0.8" />
        </g>
      ))}
    </svg>
  );
}
