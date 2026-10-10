import type { ReactNode } from 'react';

export default function WorkHeader({ children }: { children: ReactNode }) {
  return (
    <header className="relative w-full overflow-hidden border-b border-slate-900/10 dark:border-white/10">
      <div aria-hidden="true" className="work-header-artwork max-w-360 mx-auto">
        {children}
      </div>
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-slate-950/30 via-transparent to-slate-950/10" />
    </header>
  );
}
