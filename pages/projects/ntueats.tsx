import type { NextPage } from 'next';
import ProjectPageTemplate from '@/components/sections/shared/ProjectPageTemplate';
import project from '@/data/projects/ntueats.json';

const NTUEatsPage: NextPage = () => {
  return <ProjectPageTemplate project={project} />;
};

export default NTUEatsPage;
