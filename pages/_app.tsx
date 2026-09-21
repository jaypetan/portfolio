import type { AppProps } from 'next/app';
import Navigation from '@/components/layout/Navigation';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="relative h-screen w-screen overflow-hidden">
        <Navigation />
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
}
