import type { AppProps } from 'next/app';
import { useState } from 'react';
import Navigation from '@/components/layout/Navigation';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

export default function App({ Component, pageProps, router }: AppProps) {
  const reduceMotion = useReducedMotion();
  const [settledPath, setSettledPath] = useState(router.pathname);
  const isSliding = settledPath !== router.pathname;

  const direction = router.pathname === '/' ? -1 : 1; // Will slide in from the left for home page
  const slideVariants = {
    enter: (direction: number) => ({
      x: reduceMotion ? 0 : `${direction * 100}%`,
    }),
    center: { x: 0 },
    exit: (direction: number) => ({
      x: reduceMotion ? 0 : `${direction * -100}%`,
    }),
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
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
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </div>
    </ThemeProvider>
  );
}
