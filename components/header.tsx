import Link from 'next/link';
import { ScissorsLineDashed } from 'lucide-react';

type HeaderProps = {
  user: object | null;
};

export default function Header({ user }: HeaderProps) {
  return (
    <header className="flex justify-between items-center my-5 relative">
      <Link
        href="/"
        className="flex items-center justify-center gap-2 font-black text-slate-900 text-lg md:text-2xl tracking-tight dark:text-white"
      >
        <ScissorsLineDashed className="h-6 w-6" />
        <span className="">Trimify</span>
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
  );
}
