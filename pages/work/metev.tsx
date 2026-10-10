import type { NextPage } from 'next';
import WorkPageTemplate from '@/components/sections/work/WorkPageTemplate';
import MetevVisual from '@/components/sections/home/appComponents/MetevVisual';
import work from '@/data/work/metev.json';

const MetEVPage: NextPage = () => {
  return <WorkPageTemplate work={work} header={<MetevVisual variant="header" />} />;
};

export default MetEVPage;
