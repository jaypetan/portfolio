import BentoGrid, { type BentoSectionData } from './showcase/BentoGrid';

interface ProjectShowcaseProps {
  sections: BentoSectionData[];
}

export default function ProjectShowcase({ sections }: ProjectShowcaseProps) {
  return (
    <section
      aria-labelledby="project-showcase"
      className="mt-14 border-t border-slate-900/10 pt-10 dark:border-white/10 sm:mt-20 sm:pt-12"
    >
      <h2 id="project-showcase" className="project-section-heading">
        Showcase
      </h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 mt-2">
        Hover over the images to see more details about each component of the project.
      </p>
      <div className="mt-8 space-y-6 sm:space-y-8">
        {sections.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Showcase content coming soon.
          </p>
        ) : null}
        {sections.map((section) => (
          <BentoGrid key={section.id} section={section} />
        ))}
      </div>
    </section>
  );
}
