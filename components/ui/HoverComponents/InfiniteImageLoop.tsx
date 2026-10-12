import { useEffect, useRef, useState, type CSSProperties } from 'react';
import Image from 'next/image';
import previewImageSizes from '@/data/previewImageSizes.json';

const imageSizes: Record<string, { width: number; height: number }> = previewImageSizes;

type ImageSource = string | { src: string; alt?: string };

interface InfiniteImageLoopProps {
  images: ImageSource[];
  direction?: 'up' | 'down';
  speed?: number;
  gap?: number;
  className?: string;
  itemClassName?: string;
  imageClassName?: string;
  imageWidth?: number;
  loopClassName?: string;
  responsive?: boolean;
}

export default function InfiniteImageLoop({
  images,
  direction = 'up',
  speed = 100,
  className = '',
  itemClassName = '',
  imageClassName = '',
  imageWidth = 160,
  loopClassName = '',
  responsive = false,
}: InfiniteImageLoopProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [scrollDuration, setScrollDuration] = useState(12);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const updateDuration = () => {
      const distance = track.scrollHeight / 2;
      const pixelsPerSecond = Number.isFinite(speed) && speed > 0 ? speed : 42;
      const nextDuration = Math.max(1, distance) / pixelsPerSecond;
      setScrollDuration(nextDuration);
    };

    updateDuration();

    const resizeObserver = new ResizeObserver(updateDuration);
    resizeObserver.observe(track);

    return () => resizeObserver.disconnect();
  }, [images, imageWidth, speed]);

  if (!images || images.length === 0) return null;

  const repeatedImages = [...images, ...images];
  const trackClassName = direction === 'up' ? 'scroll-up' : 'scroll-down';

  return (
    <div
      className={`w-full max-w-[calc(100vw-2rem)] overflow-hidden ${className} ${loopClassName}`.trim()}
    >
      <div
        ref={trackRef}
        className={`${trackClassName} w-full min-w-0`.trim()}
        style={{ '--scroll-duration': `${scrollDuration}s` } as CSSProperties}
      >
        {repeatedImages.map((image, index) => {
          const src = typeof image === 'string' ? image : image.src;
          const dimensions = imageSizes[src] ?? { width: imageWidth, height: imageWidth };
          const alt =
            typeof image === 'string'
              ? `Loop item ${index + 1}`
              : image.alt ?? `Loop item ${index + 1}`;

          return (
            <div
              key={`${src}-${index}`}
              className={`shrink-0 overflow-hidden shadow-md ${itemClassName}`.trim()}
              style={{ width: responsive ? '100%' : `${imageWidth}px`, maxWidth: '100%' }}
            >
              <Image
                src={src}
                alt={alt}
                width={dimensions.width}
                height={dimensions.height}
                sizes={
                  responsive
                    ? '(max-width: 640px) 33vw, (max-width: 1024px) 30vw, 480px'
                    : `${imageWidth}px`
                }
                loading="eager"
                className={`block h-auto w-full max-w-full ${imageClassName}`.trim()}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
