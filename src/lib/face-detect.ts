export interface FaceBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export async function detectFace(imgElement: HTMLImageElement): Promise<FaceBox | null> {
  // Use browser's built-in FaceDetector API (Chrome/Edge)
  if ("FaceDetector" in window) {
    try {
      // @ts-expect-error - FaceDetector not in TS types yet
      const detector = new window.FaceDetector({ fastMode: true, maxDetectedFaces: 1 });
      const faces = await detector.detect(imgElement);
      if (faces.length > 0) {
        const box = faces[0].boundingBox;
        // Convert to percentages relative to image dimensions
        const imgW = imgElement.naturalWidth || imgElement.width;
        const imgH = imgElement.naturalHeight || imgElement.height;
        return {
          x: (box.x / imgW) * 100,
          y: (box.y / imgH) * 100,
          width: (box.width / imgW) * 100,
          height: (box.height / imgH) * 100,
        };
      }
    } catch {}
  }

  // Fallback: assume face is centered (typical for selfies)
  return { x: 15, y: 10, width: 70, height: 75 };
}
