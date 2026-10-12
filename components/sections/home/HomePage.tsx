import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import Hero from '@/images/hero/heroPic.jpg';
import Light from './components/Light';
import TiltedCard from '@/components/ui/TiltedCard';

export default function HomePage() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = !mounted ? true : resolvedTheme === 'dark';

  return (
    <div className="absolute inset-0 z-50 flex h-dvh w-full flex-col items-center home-layout px-6 pt-4 text-center">
      <div
        className={`flex min-h-0 flex-1 items-center justify-center ${
          isDark ? 'text-white' : 'text-black'
        }`}
      >
        <div className="flex flex-col sm:grid sm:grid-cols-[1fr_auto_1fr] gap-4 items-center">
          <div className="h-20 sm:h-32 sm:self-auto">
            <Light />
          </div>
          <TiltedCard
            image={Hero}
            altText="Profile Image"
            imageSize="home-portrait aspect-square"
            rotateAmplitude={12}
            scaleOnHover={1.05}
            showMobileWarning={false}
            displayOverlayContent
            overlayContent={
              <p className="glassmorphism-darkbg home-introduction">Hi, I'm Jun Peng</p>
            }
          />
          <div className="home-tagline text-start self-end hidden sm:block">
            <p>Creating beautiful,</p>
            <p>functional web experiences.</p>
          </div>
          {/* Bottom Text */}
          <div className="sm:col-span-3">
            <h1 className="home-title font-source-sans uppercase font-bold sm:font-normal">
              Frontend Developer
            </h1>
            <div className="home-mobile-tagline sm:hidden">
              <p>Creating beautiful, functional web experiences.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
