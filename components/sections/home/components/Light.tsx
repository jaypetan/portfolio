import { useState, useEffect } from 'react';
import Lightbulb from '@/images/util/lightbulb.svg';
import Image from 'next/image';
import { useTheme } from 'next-themes';

export default function Light() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="relative mx-4 sm:mb-4">
      {/* light */}
      <div
        className={`${
          theme === 'light' ? 'opacity-80' : 'opacity-5'
        } hover: absolute top-2 -left-2 z-10 aspect-square h-3/5 rounded-full bg-yellow-200 shadow-[0px_0px_20px_10px] shadow-yellow-200`}
      />
      <Image
        src={Lightbulb}
        alt="light-toggle"
        width={0}
        height={0}
        className="relative z-20 w-16 -rotate-25 hover:cursor-pointer active:scale-90 md:w-24"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      />
    </div>
  );
}
