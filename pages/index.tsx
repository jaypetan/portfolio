import type { NextPage } from 'next';
import Head from 'next/head';
import BackgroundGradientAnimation from '@/components/BackgroundGradientAnimation';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Portfolio - Home</title>
        <meta name="description" content="Welcome to my portfolio" />
      </Head>
      <main className="h-[calc(100vh-70px)]">
        <BackgroundGradientAnimation>
          <div className="flex h-full w-full items-center justify-center px-6 text-center">
            <div className="max-w-3xl space-y-4">
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
        </BackgroundGradientAnimation>
      </main>
    </>
  );
};

export default Home;
