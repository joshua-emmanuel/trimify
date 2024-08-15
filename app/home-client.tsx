'use client';

// import { logout } from '@/app/(form)/form-actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScissorsLineDashed } from 'lucide-react';
import Link from 'next/link';
import { FormEvent, useRef, useState } from 'react';
import { Copy } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Label } from '@radix-ui/react-label';

type homeClientProps = {
  user: object | null;
};

export default function HomeClient({ user }: homeClientProps) {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const shortLink = `${siteUrl}/${shortUrl}`;

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

  const copyShortLink = () => {
    navigator.clipboard.writeText(shortLink);
    toast({
      variant: 'success',
      title: 'Short Link Copied',
      // description:
      //   'Please confirm that you are logging in with the right credentials',
    });
  };

  return (
    <div className="xl:container mx-auto px-4">
      <header className="flex justify-between items-center my-8 relative">
        <Link
          href="/"
          className="flex items-center gap-2 font-black text-slate-900 text-2xl tracking-tight dark:text-white"
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
                {loading ? (
                  <>
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="inline w-4 h-4 me-2 text-white animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      />
                    </svg>
                    <span>Shortening...</span>
                  </>
                ) : (
                  'Make it short'
                )}
              </Button>
            </form>
            {shortUrl && (
              <div className="flex items-center justify-center space-x-2 mx-auto mt-4">
                <div className="">
                  <Label htmlFor="link" className="sr-only">
                    Link
                  </Label>
                  <Input
                    className="min-w-[18rem]"
                    id="link"
                    defaultValue={'https://scissors-phi.vercel.app/aSd3w2'}
                    readOnly
                  />
                </div>
                <Button
                  onClick={copyShortLink}
                  type="submit"
                  size="sm"
                  className="px-3"
                >
                  <span className="sr-only">Copy</span>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
