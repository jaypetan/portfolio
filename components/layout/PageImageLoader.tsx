import { useEffect, useRef, useState, type ReactNode } from 'react';

const MAX_WAIT_MS = 15000;

// Use the rendered images so Next.js still chooses the correct responsive sources.
export default function PageImageLoader({ children }: { children: ReactNode }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const content = contentRef.current;
    const scroller = content?.closest<HTMLElement>('.page-scroll-container');
    if (!content || !scroller) return;

    let active = true;
    const cleanups: (() => void)[] = [];
    const reveal = () => {
      if (active) setReady(true);
    };
    const timeout = window.setTimeout(reveal, MAX_WAIT_MS);
    let started = false;
    const loadImages = () => {
      if (!active || started) return;
      const owners = document.querySelectorAll('[data-preload-owner]').length;
      const previews = document.querySelectorAll('[data-preload-images]').length;
      // Wait for every navigation preview portal, including on a cold first load.
      if (previews < owners) return;
      started = true;
      observer.disconnect();
      const viewport = scroller.getBoundingClientRect();
      const images = Array.from(content.querySelectorAll('img')).filter((image) => {
        const bounds = image.getBoundingClientRect();
        return (
          bounds.width > 0 &&
          bounds.height > 0 &&
          bounds.bottom > viewport.top &&
          bounds.top < viewport.bottom &&
          bounds.right > viewport.left &&
          bounds.left < viewport.right
        );
      });

      // Include hidden navigation previews, not just the images currently on screen.
      const navigationImages = Array.from(
        document.querySelectorAll<HTMLImageElement>('nav img, [data-preload-images] img'),
      );
      const allImages = Array.from(new Set([...images, ...navigationImages]));
      const loading = allImages.map(
        (image) =>
          new Promise<void>((resolve) => {
            const finish = () => {
              image.removeEventListener('load', finish);
              image.removeEventListener('error', finish);
              // decode() waits until the downloaded image is ready to paint.
              void image
                .decode()
                .catch(() => {})
                .then(resolve);
            };

            image.addEventListener('load', finish);
            image.addEventListener('error', finish);
            cleanups.push(() => {
              image.removeEventListener('load', finish);
              image.removeEventListener('error', finish);
            });
            image.loading = 'eager';
            if (image.complete) finish();
          }),
      );

      void Promise.all(loading).then(() => {
        window.clearTimeout(timeout);
        reveal();
      });
    };
    const observer = new MutationObserver(loadImages);
    observer.observe(document.body, { childList: true, subtree: true });
    loadImages();

    return () => {
      active = false;
      observer.disconnect();
      window.clearTimeout(timeout);
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return (
    <div className="relative min-h-full">
      <div ref={contentRef} className={`min-h-full ${ready ? 'visible' : 'invisible'}`}>
        {children}
      </div>
      {!ready ? (
        <div className="absolute inset-0 flex items-center justify-center text-sm text-slate-600 dark:text-slate-300">
          Loading images…
        </div>
      ) : null}
    </div>
  );
}
