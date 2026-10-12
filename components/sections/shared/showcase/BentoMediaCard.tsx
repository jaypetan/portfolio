import { useEffect, useId, useRef, useState } from 'react';
import { useIsPresent } from 'motion/react';
import BentoTooltip, { type TooltipAnchor } from './BentoTooltip';

export interface BentoItemData {
  id: string;
  description: string;
  hoverText?: string;
  media: {
    type: string;
    src: string;
    alt: string;
    poster?: string;
    fit?: string;
    position?: string;
  };
}

interface BentoMediaCardProps {
  item: BentoItemData;
  className?: string;
}

function BentoVideo({ media }: { media: BentoItemData['media'] }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isPresent = useIsPresent();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let visible = false;
    let active = true;

    const shouldPlay = () => active && isPresent && visible && !document.hidden;
    const updatePlayback = () => {
      if (shouldPlay()) {
        void video
          .play()
          .then(() => {
            // The card may leave the viewport while the browser starts playback.
            if (!shouldPlay()) video.pause();
          })
          .catch(() => {
            // Leave the video paused if the browser blocks autoplay.
          });
      } else {
        video.pause();
      }
    };

    // IntersectionObserver to detect when the video is in the viewport.
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        updatePlayback();
      },
      { threshold: 0 },
    );

    observer.observe(video);
    document.addEventListener('visibilitychange', updatePlayback);
    return () => {
      active = false;
      observer.disconnect();
      document.removeEventListener('visibilitychange', updatePlayback);
      video.pause();
    };
  }, [isPresent, media.src]);

  return (
    <video
      ref={videoRef}
      src={media.src}
      poster={media.poster || undefined}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={media.alt}
      className="absolute inset-0 h-full w-full"
      style={{
        objectFit: media.fit === 'contain' ? 'contain' : 'cover',
        objectPosition: media.position || 'center',
      }}
    />
  );
}

function BentoImage({ media }: { media: BentoItemData['media'] }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;

  return (
    <img
      src={media.src}
      alt={media.alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className="absolute inset-0 h-full w-full"
      style={{
        objectFit: media.fit === 'contain' ? 'contain' : 'cover',
        objectPosition: media.position || 'center',
      }}
    />
  );
}

export default function BentoMediaCard({ item, className = '' }: BentoMediaCardProps) {
  const tooltipId = useId();
  const [anchor, setAnchor] = useState<TooltipAnchor | null>(null);
  const [touchInput, setTouchInput] = useState(false);
  const isPresent = useIsPresent();
  const hoverText = item.hoverText?.trim();
  const isTooltipOpen = Boolean(anchor);

  useEffect(() => {
    // Show descriptions without a hover gesture on touch-first devices.
    const query = window.matchMedia('(hover: none) and (pointer: coarse)');
    const updateInput = () => setTouchInput(query.matches);
    updateInput();

    // Listen for changes to the media query to update the input state.
    query.addEventListener('change', updateInput);
    return () => query.removeEventListener('change', updateInput);
  }, []);

  useEffect(() => {
    if (!isTooltipOpen) return;
    const dismiss = (event: Event) => {
      const tooltip = document.getElementById(tooltipId);
      if (event.target instanceof Node && tooltip?.contains(event.target)) return;
      setAnchor(null);
    };
    window.addEventListener('scroll', dismiss, true);
    return () => window.removeEventListener('scroll', dismiss, true);
  }, [isTooltipOpen, tooltipId]);

  return (
    <figure
      className={`bento-media-card relative m-0 min-w-0 overflow-hidden rounded-3xl bg-slate-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-500 dark:bg-slate-900 ${className}`}
      tabIndex={hoverText ? 0 : undefined}
      aria-describedby={hoverText && anchor && isPresent ? tooltipId : undefined}
      onPointerEnter={(event) => {
        setTouchInput(event.pointerType !== 'mouse');
        if (hoverText && event.pointerType === 'mouse') {
          setAnchor({ x: event.clientX, y: event.clientY });
        }
      }}
      onPointerDown={(event) => {
        const isTouch = event.pointerType !== 'mouse';
        setTouchInput(isTouch);
        if (isTouch) setAnchor(null);
      }}
      onPointerMove={(event) => {
        if (hoverText && event.pointerType === 'mouse') {
          setAnchor({ x: event.clientX, y: event.clientY });
        }
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === 'mouse') setAnchor(null);
      }}
      onFocus={(event) => {
        // Touch focus must not open the floating desktop tooltip.
        if (!hoverText || !event.currentTarget.matches(':focus-visible')) return;
        const rect = event.currentTarget.getBoundingClientRect();
        setAnchor({ x: rect.left, y: rect.bottom });
      }}
      onBlur={() => setAnchor(null)}
      onKeyDown={(event) => {
        if (event.key === 'Escape') setAnchor(null);
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-linear-to-br from-slate-400/15 via-transparent to-slate-500/20 dark:from-slate-500/15 dark:to-slate-700/20"
      />
      {item.media.src ? (
        item.media.type === 'video' ? (
          <BentoVideo key={item.media.src} media={item.media} />
        ) : (
          <BentoImage key={item.media.src} media={item.media} />
        )
      ) : null}
      <div
        className={`z-10 text-center ${
          touchInput && hoverText
            ? 'relative flex flex-col items-center gap-2 px-3 pb-3 pt-[35%]'
            : 'pointer-events-none absolute inset-x-3 bottom-3 flex justify-center'
        }`}
      >
        <span className="inline-block max-w-full shrink-0 rounded-md bg-black/85 px-2.5 py-1 text-sm font-medium leading-snug text-white">
          {item.description}
        </span>
        {touchInput && hoverText ? (
          <p className="w-full rounded-xl bg-black/85 p-3 text-left text-sm leading-6 text-white">
            {hoverText}
          </p>
        ) : null}
      </div>
      {hoverText && anchor && isPresent && !touchInput ? (
        <BentoTooltip id={tooltipId} text={hoverText} anchor={anchor} />
      ) : null}
    </figure>
  );
}
