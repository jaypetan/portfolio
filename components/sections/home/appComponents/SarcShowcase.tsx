import ShowcaseBoundedFrame from '@/components/ui/HoverComponents/ShowcaseBoundedFrame';
import ShowcaseTitleOverlay from '@/components/ui/HoverComponents/ShowcaseTitleOverlay';

import mouse from '@/images/companies/sarc/mouse.png';
import background from '@/images/companies/sarc/sarc-bg.png';

export default function SarcShowcase() {
  return (
    <ShowcaseBoundedFrame className="h-auto min-h-36 rounded-2xl bg-slate-950/50 sm:min-h-68">
      <img
        src={background.src}
        alt="SARC interface"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <img
        src={mouse.src}
        alt=""
        aria-hidden="true"
        className="sarc-mouse-drift absolute left-[58%] top-1/2 z-10 w-20 -translate-x-1/2 -translate-y-1/2 sm:w-32"
      />
      <ShowcaseTitleOverlay title="Satellite Research Centre" subtitle="Web Developer" />
    </ShowcaseBoundedFrame>
  );
}
