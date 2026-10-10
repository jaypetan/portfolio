import { useLayoutEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export interface TooltipAnchor {
  x: number;
  y: number;
}

export default function BentoTooltip({
  id,
  text,
  anchor,
}: {
  id: string;
  text: string;
  anchor: TooltipAnchor;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const position = () => {
      const tooltip = ref.current;
      if (!tooltip) return;
      const margin = 16;
      const gap = 16;
      const { width, height } = tooltip.getBoundingClientRect();
      // Keep the tooltip within the left and right screen edges.
      const left = Math.max(margin, Math.min(anchor.x + gap, window.innerWidth - width - margin));
      // Place it above the pointer when there isn't enough space below.
      const preferredTop =
        anchor.y + gap + height <= window.innerHeight - margin
          ? anchor.y + gap
          : anchor.y - height - gap;
      // Keep it within the top and bottom screen edges.
      const top = Math.max(margin, Math.min(preferredTop, window.innerHeight - height - margin));
      tooltip.style.left = `${left}px`;
      tooltip.style.top = `${top}px`;
      tooltip.style.visibility = 'visible';
    };
    position();
    // Recheck the bounds when the screen size changes.
    window.addEventListener('resize', position);
    return () => window.removeEventListener('resize', position);
  }, [anchor, text]);

  return createPortal(
    <div
      ref={ref}
      id={id}
      role="tooltip"
      style={{ visibility: 'hidden' }}
      className="fixed z-9999 w-[calc(100vw-2rem)] max-w-88 max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-700 shadow-xl wrap-anywhere whitespace-pre-line dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
    >
      {text}
    </div>,
    document.body,
  );
}
