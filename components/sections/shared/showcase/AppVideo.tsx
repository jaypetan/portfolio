import { useEffect, useRef } from 'react';
import { useIsPresent } from 'motion/react';

interface AppVideoProps {
  src: string;
  active: boolean;
}

export default function AppVideo({ src, active }: AppVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  // Stop playback when Motion starts removing the page during navigation.
  const isPresent = useIsPresent();

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    let cancelled = false;
    // Reset on selection changes so returning to this card replays it from the start.
    video.pause();
    video.currentTime = 0;
    const updatePlayback = () => {
      // Only the selected, visible card can play, and only while the browser tab is visible.
      if (active && isPresent && !document.hidden && !cancelled) {
        void video
          .play()
          .then(() => {
            // Playback can start asynchronously after the card has been deselected.
            if (cancelled || document.hidden) video.pause();
          })
          .catch(() => {
            // Leave the video paused if the browser refuses autoplay.
          });
      } else {
        video.pause();
      }
    };
    updatePlayback();
    document.addEventListener('visibilitychange', updatePlayback);
    return () => {
      // Prevent pending playback from continuing after this effect is replaced.
      cancelled = true;
      video.pause();
      document.removeEventListener('visibilitychange', updatePlayback);
    };
  }, [active, isPresent, src]);

  return (
    <video
      ref={ref}
      src={src}
      muted
      playsInline
      loop
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}
