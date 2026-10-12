import type { NextPage } from 'next';
import ProjectPageTemplate from '@/components/sections/shared/ProjectPageTemplate';
import project from '@/data/projects/ntueats.json';
import AppConveyorShowcase from '@/components/sections/shared/showcase/AppConveyorShowcase';

const NTUEatsPage: NextPage = () => {
  return (
    <ProjectPageTemplate
      project={project}
      showcase={
        <AppConveyorShowcase pages={project.showcasePages}>
          <h2 className="justify-self-end ml-auto text-sm sm:text-base uppercase  tracking-wide text-slate-500 dark:text-slate-400">
            Read the full FYP report:
            <a
              href="/project/ntuEats/report/FYP_Report.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline dark:text-blue-400 ml-2"
            >
              NTUEats Report (PDF)
            </a>
          </h2>
        </AppConveyorShowcase>
      }
    />
  );
};

export default NTUEatsPage;
