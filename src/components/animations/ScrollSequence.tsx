"use client";
import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useSpring } from "framer-motion";

interface ScrollSequenceProps {
  frameCount: number;
  imagePrefix: string;
  imageExtension?: string;
}

export default function ScrollSequence({
  frameCount = 240,
  imagePrefix = "/images/pizza-transition/ezgif-frame-",
  imageExtension = ".jpg",
}: ScrollSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);

  // Track absolute window scroll to control the animation without breaking flex layout
  const { scrollY } = useScroll();

  // Map the first 1000 pixels of scrolling to 0 -> 1 progress
  const rawProgress = useTransform(scrollY, [0, 1000], [0, 1]);

  // Create a smoother, non-jittery spring attached to scroll progress
  const smoothProgress = useSpring(rawProgress, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.001,
  });

  // Preload all frames to ensure zero network stutter during scroll
  useEffect(() => {
    let isMounted = true;
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const frameString = i.toString().padStart(3, "0");
      img.src = `${imagePrefix}${frameString}${imageExtension}`;

      img.onload = () => {
        if (!isMounted) return;
        loadedCount++;
        setImagesLoaded(loadedCount);
      };

      loadedImages.push(img);
    }

    setImages(loadedImages);

    return () => {
      isMounted = false;
    };
  }, [frameCount, imagePrefix, imageExtension]);

  // Paint onto the canvas directly as the smooth spring updates
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    if (images.length > 0 && imagesLoaded > 0) {
      const firstImage = images[0];
      if (firstImage && firstImage.naturalWidth > 0) {
        canvas.width = firstImage.naturalWidth;
        canvas.height = firstImage.naturalHeight;

        const renderFrame = (latest: number) => {
          const frameIndex = Math.min(
            frameCount - 1,
            Math.max(0, Math.floor(latest * frameCount)),
          );

          setCurrentFrameIndex(frameIndex);

          const currentImage = images[frameIndex];
          if (
            currentImage &&
            currentImage.complete &&
            currentImage.naturalWidth > 0
          ) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.imageSmoothingEnabled = true;
            context.imageSmoothingQuality = "high";
            context.drawImage(currentImage, 0, 0, canvas.width, canvas.height);
          }
        };

        const unsubscribe = smoothProgress.on("change", renderFrame);
        renderFrame(smoothProgress.get());

        return () => unsubscribe();
      }
    }
  }, [images, imagesLoaded, smoothProgress, frameCount]);

  const progressPercent = Math.round((imagesLoaded / frameCount) * 100);
  const isLoading = imagesLoaded < frameCount;

  // Detect theme
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.getAttribute("data-theme") === "dark");
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  // Frame 1 = white bg, frames ~30+ = dark bg
  // In light mode: use 'lighten' which keeps the brighter pixel at each position.
  // Since page bg is white (#fff), dark frame backgrounds become white (invisible).
  // The pizza itself stays visible because its bright colors are kept.
  // In dark mode: use 'lighten' too since dark page bg absorbs dark frame bg naturally.
  const blendMode = "lighten";

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center overflow-visible"
      style={{
        pointerEvents: "none",
      }}
    >
      {isLoading && (
        <div className="absolute z-10 font-bold text-sm tracking-[0.3em] opacity-40 uppercase text-center w-full">
          Loading Cinematic Sequence
          <br />
          {progressPercent}%
        </div>
      )}

      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain"
        style={{
          opacity: 1,
          transition: "opacity 1s ease",
          transform: "scale(1.4)",
          willChange: "transform, opacity",
          mixBlendMode: blendMode as React.CSSProperties["mixBlendMode"],
          maskImage:
            "radial-gradient(ellipse 48% 52% at center, black 25%, rgba(0,0,0,0.3) 40%, transparent 55%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 48% 52% at center, black 25%, rgba(0,0,0,0.3) 40%, transparent 55%)",
        }}
      />

      {/* Subtle warm glow behind the pizza */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] rounded-full blur-[120px] opacity-15 pointer-events-none -z-10"
        style={{ background: "var(--primary)" }}
      />
    </div>
  );
}
