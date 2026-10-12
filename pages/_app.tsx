import type { AppProps } from 'next/app';
import { Source_Sans_3, Space_Grotesk } from 'next/font/google';
import { useState } from 'react';
import Navigation from '@/components/layout/Navigation';
import PageImageLoader from '@/components/layout/PageImageLoader';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { AnimatePresence, motion } from 'motion/react';

const sourceSans = Source_Sans_3({ subsets: ['latin'], display: 'swap' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], display: 'swap' });

export default function App({ Component, pageProps, router }: AppProps) {
  const [settledPath, setSettledPath] = useState(router.pathname);
  const isSliding = settledPath !== router.pathname; // If isSliding is true, we are in the middle of a page transition, so hide scrollbar

  const direction = router.pathname === '/' ? -1 : 1; // Will slide in from the left for home page
  const slideVariants = {
    enter: (direction: number) => ({
      x: `${direction * 100}%`,
    }),
    center: { x: 0 },
    exit: (direction: number) => ({
      x: `${direction * -100}%`,
    }),
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <style jsx global>{`
        :root {
          --font-source-sans: ${sourceSans.style.fontFamily};
          --font-space-grotesk: ${spaceGrotesk.style.fontFamily};
        }
      `}</style>
      <div
        className={`relative h-screen w-screen overflow-hidden ${
          isSliding
            ? '[&_.page-scroll-container]:scrollbar-none [&_.page-scroll-container::-webkit-scrollbar]:hidden'
            : ''
        }`}
      >
        <Navigation />
        <AnimatePresence initial={false} mode="sync" custom={direction}>
          <motion.div
            key={router.pathname}
            className="page-scroll-container absolute inset-0 h-full w-full overflow-y-auto"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'tween' }}
            onAnimationComplete={(definition) => {
              if (definition === 'center') setSettledPath(router.pathname);
            }}
          >
            <PageImageLoader>
              <Component {...pageProps} />
            </PageImageLoader>
          </motion.div>
        </AnimatePresence>
      </div>
    </ThemeProvider>
  );
}
