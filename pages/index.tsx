import type { NextPage } from 'next'
import Head from 'next/head'
import dynamic from 'next/dynamic'

// Dynamically import the 3D scene to avoid SSR issues
const Scene3D = dynamic(() => import('@/components/Scene3D'), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center w-full h-full text-slate-300">Loading 3D Scene...</div>,
})

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Portfolio - Home</title>
        <meta name="description" content="Welcome to my portfolio" />
      </Head>
      <main className="min-h-[calc(100vh-70px)] flex flex-col items-center justify-center px-6 py-12">
        <div className="text-center mb-12 animate-fadeIn">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-sky-400 to-sky-500 bg-clip-text text-transparent">
            Welcome to My Portfolio Test
          </h1>
          <p className="text-xl text-slate-300">
            I create beautiful 3D web experiences with Next.js and React Three Fiber
          </p>
        </div>
        <div className="w-full max-w-2xl h-96 rounded-lg overflow-hidden shadow-2xl border border-slate-700/20">
          <Scene3D />
        </div>
      </main>
    </>
  )
}

export default Home
