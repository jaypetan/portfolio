import type { NextPage } from 'next';
import ProjectPageTemplate from '@/components/sections/shared/ProjectPageTemplate';
import SarcVisual from '@/components/sections/home/appComponents/SarcVisual';
import work from '@/data/work/sarc.json';

const SARCPage: NextPage = () => {
  return <ProjectPageTemplate project={work} header={<SarcVisual variant="header" />} />;
};

export default SARCPage;
