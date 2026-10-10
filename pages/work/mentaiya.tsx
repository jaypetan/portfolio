import type { NextPage } from 'next';
import WorkPageTemplate from '@/components/sections/work/WorkPageTemplate';
import MentaiyaVisual from '@/components/sections/home/appComponents/MentaiyaVisual';
import work from '@/data/work/mentaiya.json';

const MentaiyaPage: NextPage = () => {
  return <WorkPageTemplate work={work} header={<MentaiyaVisual variant="header" />} />;
};

export default MentaiyaPage;
