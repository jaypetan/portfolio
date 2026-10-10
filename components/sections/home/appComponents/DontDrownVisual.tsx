import Image from 'next/image';
import ShowcaseBoundedFrame from '@/components/ui/HoverComponents/ShowcaseBoundedFrame';
import ShowcaseTitleOverlay from '@/components/ui/HoverComponents/ShowcaseTitleOverlay';

function getYouTubeEmbedUrl(videoUrl: string) {
  try {
    const url = new URL(videoUrl);
    const hostname = url.hostname.replace(/^www\./, '');
    if (!['youtu.be', 'youtube.com', 'youtube-nocookie.com'].includes(hostname)) return null;
    const videoId =
      hostname === 'youtu.be'
        ? url.pathname.slice(1)
        : url.searchParams.get('v') ?? url.pathname.split('/').pop();

    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  } catch {
    return null;
  }
}

interface DontDrownVisualProps {
  videoUrl?: string;
  iconSrc: string;
  variant?: 'preview' | 'header';
}

export default function DontDrownVisual({
  videoUrl,
  iconSrc,
  variant = 'preview',
}: DontDrownVisualProps) {
  const embedUrl = videoUrl ? getYouTubeEmbedUrl(videoUrl) : null;
  const directVideoSrc = videoUrl && !embedUrl ? videoUrl : null;
  const videoId = embedUrl?.split('/').pop();
  const videoSrc = videoId
    ? `${embedUrl}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&disablekb=1&fs=0&rel=0&playsinline=1&enablejsapi=1`
    : null;

  return (
    <ShowcaseBoundedFrame
      variant={variant}
      className={variant === 'preview' ? 'rounded-2xl bg-[#002E45]' : 'bg-[#002E45]'}
      contentClassName={variant === 'preview' ? 'min-h-56' : ''}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(45,212,191,0.24),transparent_42%),linear-gradient(160deg,#083b56,#001923)]" />
      {directVideoSrc ? (
        // Direct video files play without YouTube overlays or native controls.
        <video
          src={directVideoSrc}
          autoPlay
          muted
          loop
          playsInline
          controls={false}
          preload="metadata"
          aria-label="Don't Drown gameplay video"
          className="pointer-events-none absolute inset-0 z-10 h-full w-full object-cover"
        />
      ) : videoSrc ? (
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
            src={iconSrc}
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
      {variant === 'preview' ? (
        <ShowcaseTitleOverlay title="Don't Drown" subtitle="Game Project" />
      ) : null}
    </ShowcaseBoundedFrame>
  );
}
