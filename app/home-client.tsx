'use client';

// import { logout } from '@/app/(form)/form-actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScissorsLineDashed } from 'lucide-react';
import Link from 'next/link';
import { FormEvent, useRef, useState } from 'react';

type homeClientProps = {
  user: object | null;
};

export default function HomeClient({ user }: homeClientProps) {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const submitBtnRef = useRef<HTMLButtonElement>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    submitBtnRef.current?.setAttribute('disabled', 'true');
    try {
      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ originalUrl }),
      });
      const data = await response.json();
      setShortUrl(data.shortUrl);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    submitBtnRef.current?.removeAttribute('disabled');
  };

  return (
    <div className="xl:container mx-auto px-4">
      <header className="flex justify-between items-center my-8 relative">
        <Link
          href="/"
          className="flex items-center gap-2 font-black text-slate-900 md:text-2xl text-xl tracking-tight dark:text-white"
        >
          <ScissorsLineDashed className="h-6 w-6" />
          <span className="">Scissors</span>
        </Link>
        {user ? (
          <Link
            className="h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90"
            href="/dashboard"
          >
            Dashboard
          </Link>
        ) : (
          <div className="flex gap-2 items-center">
            <Link
              className="h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90"
              href="/login"
            >
              Login
            </Link>
            <Link
              className="h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50"
              href="/signup"
            >
              Sign Up
            </Link>
          </div>
        )}
      </header>

      <main>
        <section className="pt-20">
          <div className="text-center">
            <h1 className="text-slate-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight dark:text-white ">
              Shorten That Link&nbsp;in&nbsp;a&nbsp;Blink!
            </h1>
            <p className="max-w-lg mx-auto mt-4 mb-8">
              Transform long, messy URLs into sleek, shareable links instantly.
              Simplify your sharing game with ease and style.
            </p>
          </div>
          <div>
            <form className="max-w-xs mx-auto" onSubmit={handleSubmit}>
              <Input
                type="url"
                name="url"
                id="url"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                placeholder="Your long URL goes here"
                required
              />
              <Button
                type="submit"
                className="w-full mt-4 disabled:cursor-not-allowed"
                ref={submitBtnRef}
              >
                {loading ? 'Shortening...' : 'Make it short'}
              </Button>
            </form>
            {shortUrl && (
              <p className="text-center text-slate-900  mt-4">
                Your short URL:{' '}
                <Link
                  className="font-bold underline hover:no-underline"
                  href={`/${shortUrl}`}
                >{`${siteUrl}/${shortUrl}`}</Link>
              </p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
