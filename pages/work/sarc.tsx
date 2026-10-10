import type { NextPage } from 'next';
import WorkPageTemplate from '@/components/sections/work/WorkPageTemplate';
import SarcVisual from '@/components/sections/home/appComponents/SarcVisual';
import work from '@/data/work/sarc.json';

const SARCPage: NextPage = () => {
  return <WorkPageTemplate work={work} header={<SarcVisual variant="header" />} />;
};

export default SARCPage;
