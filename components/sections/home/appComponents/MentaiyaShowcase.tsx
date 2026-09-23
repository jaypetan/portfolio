import ImageShowcaseColumns from '@/components/ui/HoverComponents/ImageShowcaseColumns';
import ShowcaseBoundedFrame from '@/components/ui/HoverComponents/ShowcaseBoundedFrame';
import ShowcaseTitleOverlay from '@/components/ui/HoverComponents/ShowcaseTitleOverlay';
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
    <ShowcaseBoundedFrame className="rounded-2xl bg-slate-950/50">
      <ShowcaseTitleOverlay title="Mentai-Ya" subtitle="Web Developer" />
      <ImageShowcaseColumns
        columns={[
          { images: showcaseImages1, direction: 'up', imageWidth: 160 },
          { images: showcaseImages2, direction: 'down', imageWidth: 160 },
          { images: showcaseImages3, direction: 'up', imageWidth: 160 },
        ]}
      />
    </ShowcaseBoundedFrame>
  );
};

export default MentaiyaShowcase;
