import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="flex flex-col overflow-y-auto absolute top-0 left-0 z-50 pointer-events-auto h-screen w-full items-center justify-start px-6 text-center">
      <div className="max-w-3xl h-screen shrink-0">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-200/80">Portfolio Preview</p>
        <h1 className="text-4xl font-bold text-white drop-shadow-lg sm:text-5xl md:text-6xl">
          Hello World
        </h1>
        <p className="text-base text-slate-300 sm:text-lg">
          The 3D scene has been removed for now, leaving a cleaner animated background.
        </p>
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 rounded-md bg-gray-200 dark:bg-gray-800"
        >
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
      <div className="max-w-3xl h-screen shrink-0">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-200/80">Portfolio Preview</p>
        <h1 className="text-4xl font-bold text-white drop-shadow-lg sm:text-5xl md:text-6xl">
          Hello World
        </h1>
        <p className="text-base text-slate-300 sm:text-lg">
          The 3D scene has been removed for now, leaving a cleaner animated background.
        </p>
      </div>
    </div>
  );
}
