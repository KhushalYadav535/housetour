
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

const TOTAL_FRAMES = 240;
const FPS = 30;

// Pre-cache all frame URLs
const frameUrlCache: Record<number, string> = {};
for (let i = 1; i <= TOTAL_FRAMES; i++) {
  const frameNumber = String(i).padStart(3, '0');
  frameUrlCache[i] = `/frames/ezgif-frame-${frameNumber}.png`;
}

export default function FrameAnimation() {
  const [currentFrame, setCurrentFrame] = useState(1);
  const [isReady, setIsReady] = useState(false);
  const animationRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef<number>(0);
  const imgRef = useRef<HTMLImageElement>(null);
  const preloadedFramesRef = useRef<Set<number>>(new Set());

  // Preload frames in batches
  const preloadFrames = useCallback((frameNum: number) => {
    const framesToPreload = [frameNum, (frameNum % TOTAL_FRAMES) + 1, ((frameNum + 1) % TOTAL_FRAMES) + 1];
    
    framesToPreload.forEach((frame) => {
      if (!preloadedFramesRef.current.has(frame)) {
        const img = new Image();
        img.src = frameUrlCache[frame];
        preloadedFramesRef.current.add(frame);
      }
    });
  }, []);

  // Preload all frames on component mount
  useEffect(() => {
    let loadedCount = 0;
    let totalToLoad = Math.min(30, TOTAL_FRAMES); // Preload first 30 frames

    const preloadInitial = () => {
      for (let i = 1; i <= totalToLoad; i++) {
        const img = new Image();
        img.onload = () => {
          loadedCount++;
          if (loadedCount === totalToLoad) {
            setIsReady(true);
          }
        };
        img.src = frameUrlCache[i];
        preloadedFramesRef.current.add(i);
      }
    };

    preloadInitial();
  }, []);

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!lastFrameTimeRef.current) {
        lastFrameTimeRef.current = timestamp;
      }
      
      const elapsed = timestamp - lastFrameTimeRef.current;
      const frameDuration = 1000 / FPS;

      if (elapsed >= frameDuration) {
        setCurrentFrame((prev) => {
          const next = (prev % TOTAL_FRAMES) + 1;
          preloadFrames(next);
          return next;
        });
        lastFrameTimeRef.current = timestamp - (elapsed % frameDuration);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    if (isReady) {
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isReady, preloadFrames]);

  const imageUrl = frameUrlCache[currentFrame];

  return (
    <div className="w-full h-full relative bg-black">
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
          <div className="text-white text-sm">Loading animation...</div>
        </div>
      )}
      <img
        ref={imgRef}
        src={imageUrl}
        alt={`Frame ${currentFrame}`}
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
        decoding="async"
      />
    </div>
  );
}
