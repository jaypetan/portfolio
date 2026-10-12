import Image from 'next/image';
import ShowcaseBoundedFrame from '@/components/ui/HoverComponents/ShowcaseBoundedFrame';
import ShowcaseTitleOverlay from '@/components/ui/HoverComponents/ShowcaseTitleOverlay';
import mainMenu from '@/public/project/dontdrown/visuals/mainmenu-test.png';

export default function DontDrownVisual() {
  return (
    <ShowcaseBoundedFrame className="rounded-2xl bg-[#002E45]" contentClassName="min-h-56">
      <Image
        src={mainMenu}
        loading="eager"
        alt="Don't Drown underwater main menu"
        fill
        sizes="(max-width: 640px) 100vw, 540px"
        className="object-cover max-w-300 mx-auto"
      />
      <ShowcaseTitleOverlay title="Don't Drown" subtitle="Game Project" />
    </ShowcaseBoundedFrame>
  );
}
