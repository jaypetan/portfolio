import type { AppShowcasePage } from './AppConveyor';

interface AppConveyorDetailsProps {
  page: AppShowcasePage;
}

// Display the details supplied by the currently selected showcase entry.
export default function AppConveyorDetails({ page }: AppConveyorDetailsProps) {
  return (
    <div className="flex h-48 min-h-0 min-w-0 max-w-2xl shrink-0 flex-col sm:h-40 [@media(max-height:600px)]:h-24 [@media(orientation:landscape)_and_(max-height:600px)]:h-full">
      <h3 className="shrink-0 text-xl font-semibold tracking-tight sm:text-2xl [@media(orientation:landscape)_and_(max-height:600px)]:text-lg">{page.name}</h3>

      <div className="mt-3 min-h-0 flex-1 overflow-y-auto overscroll-contain [@media(orientation:landscape)_and_(max-height:600px)]:mt-1">
        {page.description ? (
          <p className="whitespace-pre-line text-base leading-7 text-slate-600 dark:text-slate-300 [@media(orientation:landscape)_and_(max-height:600px)]:text-sm [@media(orientation:landscape)_and_(max-height:600px)]:leading-5">
            {page.description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
