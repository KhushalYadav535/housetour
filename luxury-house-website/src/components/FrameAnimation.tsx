
'use client';

import { useState, useEffect, useRef } from 'react';

const TOTAL_FRAMES = 240;

export default function FrameAnimation() {
  const [currentFrame, setCurrentFrame] = useState(1);
  const animationRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef<number>(0);
  const FPS = 30;

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!lastFrameTimeRef.current) {
        lastFrameTimeRef.current = timestamp;
      }
      
      const elapsed = timestamp - lastFrameTimeRef.current;
      const frameDuration = 1000 / FPS;

      if (elapsed >= frameDuration) {
        setCurrentFrame((prev) => (prev % TOTAL_FRAMES) + 1);
        lastFrameTimeRef.current = timestamp - (elapsed % frameDuration);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const frameNumber = String(currentFrame).padStart(3, '0');
  const imageUrl = `/frames/ezgif-frame-${frameNumber}.png`;

  return (
    <div className="w-full h-full relative">
      <img
        src={imageUrl}
        alt={`Frame ${currentFrame}`}
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  );
}
