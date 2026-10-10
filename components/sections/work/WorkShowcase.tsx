import BentoGrid, { type BentoSectionData } from './showcase/BentoGrid';

interface WorkShowcaseProps {
  sections: BentoSectionData[];
}

export default function WorkShowcase({ sections }: WorkShowcaseProps) {
  return (
    <section
      aria-labelledby="work-showcase"
      className="mt-14 border-t border-slate-900/10 pt-10 dark:border-white/10 sm:mt-20 sm:pt-12"
    >
      <h2 id="work-showcase" className="work-section-heading mb-4">
        Showcase
      </h2>
      <div className="mt-8 space-y-6 sm:space-y-8">
        {sections.map((section) => (
          <BentoGrid key={section.id} section={section} />
        ))}
      </div>
    </section>
  );
}
