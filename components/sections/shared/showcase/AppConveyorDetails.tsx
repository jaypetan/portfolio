import type { AppShowcasePage } from './AppConveyor';

interface AppConveyorDetailsProps {
  page: AppShowcasePage;
}

// Display the details supplied by the currently selected showcase entry.
export default function AppConveyorDetails({ page }: AppConveyorDetailsProps) {
  return (
    <div className="flex h-48 max-w-2xl shrink-0 flex-col sm:h-40">
      <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">{page.name}</h3>

      <div className="mt-3 min-h-0 flex-1 overflow-y-auto">
        {page.description ? (
          <p className="whitespace-pre-line text-base leading-7 text-slate-600 dark:text-slate-300">
            {page.description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
