import type { ReactNode } from 'react';
import Head from 'next/head';
import WorkHeader from './WorkHeader';
import WorkDescription, { type WorkPageData } from './WorkDescription';
import WorkShowcase from './WorkShowcase';

interface WorkPageTemplateProps {
  work: WorkPageData;
  header: ReactNode;
}

export default function WorkPageTemplate({ work, header }: WorkPageTemplateProps) {
  return (
    <>
      <Head>
        <title>
          {work.company} - {work.jobTitle} | Portfolio
        </title>
        <meta
          name="description"
          content={`${work.jobTitle} at ${work.company}. Work experience and selected projects.`}
        />
      </Head>
      <main className="min-h-full bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        <WorkHeader>{header}</WorkHeader>
        <div className="work-page-content mx-auto w-full px-6 pt-10 pb-48 sm:px-10 sm:pt-16 lg:px-12">
          <WorkDescription work={work} />
          <WorkShowcase sections={work.bentoSections} />
        </div>
      </main>
    </>
  );
}
