"use client";

import { useEffect, useRef, useState } from "react";
import { detectFace, FaceBox } from "@/lib/face-detect";

interface Props {
  imageUrl: string;
  size?: number;
  className?: string;
}

export default function FaceScanOverlay({ imageUrl, size = 120, className = "" }: Props) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [faceBox, setFaceBox] = useState<FaceBox | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!imgRef.current || !loaded) return;
    detectFace(imgRef.current).then(setFaceBox);
  }, [loaded, imageUrl]);

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ width: size, height: size }}>
      {/* Base image */}
      <img
        ref={imgRef}
        src={imageUrl}
        alt="Your scan"
        className="w-full h-full object-cover"
        crossOrigin="anonymous"
        onLoad={() => setLoaded(true)}
      />

      {/* Subtle purple tint */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#7C4DFF]/8 to-transparent mix-blend-overlay" />

      {/* Face-tracked scan overlay */}
      {faceBox && (
        <div
          className="absolute overflow-hidden pointer-events-none"
          style={{
            left: `${faceBox.x}%`,
            top: `${faceBox.y}%`,
            width: `${faceBox.width}%`,
            height: `${faceBox.height}%`,
            borderRadius: "40%",
          }}
        >
          {/* Scan line across face — brand purple */}
          <div
            className="absolute left-0 w-full h-[2px] pointer-events-none z-10"
            style={{
              background: "linear-gradient(90deg, transparent 0%, #7C4DFF 20%, #448AFF 50%, #7C4DFF 80%, transparent 100%)",
              boxShadow: "0 0 15px rgba(124, 77, 255, 0.6), 0 0 40px rgba(124, 77, 255, 0.2)",
              animation: "face-scan-line 2.5s ease-in-out infinite",
            }}
          />

          {/* Soft face boundary glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              borderRadius: "40%",
              boxShadow: "inset 0 0 30px rgba(124, 77, 255, 0.08), 0 0 20px rgba(124, 77, 255, 0.1)",
            }}
          />
        </div>
      )}

      {/* Corner brackets — brand purple */}
      <div className="absolute top-1 left-1 w-4 h-4 border-t-2 border-l-2 border-[#7C4DFF]/40 rounded-tl-sm" />
      <div className="absolute top-1 right-1 w-4 h-4 border-t-2 border-r-2 border-[#7C4DFF]/40 rounded-tr-sm" />
      <div className="absolute bottom-1 left-1 w-4 h-4 border-b-2 border-l-2 border-[#7C4DFF]/40 rounded-bl-sm" />
      <div className="absolute bottom-1 right-1 w-4 h-4 border-b-2 border-r-2 border-[#7C4DFF]/40 rounded-br-sm" />

      {/* Subtle ambient glow around edges */}
      <div className="absolute inset-0 pointer-events-none rounded-2xl" style={{ boxShadow: "inset 0 0 40px rgba(124, 77, 255, 0.06)" }} />
    </div>
  );
}
