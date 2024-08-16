import type { Metadata } from 'next';
import { Instrument_Sans } from 'next/font/google';
import '@/styles/globals.css';
import { Toaster } from '@/components/ui/toaster';

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Trimify',
  description: 'Shorten. Share. Simplify',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${instrumentSans.className} antialiased text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900`}
      >
        <Toaster />
        <>{children}</>
      </body>
    </html>
  );
}
