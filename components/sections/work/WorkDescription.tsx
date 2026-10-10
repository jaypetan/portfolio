export interface WorkPageData {
  company: string;
  jobTitle: string;
  languages: string[];
  contributions: string[];
  bentoSections: BentoSectionData[];
}

export default function WorkDescription({ work }: { work: WorkPageData }) {
  return (
    <section aria-labelledby="work-company">
      <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(16rem,0.65fr)] md:gap-16">
        <div>
          <p className="work-section-heading mb-4">
            Work experience
          </p>
          <h1
            id="work-company"
            className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl"
          >
            {work.company}
          </h1>
          <p className="mt-4 text-xl text-slate-600 dark:text-slate-300 sm:text-2xl">
            {work.jobTitle}
          </p>
        </div>
        <div className="md:pt-1 md:text-right">
          <h2 className="work-section-heading">
            Coding languages
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2 md:justify-end">
            {work.languages.map((language, index) => (
              <li
                key={`${language}-${index}`}
                className="rounded-full border border-slate-900/10 bg-white/40 px-4 py-2 text-sm dark:border-white/15 dark:bg-white/5"
              >
                {language}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-10 border-t border-slate-900/10 pt-8 dark:border-white/10 sm:mt-12">
        <h2 className="work-section-heading">
          Contributions
        </h2>
        <ul className="mt-5 max-w-3xl list-disc space-y-4 pl-5 text-base leading-8 text-slate-600 marker:text-sky-500 dark:text-slate-300 sm:text-lg">
          {work.contributions.map((contribution, index) => (
            <li key={index} className="pl-2">
              {contribution}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
import type { BentoSectionData } from './showcase/BentoGrid';
