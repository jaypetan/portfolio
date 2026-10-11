import Image from 'next/image';
import { useEffect, useRef, useState, type RefObject } from 'react';

import AppVideo from './AppVideo';

// Each entry comes from showcasePages in the project's JSON data.
export interface AppShowcasePage {
  id: string;
  name: string;
  description: string;
  media: {
    type: string;
    src: string;
    alt: string;
  };
}

interface AppConveyorProps {
  pages: AppShowcasePage[];
  sectionRef: RefObject<HTMLElement>;
  onSelectionChange: (index: number) => void;
}

const SNAP_DELAY_MS = 180;

// Measure vertical progress within the sticky section and whether it is visible.
function getScrollState(section: HTMLElement, scroller: HTMLElement) {
  const bounds = section.getBoundingClientRect();
  const scrollBounds = scroller.getBoundingClientRect();
  const travel = section.offsetHeight - scroller.clientHeight;
  const distance = scrollBounds.top - bounds.top;

  return {
    travel,
    distance,
    progress: Math.min(1, Math.max(0, distance / Math.max(1, travel))),
    visible: bounds.top < scrollBounds.bottom && bounds.bottom > scrollBounds.top,
  };
}

// One horizontal step includes the card width and the following gap.
function getCardStep(track: HTMLElement, card: HTMLElement) {
  return card.offsetWidth + (parseFloat(getComputedStyle(track).gap) || 0);
}

function getCardScrollTop(
  section: HTMLElement,
  scroller: HTMLElement,
  index: number,
  count: number,
) {
  const { travel, distance } = getScrollState(section, scroller);
  const sectionTop = scroller.scrollTop - distance;

  return sectionTop + (index / Math.max(1, count - 1)) * travel;
}

// Snap only inside the sticky interval so the user can enter and leave freely.
function snapToNearestCard(section: HTMLElement, scroller: HTMLElement, count: number) {
  const { travel, distance, progress } = getScrollState(section, scroller);

  if (count < 2 || travel <= 0 || distance < 0 || distance > travel) return;

  const index = Math.round(progress * (count - 1));
  const target = getCardScrollTop(section, scroller, index, count);

  if (Math.abs(target - scroller.scrollTop) < 1) return;

  scroller.scrollTo({
    top: target,
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
  });
}

// Connect scroll and resize events to the conveyor state.
function useConveyorScroll({ pages, sectionRef, onSelectionChange }: AppConveyorProps) {
  const viewportRef = useRef<HTMLDivElement>(null); // Visible area
  const trackRef = useRef<HTMLDivElement>(null); // Horizontal row of cards

  const [selected, setSelected] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;

    // The app scrolls inside this container rather than the browser window.
    const scroller = section?.closest<HTMLElement>('.page-scroll-container');

    if (!section || !viewport || !track || !scroller || !pages.length) return;

    let frame = 0;
    let snapTimer: ReturnType<typeof setTimeout> | undefined;

    const updateConveyor = () => {
      frame = 0;

      const { progress, visible: isVisible } = getScrollState(section, scroller);
      const firstCard = track.firstElementChild as HTMLElement | null;

      if (!firstCard) return;

      const step = getCardStep(track, firstCard);

      // Move each selected card to the left edge of the showcase.
      track.style.transform = `translateX(${-progress * (pages.length - 1) * step}px)`;

      // The card closest to the left edge becomes selected and gains full color.
      const index = Math.round(progress * (pages.length - 1));
      setSelected(index);
      onSelectionChange(index);

      // Pause videos once the entire showcase leaves the scroll container's viewport.
      setVisible(isVisible);
    };

    const schedule = () => {
      // Combine multiple scroll/resize events into one update per animation frame.
      if (!frame) frame = requestAnimationFrame(updateConveyor);
    };

    const onScroll = () => {
      schedule();
      clearTimeout(snapTimer);

      // Wait for wheel/touch scrolling to settle before locking onto the nearest card.
      snapTimer = setTimeout(
        () => snapToNearestCard(section, scroller, pages.length),
        SNAP_DELAY_MS,
      );
    };

    // Recalculate card spacing and scroll progress when the layout changes size.
    const observer = new ResizeObserver(schedule);
    observer.observe(viewport);
    observer.observe(scroller);
    observer.observe(section);

    scroller.addEventListener('scroll', onScroll);
    updateConveyor();

    return () => {
      // Remove subscriptions and any queued frame when the component unmounts.
      cancelAnimationFrame(frame);
      clearTimeout(snapTimer);
      observer.disconnect();
      scroller.removeEventListener('scroll', onScroll);
    };
  }, [pages.length, sectionRef, onSelectionChange]);

  return { viewportRef, trackRef, selected, visible };
}

// Render the card row; the hook manages scrolling and selection.
export default function AppConveyor(props: AppConveyorProps) {
  const { pages, sectionRef } = props;
  const { viewportRef, trackRef, selected, visible } = useConveyorScroll(props);

  // Clicking a card scrolls directly to its left-aligned position.
  const navigate = (index: number) => {
    const section = sectionRef.current;
    const scroller = section?.closest<HTMLElement>('.page-scroll-container');

    if (!section || !scroller) return;

    scroller.scrollTo({
      top: getCardScrollTop(section, scroller, index, pages.length),
      behavior: 'instant',
    });
  };

  if (!pages.length) return null;

  return (
    <div
      ref={viewportRef}
      className="relative w-full overflow-hidden py-3 [mask-image:linear-gradient(to_right,black_90%,transparent)]"
    >
      <div ref={trackRef} className="flex w-max items-center gap-5 sm:gap-8">
        {/* Keep every card in the row; only the selected video is allowed to play. */}
        {pages.map((page, index) => (
          <button
            key={page.id}
            type="button"
            tabIndex={index === selected ? 0 : -1}
            onClick={() => navigate(index)}
            className={`
              relative w-[min(65vw,320px,28svh)] aspect-[1206/2622]
              shrink-0 overflow-hidden rounded-2xl border-0 p-0 outline-none
              transition-[filter,opacity,scale] duration-200 ease-linear
              motion-reduce:transition-none
              ${
                index === selected
                  ? 'scale-100 opacity-100 grayscale-0'
                  : 'scale-90 opacity-35 grayscale'
              }`}
          >
            {page.media.type === 'video' ? (
              <AppVideo src={page.media.src} active={index === selected && visible} />
            ) : (
              <Image
                src={page.media.src}
                alt={page.media.alt}
                fill
                sizes="(max-width: 640px) 65vw, 320px"
                className="object-cover"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
