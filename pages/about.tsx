import type { NextPage } from 'next';
import Head from 'next/head';

const About: NextPage = () => {
  return (
    <>
      <Head>
        <title>Portfolio - About</title>
        <meta name="description" content="Learn more about me" />
      </Head>
      <main className="min-h-[calc(100vh-70px)] px-6 py-12 animate-fadeIn">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-sky-400 to-sky-500 bg-clip-text text-transparent">
            About Me
          </h1>
        </div>
      </main>
    </>
  );
};

export default About;
