import type { NextPage } from 'next';
import Head from 'next/head';
import LiquidEther from '@/components/backgrounds/LiquidEtherBackground';
import HomePage from '@/components/sections/home/HomePage';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Portfolio - Home</title>
        <meta name="description" content="Welcome to my portfolio" />
      </Head>
      <main className="h-screen relative flex">
        {/* Background */}
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
        {/* Main Content */}
        <HomePage />
      </main>
    </>
  );
};

export default Home;
