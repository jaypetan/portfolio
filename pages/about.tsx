import type { NextPage } from 'next'
import Head from 'next/head'

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
          <p className="text-lg text-slate-300 leading-relaxed mb-8">
            I'm a passionate developer creating interactive web experiences. 
            I specialize in modern web technologies including Next.js, React, and 3D graphics with Three.js.
          </p>
          <section className="mt-12">
            <h2 className="text-3xl font-bold text-sky-400 mb-6">Skills</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {['React & Next.js', 'Three.js & React Three Fiber', 'TypeScript', 'Web Design', '3D Modeling', 'Tailwind CSS'].map((skill) => (
                <li 
                  key={skill}
                  className="p-4 bg-[#1e293b]/60 border border-sky-400/30 rounded-lg text-slate-300 hover:bg-[#1e293b] hover:border-sky-400 hover:text-sky-400 transition-all transform hover:-translate-y-0.5"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </>
  )
}

export default About
