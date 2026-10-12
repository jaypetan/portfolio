import { useRef, useState, type ReactNode } from 'react';
import AppConveyor, { type AppShowcasePage } from './AppConveyor';
import AppConveyorDetails from './AppConveyorDetails';

// Owns the showcase section, sticky layout, heading, and card counter.
export default function AppConveyorShowcase({
  pages,
  children,
}: {
  pages: AppShowcasePage[];
  children?: ReactNode;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [selected, setSelected] = useState(0);

  if (!pages.length) return null;

  return (
    <section
      ref={sectionRef}
      className="mt-14 border-t border-slate-900/10 dark:border-white/10 sm:mt-20"
      // One screen for the sticky panel, plus 55% of a screen per card transition.
      style={{ height: `${100 + Math.max(0, pages.length - 1) * 55}svh` }}
    >
      {/* Keep the belt in view while the tall outer section supplies scroll distance. */}
      <div className="sticky top-0 flex h-svh flex-col justify-start py-6 sm:py-10">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <h2 id="app-showcase-title" className="project-section-heading">
              Showcase
            </h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Scroll down to explore the different components of the app.
            </p>
          </div>
          <span className="text-sm tabular-nums text-slate-500 dark:text-slate-400">
            {String(selected + 1).padStart(2, '0')} / {String(pages.length).padStart(2, '0')}
          </span>
        </div>
        <AppConveyorDetails page={pages[selected]} />
        <AppConveyor pages={pages} sectionRef={sectionRef} onSelectionChange={setSelected} />
        {children ? <div className="mt-6">{children}</div> : null}
      </div>
    </section>
  );
}
