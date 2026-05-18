import type { AppProps } from 'next/app';
import Navigation from '@/components/layout/Navigation';
import './globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <Navigation />
      <Component {...pageProps} />
    </div>
  );
}
