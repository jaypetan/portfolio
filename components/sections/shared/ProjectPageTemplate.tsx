import type { ReactNode } from 'react';
import Head from 'next/head';
import ProjectHeader from './ProjectHeader';
import ProjectDescription, { type ProjectPageData } from './ProjectDescription';
import ProjectShowcase from './ProjectShowcase';

interface ProjectPageTemplateProps {
  project: ProjectPageData;
  header: ReactNode;
  children?: ReactNode;
}

export default function ProjectPageTemplate({
  project,
  header,
  children,
}: ProjectPageTemplateProps) {
  return (
    <>
      <Head>
        <title>
          {project.title} - {project.subtitle} | Portfolio
        </title>
        <meta
          name="description"
          content={`${project.title} - ${project.subtitle}. Contributions and selected highlights.`}
        />
      </Head>
      <main className="min-h-full bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        <ProjectHeader>{header}</ProjectHeader>
        <div className="max-w-300 mx-auto w-full px-6 pt-10 pb-48 sm:px-10 sm:pt-16 lg:px-12">
          <ProjectDescription project={project} />
          <ProjectShowcase sections={project.bentoSections} />
          {/* Page-specific content appears after the shared showcase. */}
          {children ? <div className="mt-14 sm:mt-20">{children}</div> : null}
        </div>
      </main>
    </>
  );
}
