import { useState, useEffect } from 'react';
import Lightbulb from '@/images/util/lightbulb.svg';
import Image from 'next/image';
import { useTheme } from 'next-themes';

export default function Light() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isDark = !mounted ? true : resolvedTheme === 'dark';

  useEffect(() => setMounted(true), []);

  return (
    <div className="relative mx-4 sm:mb-4">
      {/* light */}
      <div
        className={`${
          isDark ? 'opacity-5' : 'opacity-80'
        } absolute top-2 -left-2 z-10 aspect-square h-3/5 rounded-full bg-yellow-200 shadow-[0px_0px_20px_10px] shadow-yellow-200`}
      />
      <Image
        src={Lightbulb}
        alt="light-toggle"
        width={0}
        height={0}
        className="relative z-20 w-16 -rotate-25 hover:cursor-pointer active:scale-90 md:w-24"
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
      />
    </div>
  );
}
