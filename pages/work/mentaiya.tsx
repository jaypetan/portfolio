import type { NextPage } from 'next';
import ProjectPageTemplate from '@/components/sections/shared/ProjectPageTemplate';
import MentaiyaVisual from '@/components/sections/home/appComponents/MentaiyaVisual';
import work from '@/data/work/mentaiya.json';

const MentaiyaPage: NextPage = () => {
  return <ProjectPageTemplate project={work} header={<MentaiyaVisual variant="header" />} />;
};

export default MentaiyaPage;
