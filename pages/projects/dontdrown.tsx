import type { NextPage } from 'next';
import ProjectPageTemplate from '@/components/sections/shared/ProjectPageTemplate';
import DontDrownVisual from '@/components/sections/home/appComponents/DontDrownVisual';
import project from '@/data/projects/dontdrown.json';
import navigationData from '@/data/navigation.json';

const app = navigationData.projects.find((app) => app.id === 'dontdrown');

const DontDrownPage: NextPage = () => {
  return (
    <ProjectPageTemplate
      project={project}
      header={
        <DontDrownVisual variant="header" iconSrc={app?.iconSrc ?? ''} videoUrl={app?.videoUrl} />
      }
    />
  );
};

export default DontDrownPage;
