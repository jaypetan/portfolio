import type { NextPage } from 'next';
import ProjectPageTemplate from '@/components/sections/shared/ProjectPageTemplate';
import project from '@/data/projects/ntueats.json';
import AppConveyorShowcase from '@/components/sections/shared/showcase/AppConveyorShowcase';

const NTUEatsPage: NextPage = () => {
  return (
    <ProjectPageTemplate
      project={project}
      showcase={<AppConveyorShowcase pages={project.showcasePages} />}
    />
  );
};

export default NTUEatsPage;
