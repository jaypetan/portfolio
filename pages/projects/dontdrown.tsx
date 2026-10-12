import type { NextPage } from 'next';
import ProjectPageTemplate from '@/components/sections/shared/ProjectPageTemplate';
import project from '@/data/projects/dontdrown.json';
import navigationData from '@/data/navigation.json';

const app = navigationData.projects.find((app) => app.id === 'dontdrown');
const videoId = app?.videoUrl ? new URL(app.videoUrl).pathname.slice(1) : null;

const DontDrownPage: NextPage = () => {
  return (
    <ProjectPageTemplate project={project}>
      {videoId ? (
        <section
          aria-labelledby="gameplay-video"
          className="mt-14 border-t border-slate-900/10 dark:border-white/10 sm:mt-20 pt-10 sm:pt-12"
        >
          <h2 id="gameplay-video" className="project-section-heading mb-6">
            Gameplay Video
          </h2>
          <div className="aspect-video overflow-hidden rounded-2xl bg-black">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?rel=0`}
              title="Don't Drown gameplay video"
              loading="lazy"
              className="h-full w-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <h2
            id="gameplay-video"
            className="mt-6 justify-self-end ml-auto text-sm sm:text-base uppercase  tracking-wide text-slate-500 dark:text-slate-400"
          >
            Play the Game @{' '}
            <a
              href="https://jaypetan.itch.io/dontdrown"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              jaypetan.itch.io/dontdrown
            </a>
          </h2>
        </section>
      ) : null}
    </ProjectPageTemplate>
  );
};

export default DontDrownPage;
