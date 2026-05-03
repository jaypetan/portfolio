'use client';

import { useState, useEffect, useRef, type PropsWithChildren } from 'react';

type BackgroundGradientAnimationProps = PropsWithChildren<{
  className?: string;
  containerClassName?: string;
}>;

export default function BackgroundGradientAnimation({
  children,
  className = '',
  containerClassName = '',
}: BackgroundGradientAnimationProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [smoothPos, setSmoothPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize to center of screen
    setMousePos({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });
    setSmoothPos({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    let animationFrameId: number;

    const smoothFollow = () => {
      setSmoothPos((prev) => ({
        x: prev.x + (mousePos.x - prev.x) * 0.003,
        y: prev.y + (mousePos.y - prev.y) * 0.003,
      }));
      animationFrameId = requestAnimationFrame(smoothFollow);
    };

    animationFrameId = requestAnimationFrame(smoothFollow);
    return () => cancelAnimationFrame(animationFrameId);
  }, [mousePos]);

  return (
    <div
      ref={containerRef}
      className={`relative min-h-screen w-full overflow-hidden bg-black ${containerClassName}`.trim()}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-[25%] top-[25%] h-[32rem] w-[32rem] rounded-full bg-blue-500/20 blur-3xl animate-first" />
        <div className="absolute left-[40%] top-[20%] h-[28rem] w-[28rem] rounded-full bg-blue-500/20 blur-3xl animate-second" />
        <div className="absolute right-[25%] bottom-[25%] h-[30rem] w-[30rem] rounded-full bg-blue-500/20 blur-3xl animate-third" />

        {/* Mouse-following circle */}
        <div
          className="pointer-events-none fixed h-[24rem] w-[24rem] rounded-full bg-purple-500/10 blur-3xl"
          style={{
            left: `${smoothPos.x}px`,
            top: `${smoothPos.y}px`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>

      <div className={`relative z-10 h-full w-full ${className}`.trim()}>{children}</div>
    </div>
  );
}
