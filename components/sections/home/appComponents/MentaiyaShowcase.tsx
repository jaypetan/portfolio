import ImageShowcaseColumns from '@/components/ui/ImageShowcaseColumns';
import ShowcaseTitleOverlay from '@/components/ui/ShowcaseTitleOverlay';
import career from '@/images/companies/mentaiya/mentaiya-career.png';
import review from '@/images/companies/mentaiya/mentaiya-reviews.png';
import home from '@/images/companies/mentaiya/mentaiya-home.png';
import story from '@/images/companies/mentaiya/mentaiya-about.png';
import menu from '@/images/companies/mentaiya/mentaiya-menu.png';

const showcaseImages1 = [career, review];
const showcaseImages2 = [home];
const showcaseImages3 = [story, menu];

const MentaiyaShowcase = () => {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl bg-white/5 p-2">
      <ShowcaseTitleOverlay title="Mentai-Ya" subtitle="Web Developer" />
      <ImageShowcaseColumns
        columns={[
          { images: showcaseImages1, direction: 'up', imageWidth: 160 },
          { images: showcaseImages2, direction: 'down', imageWidth: 160 },
          { images: showcaseImages3, direction: 'up', imageWidth: 160 },
        ]}
      />
    </div>
  );
};

export default MentaiyaShowcase;
