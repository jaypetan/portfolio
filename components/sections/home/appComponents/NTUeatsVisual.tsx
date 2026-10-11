import Image from 'next/image';
import ShowcaseBoundedFrame from '@/components/ui/HoverComponents/ShowcaseBoundedFrame';
import ShowcaseTitleOverlay from '@/components/ui/HoverComponents/ShowcaseTitleOverlay';

export default function NTUeatsVisual({ iconSrc }: { iconSrc: string }) {
  return (
    <ShowcaseBoundedFrame className="rounded-2xl bg-[#FAE1A0]" contentClassName="min-h-56">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.55),transparent_45%),linear-gradient(160deg,#f8df9b,#d9954d)]" />
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-3 px-8 pb-8 pt-4 text-center text-orange-950">
        <Image
          src={iconSrc}
          alt="NTUeats"
          width={180}
          height={180}
          className="h-auto w-32 object-contain drop-shadow-[0_8px_14px_rgba(92,45,15,0.2)] sm:w-40"
        />
      </div>
      <ShowcaseTitleOverlay
        title="NTUeats"
        subtitle="Mobile App Project"
        titleClassName="whitespace-nowrap text-xl font-semibold tracking-wide text-white sm:text-2xl"
        subtitleClassName="whitespace-nowrap text-sm text-white/80 sm:text-base"
      />
    </ShowcaseBoundedFrame>
  );
}
