import Image from 'next/image';
import ShowcaseBoundedFrame from '@/components/ui/HoverComponents/ShowcaseBoundedFrame';
import ShowcaseTitleOverlay from '@/components/ui/HoverComponents/ShowcaseTitleOverlay';
import dontDrownLogo from '@/images/projects/DontDrownLogo.png';

function getYouTubeEmbedUrl(videoUrl: string) {
  try {
    const url = new URL(videoUrl);
    const videoId =
      url.hostname === 'youtu.be'
        ? url.pathname.slice(1)
        : url.searchParams.get('v') ?? url.pathname.split('/').pop();

    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  } catch {
    return null;
  }
}

interface DontDrownShowcaseProps {
  videoUrl?: string;
}

export default function DontDrownShowcase({ videoUrl }: DontDrownShowcaseProps) {
  const embedUrl = videoUrl ? getYouTubeEmbedUrl(videoUrl) : null;
  const videoId = embedUrl?.split('/').pop();
  const videoSrc = videoId
    ? `${embedUrl}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&disablekb=1&fs=0&rel=0&playsinline=1&enablejsapi=1`
    : null;

  return (
    <ShowcaseBoundedFrame className="rounded-2xl bg-[#002E45]" contentClassName="min-h-56">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(45,212,191,0.24),transparent_42%),linear-gradient(160deg,#083b56,#001923)]" />
      <div className="absolute bottom-0 left-0 h-20 w-full bg-[linear-gradient(180deg,transparent,rgba(0,10,18,0.8))]" />
      {videoSrc ? (
        <div className="absolute inset-0 z-10">
          <iframe
            src={videoSrc}
            title="Don't Drown gameplay video"
            className="pointer-events-none h-full w-full"
            allow="autoplay; encrypted-media; picture-in-picture"
          />
        </div>
      ) : (
        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-3 px-8 pb-8 pt-4 text-center text-white">
          <Image
            src={dontDrownLogo}
            alt="Don't Drown"
            width={180}
            height={180}
            className="h-auto w-28 object-contain drop-shadow-[0_8px_18px_rgba(0,0,0,0.45)] sm:w-36"
          />
          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-100/80">
            <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.9)]" />
            Survival game
          </div>
        </div>
      )}
      <ShowcaseTitleOverlay title="Don't Drown" subtitle="Game project" />
    </ShowcaseBoundedFrame>
  );
}
