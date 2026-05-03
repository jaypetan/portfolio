import type { NextPageContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';

type ErrorProps = {
  statusCode?: number;
};

function ErrorPage({ statusCode }: ErrorProps) {
  const code = statusCode ?? 500;

  return (
    <>
      <Head>
        <title>{code} - Something Went Wrong</title>
      </Head>
      <main className="min-h-[calc(100vh-70px)] flex flex-col items-center justify-center px-6 py-12 text-center">
        <h1 className="text-5xl font-bold text-sky-400 mb-4">{code}</h1>
        <p className="text-slate-300 mb-8">
          {code === 404 ? 'Page not found.' : 'An unexpected error occurred.'}
        </p>
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

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res?.statusCode ?? err?.statusCode ?? 404;
  return { statusCode };
};

export default ErrorPage;
