"use client";

interface BlurOverlayProps {
  children: React.ReactNode;
  locked?: boolean;
}

export default function BlurOverlay({ children, locked = true }: BlurOverlayProps) {
  if (!locked) return <>{children}</>;

  return (
    <div className="relative">
      <div className="blur-paywall rounded-xl pointer-events-none select-none">
        {children}
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex items-center gap-2 bg-[#1A1A1A]/80 px-4 py-2 rounded-full border border-white/[0.06] shadow-sm">
          <svg className="w-4 h-4 text-[#7C4DFF]" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <span className="text-xs text-[#7C4DFF] font-medium">PRO</span>
        </div>
      </div>
    </div>
  );
}
