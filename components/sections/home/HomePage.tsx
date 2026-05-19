import { useEffect, useState } from 'react';
import Hero from '@/images/hero/heroPic.jpg';
import Light from './components/Light';
import TiltedCard from '@/components/ui/TiltedCard';

export default function HomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="flex flex-col absolute top-0 left-0 z-50 h-screen w-full items-center justify-start px-6 text-center">
      <div className="h-screen light:text-black dark:text-white flex items-center justify-center">
        <div className="flex flex-col sm:grid sm:grid-cols-[1fr_auto_1fr] gap-4 items-center">
          <div className="h-32 sm:self-auto">
            <Light />
          </div>
          <TiltedCard
            image={Hero}
            altText="Profile Image"
            imageSize="aspect-square w-64 sm:w-64 md:w-88"
            rotateAmplitude={12}
            scaleOnHover={1.05}
            showMobileWarning={false}
            displayOverlayContent
            overlayContent={
              <p className="glassmorphism-darkbg px-4 py-2 text-black">Hi, I'm Jun Peng</p>
            }
          />
          <div className="text-start self-end hidden sm:block sm:text-xl md:text-2xl">
            <p>Creating beautiful,</p>
            <p>functional web experiences.</p>
          </div>
          {/* Bottom Text */}
          <div className="sm:col-span-3 h-64 sm:h-auto">
            <h1 className="font-source-sans uppercase text-2xl font-bold sm:font-normal sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
              Frontend Developer
            </h1>
            <div className="text-lg sm:hidden">
              <p>Creating beautiful,functional web experiences.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
