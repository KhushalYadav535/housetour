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
  const [isReady, setIsReady] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef<number>(0);
  const currentFrameRef = useRef<number>(1);
  const preloadedImagesRef = useRef<Record<number, HTMLImageElement>>({});

  // Preload frames
  const preloadFrames = useCallback((frameNum: number) => {
    const framesToPreload = [frameNum, (frameNum % TOTAL_FRAMES) + 1, ((frameNum + 1) % TOTAL_FRAMES) + 1];
    
    framesToPreload.forEach((frame) => {
      if (!preloadedImagesRef.current[frame]) {
        const img = new Image();
        img.src = frameUrlCache[frame];
        preloadedImagesRef.current[frame] = img;
      }
    });
  }, []);

  // Preload initial frames
  useEffect(() => {
    let loadedCount = 0;
    let totalToLoad = Math.min(30, TOTAL_FRAMES);

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
        preloadedImagesRef.current[i] = img;
      }
      
      // also start loading the rest in background silently
      for (let i = totalToLoad + 1; i <= TOTAL_FRAMES; i++) {
        if (!preloadedImagesRef.current[i]) {
          const img = new Image();
          img.src = frameUrlCache[i];
          preloadedImagesRef.current[i] = img;
        }
      }
    };

    preloadInitial();
  }, []);

  // Handle canvas resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const parent = canvasRef.current.parentElement;
        if (parent) {
          canvasRef.current.width = parent.clientWidth;
          canvasRef.current.height = parent.clientHeight;
        }
      }
    };
    
    window.addEventListener('resize', handleResize);
    // Add a slight delay for initial resize to ensure parent has dimensions
    setTimeout(handleResize, 100);
    
    return () => window.removeEventListener('resize', handleResize);
  }, [isReady]);

  // Animation Loop
  useEffect(() => {
    const drawFrame = (frameIndex: number) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (!canvas || !ctx) return;
      
      const img = preloadedImagesRef.current[frameIndex];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Calculate object-cover dimensions
      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.width / img.height;
      
      let renderWidth = canvas.width;
      let renderHeight = canvas.height;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasRatio > imgRatio) {
        renderHeight = canvas.width / imgRatio;
        offsetY = (canvas.height - renderHeight) / 2;
      } else {
        renderWidth = canvas.height * imgRatio;
        offsetX = (canvas.width - renderWidth) / 2;
      }

      ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
    };

    const animate = (timestamp: number) => {
      if (!lastFrameTimeRef.current) {
        lastFrameTimeRef.current = timestamp;
      }
      
      const elapsed = timestamp - lastFrameTimeRef.current;
      const frameDuration = 1000 / FPS;

      if (elapsed >= frameDuration) {
        currentFrameRef.current = (currentFrameRef.current % TOTAL_FRAMES) + 1;
        preloadFrames(currentFrameRef.current);
        
        drawFrame(currentFrameRef.current);
        
        lastFrameTimeRef.current = timestamp - (elapsed % frameDuration);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    if (isReady) {
      drawFrame(currentFrameRef.current);
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isReady, preloadFrames]);

  return (
    <div className="w-full h-full relative bg-black overflow-hidden">
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
          <div className="text-white text-sm">Loading animation...</div>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
      />
    </div>
  );
}
