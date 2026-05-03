import Head from 'next/head';
import Link from 'next/link';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 - Page Not Found</title>
      </Head>
      <main className="min-h-[calc(100vh-70px)] flex flex-col items-center justify-center px-6 py-12 text-center">
        <h1 className="text-6xl font-bold text-sky-400 mb-4">404</h1>
        <p className="text-slate-300 mb-8">The page you are looking for does not exist.</p>
        <Link
          href="/"
          className="px-4 py-2 rounded-md border border-sky-400 text-sky-400 hover:bg-sky-400 hover:text-slate-900 transition-colors"
        >
          Back Home
        </Link>
      </main>
    </>
  );
}
