import { useEffect, useRef, useState, type RefObject } from 'react';

import AppConveyorCard from './AppConveyorCard';

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

// Get the scroll progress
function getScrollState(section: HTMLElement, scroller: HTMLElement, pageCount: number) {
  const bounds = section.getBoundingClientRect();
  const scrollBounds = scroller.getBoundingClientRect();
  const travel = section.offsetHeight - scroller.clientHeight; // how much the section can scroll inside the scroller
  const distance = scrollBounds.top - bounds.top; // how far the section has scrolled inside the scroller

  const progress = Math.min(1, Math.max(0, distance / Math.max(1, travel)));
  // Fractional card position for movement; round it when selecting a card.
  const cardPosition = progress * Math.max(0, pageCount - 1);

  return {
    travel,
    distance,
    cardPosition,
    visible: bounds.top < scrollBounds.bottom && bounds.bottom > scrollBounds.top,
  };
}

// Get distance between 2 cards
function getCardStep(track: HTMLElement, card: HTMLElement) {
  return card.offsetWidth + (parseFloat(getComputedStyle(track).gap) || 0);
}

// Get the scrollTop value that aligns the selected card to the left edge of the showcase.
function getCardScrollTop(
  section: HTMLElement,
  scroller: HTMLElement,
  index: number,
  pageCount: number,
) {
  const { travel, distance } = getScrollState(section, scroller, pageCount);
  const sectionTop = scroller.scrollTop - distance;

  return sectionTop + (index / Math.max(1, pageCount - 1)) * travel;
}

// Snap only inside the sticky interval so the user can enter and leave freely.
function snapToNearestCard(section: HTMLElement, scroller: HTMLElement, pageCount: number) {
  const { travel, distance, cardPosition } = getScrollState(section, scroller, pageCount);

  if (pageCount < 2 || travel <= 0 || distance < 0 || distance > travel) return;

  const index = Math.round(cardPosition);
  const target = getCardScrollTop(section, scroller, index, pageCount);

  if (Math.abs(target - scroller.scrollTop) < 1) return;

  scroller.scrollTo({
    top: target,
    behavior: 'smooth',
  });
}

// Connect scroll and resize events to the conveyor state.
function useConveyorScroll({ pages, sectionRef, onSelectionChange }: AppConveyorProps) {
  const pageCount = pages.length;
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

    if (!section || !viewport || !track || !scroller || !pageCount) return;

    let frame = 0;
    let snapTimer: ReturnType<typeof setTimeout> | undefined;

    const updateConveyor = () => {
      frame = 0;

      const { cardPosition, visible: isVisible } = getScrollState(section, scroller, pageCount);
      const firstCard = track.firstElementChild as HTMLElement | null;

      if (!firstCard) return;

      const step = getCardStep(track, firstCard);

      // Leave a small preview of the previous card beside the selected card.
      const leftInset = Math.min(72, viewport.clientWidth * 0.15);
      track.style.transform = `translateX(${leftInset - cardPosition * step}px)`;

      // The card closest to the left edge becomes selected and gains full color.
      const index = Math.round(cardPosition);
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
      snapTimer = setTimeout(() => snapToNearestCard(section, scroller, pageCount), SNAP_DELAY_MS);
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
  }, [pageCount, sectionRef, onSelectionChange]);

  return { viewportRef, trackRef, selected, visible };
}

// Render the card row; the hook manages scrolling and selection.
export default function AppConveyor(props: AppConveyorProps) {
  const { pages, sectionRef } = props;
  const pageCount = pages.length;
  const { viewportRef, trackRef, selected, visible } = useConveyorScroll(props);

  // Clicking a card scrolls directly to its left-aligned position.
  const navigate = (index: number) => {
    const section = sectionRef.current;
    const scroller = section?.closest<HTMLElement>('.page-scroll-container');

    if (!section || !scroller) return;

    scroller.scrollTo({
      top: getCardScrollTop(section, scroller, index, pageCount),
      behavior: 'instant',
    });
  };

  if (!pageCount) return null;

  return (
    <div
      ref={viewportRef}
      className="relative h-full w-full overflow-hidden [mask-image:linear-gradient(to_right,black_90%,transparent)]"
    >
      <div ref={trackRef} className="flex h-full w-max items-center gap-5 sm:gap-8">
        {/* Keep every card in the row; only the selected video is allowed to play. */}
        {pages.map((page, index) => (
          <AppConveyorCard
            key={page.id}
            page={page}
            selected={index === selected}
            visible={visible}
            onSelect={() => navigate(index)}
          />
        ))}
      </div>
    </div>
  );
}
