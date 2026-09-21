import { useRef, useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export default function HoverFollow({
  children,
  follower,
}: {
  children: React.ReactNode;
  follower: React.ReactNode;
}) {
  const followerElRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const setPosition = useCallback((x: number, y: number) => {
    const follower = followerElRef.current;
    if (!follower) return;

    const offsetY = -40;
    const margin = 16;
    const width = follower.offsetWidth || 320;
    const height = follower.offsetHeight || 220;
    const minX = width / 2 + margin;
    const maxX = window.innerWidth - width / 2 - margin;
    const clampedX = Math.min(Math.max(x, minX), maxX);
    const clampedY = Math.max(y + offsetY, height / 2 + margin);

    follower.style.transform = `translate(${clampedX}px, ${clampedY}px) translate(-50%, -100%)`;
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => setPosition(x, y));
    },
    [setPosition],
  );

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent) => {
      if (followerElRef.current) {
        followerElRef.current.style.display = 'block';
      }
      setPosition(e.clientX, e.clientY);
    },
    [setPosition],
  );

  const handleMouseLeave = useCallback(() => {
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
      className="pointer-events-none fixed left-0 top-0 z-9999 hidden"
      aria-hidden="true"
    >
      {follower}
    </div>
  );

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {mounted && typeof document !== 'undefined' ? createPortal(portal, document.body) : null}
    </div>
  );
}
