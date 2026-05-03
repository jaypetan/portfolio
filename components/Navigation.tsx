import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

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
      className={`fixed left-1/2 z-50 w-[min(100%-1rem,72rem)] -translate-x-1/2 rounded-full border border-white/10 bg-slate-950/70 px-6 py-4 shadow-2xl shadow-black/30 backdrop-blur-xl transition-all duration-500 ease-out sm:w-[min(100%-2rem,72rem)] ${
        isPinnedTop ? 'top-4' : 'bottom-4'
      }`}
    >
      <div className="mx-auto flex items-center justify-between">
        <Link
          href="/"
          className={`text-2xl font-bold transition-colors ${
            router.pathname === '/' ? 'text-sky-400' : 'text-sky-400 hover:text-sky-500'
          }`}
        >
          Portfolio
        </Link>
        <ul className="flex gap-8 list-none">
          <li>
            <Link
              href="/"
              className={`font-medium transition-colors ${
                router.pathname === '/'
                  ? 'text-sky-400 border-b-2 border-sky-400 pb-1'
                  : 'text-slate-400 hover:text-sky-400'
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className={`font-medium transition-colors ${
                router.pathname === '/about'
                  ? 'text-sky-400 border-b-2 border-sky-400 pb-1'
                  : 'text-slate-400 hover:text-sky-400'
              }`}
            >
              About
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
