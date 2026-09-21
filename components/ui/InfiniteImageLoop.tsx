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
}

export default function InfiniteImageLoop({
  images,
  direction = 'up',
  className = '',
  itemClassName = '',
  imageClassName = '',
  imageWidth = 160,
}: InfiniteImageLoopProps) {
  if (!images || images.length === 0) return null;

  const repeatedImages = [...images, ...images];
  const trackClassName = direction === 'up' ? 'scroll-up' : 'scroll-down';

  return (
    <div className={`w-full max-w-[calc(100vw-2rem)] overflow-hidden ${className}`.trim()}>
      <div className={`${trackClassName} w-full min-w-0`.trim()}>
        {repeatedImages.map((image, index) => {
          const src = typeof image === 'string' ? image : image.src;
          const alt =
            typeof image === 'string'
              ? `Loop item ${index + 1}`
              : image.alt ?? `Loop item ${index + 1}`;

          return (
            <div
              key={`${src}-${index}`}
              className={`shrink-0 overflow-hidden shadow-md ${itemClassName}`.trim()}
              style={{ width: `${imageWidth}px`, maxWidth: '100%' }}
            >
              <img
                src={src}
                alt={alt}
                className={`block h-auto w-full max-w-full ${imageClassName}`.trim()}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
