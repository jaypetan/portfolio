import ImageShowcaseColumns from '@/components/ui/HoverComponents/ImageShowcaseColumns';
import ShowcaseBoundedFrame from '@/components/ui/HoverComponents/ShowcaseBoundedFrame';
import ShowcaseTitleOverlay from '@/components/ui/HoverComponents/ShowcaseTitleOverlay';

import community from '@/images/companies/metev/metev-community.png';
import mb1 from '@/images/companies/metev/metev-mb1.png';
import home from '@/images/companies/metev/metev-home.png';

const showcaseImages1 = [community];
const showcaseImages2 = [mb1];
const showcaseImages3 = [home];

export default function MetevShowcase() {
  return (
    <ShowcaseBoundedFrame className="rounded-2xl bg-slate-950/50">
      <ShowcaseTitleOverlay title="Met EV" subtitle="Web Developer" />
      <ImageShowcaseColumns
        columns={[
          { images: showcaseImages1, direction: 'up', imageWidth: 160 },
          { images: showcaseImages2, direction: 'down', imageWidth: 160 },
          { images: showcaseImages3, direction: 'up', imageWidth: 160 },
        ]}
      />
    </ShowcaseBoundedFrame>
  );
}
