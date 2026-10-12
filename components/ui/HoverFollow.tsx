import { Fragment, useRef, useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export default function HoverFollow({
  children,
  follower,
  preloadImages = false,
}: {
  children: React.ReactNode;
  follower: React.ReactNode;
  preloadImages?: boolean;
}) {
  const followerElRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [followerKey, setFollowerKey] = useState(0);

  useEffect(() => {
    // Portals need document.body, which is only available in the browser.
    setMounted(true);
    return () => {
      // Cancel pending movement on unmount.
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Set the position of the floating preview
  const setPosition = useCallback((x: number, y: number) => {
    const follower = followerElRef.current;
    if (!follower) return;

    const offsetY = -40;
    const margin = 16;
    const width = follower.offsetWidth || 320;
    const height = follower.offsetHeight || 220;
    // Keep the preview within the left and right screen edges.
    const minX = width / 2 + margin;
    const maxX = window.innerWidth - width / 2 - margin;
    const clampedX = Math.min(Math.max(x, minX), maxX);
    const clampedY = Math.max(y + offsetY, height / 2 + margin);

    // Center the preview above the pointer.
    follower.style.transform = `translate(${clampedX}px, ${clampedY}px) translate(-50%, -100%)`;
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      // Ignore touch input, including on devices that also have a mouse.
      if (e.pointerType !== 'mouse') return;
      const { clientX: x, clientY: y } = e;
      // Apply only the latest pointer position on the next animation frame.
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => setPosition(x, y));
    },
    [setPosition],
  );

  const handlePointerEnter = useCallback(
    (e: React.PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      // Remount preview content so its animations restart on each hover.
      setFollowerKey((currentKey) => currentKey + 1);
      if (followerElRef.current) {
        followerElRef.current.style.display = 'block';
      }
      setPosition(e.clientX, e.clientY);
    },
    [setPosition],
  );

  const hideFollower = useCallback(() => {
    // Stop pending movement before hiding the preview.
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (followerElRef.current) {
      followerElRef.current.style.display = 'none';
    }
  }, []);

  const portal = (
    <div
      ref={followerElRef}
      data-preload-images={preloadImages ? '' : undefined}
      className="pointer-events-none fixed left-0 top-0 z-9999 hidden"
      aria-hidden="true"
    >
      <Fragment key={followerKey}>{follower}</Fragment>
    </div>
  );

  return (
    <div
      data-preload-owner={preloadImages ? '' : undefined}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={hideFollower}
      onPointerCancel={hideFollower}
      onPointerDown={(event) => {
        if (event.pointerType !== 'mouse') hideFollower();
      }}
      onClick={hideFollower}
    >
      {children}
      {/* Render outside the layout to avoid clipping. Touch events never show it. */}
      {mounted ? createPortal(portal, document.body) : null}
    </div>
  );
}
