import type { NextPage } from 'next';
import Head from 'next/head';
import LiquidEther from '@/components/backgrounds/LiquidEtherBackground';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Portfolio - Home</title>
        <meta name="description" content="Welcome to my portfolio" />
      </Head>
      <main className="h-screen relative flex">
        <LiquidEther
          colors={['#06B6D4', '#3B82F6', '#7C3AED']}
          mouseForce={11}
          cursorSize={100}
          isViscous
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={3}
          resolution={0.5}
          isBounce={false}
          autoDemo
          autoSpeed={0.8}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
        <div className="flex flex-col overflow-y-auto absolute top-0 left-0 z-50 pointer-events-auto h-screen w-full items-center justify-start px-6 text-center">
          <div className="max-w-3xl h-screen flex-shrink-0">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-200/80">
              Portfolio Preview
            </p>
            <h1 className="text-4xl font-bold text-white drop-shadow-lg sm:text-5xl md:text-6xl">
              Hello World
            </h1>
            <p className="text-base text-slate-300 sm:text-lg">
              The 3D scene has been removed for now, leaving a cleaner animated background.
            </p>
          </div>
          <div className="max-w-3xl h-screen flex-shrink-0">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-200/80">
              Portfolio Preview
            </p>
            <h1 className="text-4xl font-bold text-white drop-shadow-lg sm:text-5xl md:text-6xl">
              Hello World
            </h1>
            <p className="text-base text-slate-300 sm:text-lg">
              The 3D scene has been removed for now, leaving a cleaner animated background.
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
