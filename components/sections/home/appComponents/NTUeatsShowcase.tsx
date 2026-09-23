import Image from 'next/image';
import ShowcaseBoundedFrame from '@/components/ui/HoverComponents/ShowcaseBoundedFrame';
import ShowcaseTitleOverlay from '@/components/ui/HoverComponents/ShowcaseTitleOverlay';
import ntuEatsLogo from '@/images/projects/NTUeatsLogo.png';

export default function NTUeatsShowcase() {
  return (
    <ShowcaseBoundedFrame className="rounded-2xl bg-[#FAE1A0]" contentClassName="min-h-56">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.55),transparent_45%),linear-gradient(160deg,#f8df9b,#d9954d)]" />
      <div className="absolute -right-12 -top-16 h-44 w-44 rounded-full border-[18px] border-white/25" />
      <div className="absolute -bottom-20 -left-10 h-48 w-48 rounded-full border-[22px] border-orange-900/10" />
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-3 px-8 pb-8 pt-4 text-center text-orange-950">
        <Image
          src={ntuEatsLogo}
          alt="NTUeats"
          width={180}
          height={180}
          className="h-auto w-32 object-contain drop-shadow-[0_8px_14px_rgba(92,45,15,0.2)] sm:w-40"
        />
        <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-orange-950/70">
          <span className="h-2 w-2 rounded-full bg-orange-700" />
          Campus food platform
        </div>
      </div>
      <ShowcaseTitleOverlay
        title="NTUeats"
        subtitle="Food discovery project"
        titleClassName="whitespace-nowrap text-xl font-semibold tracking-wide text-white sm:text-2xl"
        subtitleClassName="whitespace-nowrap text-sm text-white/80 sm:text-base"
      />
    </ShowcaseBoundedFrame>
  );
}
