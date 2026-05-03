import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AppIcon from '@/components/ui/AppIcon';

export default function Navigation() {
  const router = useRouter();
  const [isPinnedTop, setIsPinnedTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsPinnedTop(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`z-50 fixed left-1/2 -translate-x-1/2 min-w-[20rem] ${
        isPinnedTop ? 'top-12' : 'bottom-12'
      }`}
    >
      <div className="mx-auto flex items-center justify-between px-4 py-4 glassmorphism">
        {/* Work Experiences */}
        <ul className="flex gap-4 list-none">
          <li>
            <AppIcon iconAlt="Work" href="/work" />
          </li>
          <li>
            <AppIcon iconAlt="About" href="/about" />
          </li>
        </ul>
        {/* Projects */}
        <ul className="flex gap-4 list-none border-l-2 border-white/10 pl-8">
          <li>
            <AppIcon iconAlt="Projects" href="/projects" />
          </li>
        </ul>
      </div>
    </nav>
  );
}
