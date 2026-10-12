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
      <div className="sticky top-0 flex h-svh flex-col pt-6 pb-40 sm:pt-10 [@media(orientation:landscape)_and_(max-height:600px)]:pt-3 [@media(orientation:landscape)_and_(max-height:600px)]:pb-36">
        <div className="mb-5 flex shrink-0 items-center justify-between gap-4 [@media(orientation:landscape)_and_(max-height:600px)]:mb-2">
          <div>
            <h2 id="app-showcase-title" className="project-section-heading">
              Showcase
            </h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 [@media(orientation:landscape)_and_(max-height:600px)]:mt-1">
              Scroll down to explore the different components of the app.
            </p>
          </div>
          <span className="text-sm tabular-nums text-slate-500 dark:text-slate-400">
            {String(selected + 1).padStart(2, '0')} / {String(pages.length).padStart(2, '0')}
          </span>
        </div>
        {/* Short landscape screens place details beside the belt to preserve card height. */}
        <div className="flex min-h-0 flex-1 flex-col [@media(orientation:landscape)_and_(max-height:600px)]:grid [@media(orientation:landscape)_and_(max-height:600px)]:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] [@media(orientation:landscape)_and_(max-height:600px)]:gap-4">
          <AppConveyorDetails page={pages[selected]} />
          <div className="min-h-0 min-w-0 w-full flex-1 [container-type:size]">
            <AppConveyor pages={pages} sectionRef={sectionRef} onSelectionChange={setSelected} />
          </div>
        </div>
        {children ? (
          <div className="mt-4 shrink-0 [@media(orientation:landscape)_and_(max-height:600px)]:mt-2">
            {children}
          </div>
        ) : null}
      </div>
    </section>
  );
}
