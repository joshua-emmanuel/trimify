import type { Metadata } from 'next';
import { Instrument_Sans } from 'next/font/google';
import '@/styles/globals.css';
import { Toaster } from '@/components/ui/toaster';

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Scissors',
  description: 'URL Shortener',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={instrumentSans.className}>
        <Toaster />
        <>{children}</>
      </body>
    </html>
  );
}
