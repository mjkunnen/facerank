"use client";

import { useEffect, useRef, useState } from "react";
import { detectFace, FaceBox } from "@/lib/face-detect";

interface Props {
  imageUrl: string;
  size?: number; // container size in px
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

      {/* Green tint overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#4ADE80]/10 to-transparent mix-blend-overlay" />

      {/* Face-tracked honeycomb overlay */}
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
          {/* Honeycomb pattern scanning diagonally */}
          <div
            className="absolute pointer-events-none"
            style={{
              width: "200%",
              height: "200%",
              top: "-50%",
              left: "-50%",
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%234ADE80' fill-opacity='0.25'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              animation: "honeycomb-face-scan 2.5s linear infinite",
            }}
          />

          {/* Scan line across face */}
          <div
            className="absolute left-0 w-full h-[2px] pointer-events-none"
            style={{
              background: "linear-gradient(90deg, transparent 0%, #4ADE80 30%, #4ADE80 70%, transparent 100%)",
              boxShadow: "0 0 12px rgba(74, 222, 128, 0.6), 0 0 30px rgba(74, 222, 128, 0.2)",
              animation: "face-scan-line 2s ease-in-out infinite",
            }}
          />

          {/* Face boundary glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              borderRadius: "40%",
              border: "1px solid rgba(74, 222, 128, 0.2)",
              boxShadow: "inset 0 0 20px rgba(74, 222, 128, 0.05), 0 0 15px rgba(74, 222, 128, 0.1)",
            }}
          />
        </div>
      )}

      {/* Corner brackets */}
      <div className="absolute inset-0 border-2 border-[#4ADE80]/20 rounded-2xl pointer-events-none" />
      <div className="absolute top-1 left-1 w-3 h-3 border-t border-l border-[#4ADE80]/50" />
      <div className="absolute top-1 right-1 w-3 h-3 border-t border-r border-[#4ADE80]/50" />
      <div className="absolute bottom-1 left-1 w-3 h-3 border-b border-l border-[#4ADE80]/50" />
      <div className="absolute bottom-1 right-1 w-3 h-3 border-b border-r border-[#4ADE80]/50" />
    </div>
  );
}
