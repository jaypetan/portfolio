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
        <section aria-labelledby="gameplay-video">
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
        </section>
      ) : null}
    </ProjectPageTemplate>
  );
};

export default DontDrownPage;
