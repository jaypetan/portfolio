import type { NextPage } from 'next';
import ProjectPageTemplate from '@/components/sections/shared/ProjectPageTemplate';
import NTUeatsVisual from '@/components/sections/home/appComponents/NTUeatsVisual';
import project from '@/data/projects/ntueats.json';
import navigationData from '@/data/navigation.json';

const app = navigationData.projects.find((app) => app.id === 'ntueats');

const NTUEatsPage: NextPage = () => {
  return (
    <ProjectPageTemplate
      project={project}
      header={<NTUeatsVisual variant="header" iconSrc={app?.iconSrc ?? ''} />}
    />
  );
};

export default NTUEatsPage;
