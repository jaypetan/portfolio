import { useRef, useCallback } from 'react';
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

  const setPosition = useCallback((x: number, y: number) => {
    if (followerElRef.current) {
      followerElRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    }
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
      style={{ transform: 'translate(-9999px, -9999px)' }}
      className="pointer-events-none fixed left-0 translate-x-[50%] -top-8 z-9999 hidden"
      aria-hidden
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
      {createPortal(portal, document.body)}
    </div>
  );
}
