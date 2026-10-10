import type { NextPage } from 'next';
import ProjectPageTemplate from '@/components/sections/shared/ProjectPageTemplate';
import MetevVisual from '@/components/sections/home/appComponents/MetevVisual';
import work from '@/data/work/metev.json';

const MetEVPage: NextPage = () => {
  return <ProjectPageTemplate project={work} header={<MetevVisual variant="header" />} />;
};

export default MetEVPage;
