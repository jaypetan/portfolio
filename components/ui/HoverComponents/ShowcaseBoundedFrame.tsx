import type { ReactNode } from 'react';

interface ShowcaseBoundedFrameProps {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  variant?: 'preview' | 'header'; // 'preview' for hover preview, 'header' for page header
}

export default function ShowcaseBoundedFrame({
  children,
  className = '',
  contentClassName = '',
  variant = 'preview',
}: ShowcaseBoundedFrameProps) {
  return (
    <div
      className={`${
        variant === 'header'
          ? 'w-full overflow-hidden'
          : 'mx-auto w-[calc(100vw-2rem)] max-w-135 overflow-hidden bg-slate-950/40 p-2 px-4 shadow-lg'
      } ${className}`.trim()}
    >
      <div
        className={`relative flex w-full items-center justify-center overflow-hidden bg-transparent ${
          variant === 'header' ? 'h-[33.333svh] lg:h-[50svh]' : 'h-32 sm:h-64'
        } ${contentClassName}`.trim()}
      >
        {children}
      </div>
    </div>
  );
}
