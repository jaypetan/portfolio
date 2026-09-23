import type { ReactNode } from 'react';

interface ShowcaseBoundedFrameProps {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}

export default function ShowcaseBoundedFrame({
  children,
  className = '',
}: ShowcaseBoundedFrameProps) {
  return (
    <div
      className={`mx-auto w-[calc(100vw-2rem)] max-w-135 overflow-hidden bg-slate-950/40 p-2 px-4 shadow-lg ${className}`.trim()}
    >
      <div
        className={`relative flex w-full items-center justify-center overflow-hidden bg-transparent h-32 sm:h-64`.trim()}
      >
        {children}
      </div>
    </div>
  );
}
