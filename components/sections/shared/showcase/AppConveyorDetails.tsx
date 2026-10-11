import type { AppShowcasePage } from './AppConveyor';

interface AppConveyorDetailsProps {
  page: AppShowcasePage;
}

// Display the details supplied by the currently selected showcase entry.
export default function AppConveyorDetails({ page }: AppConveyorDetailsProps) {
  return (
    <div className="mb-6 max-w-2xl">
      <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">{page.name}</h3>

      {page.description ? (
        <p className="mt-3 whitespace-pre-line text-base leading-7 text-slate-600 dark:text-slate-300">
          {page.description}
        </p>
      ) : null}
    </div>
  );
}
