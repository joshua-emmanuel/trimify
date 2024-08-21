import Link from 'next/link';

export default function ErrorPage() {
  return (
    <div className="m-2">
      <h2 className="text-red-800 font-semibold text-lg">An error occurred</h2>
      <Link
        className="h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90"
        href="/"
      >
        Go back home
      </Link>
    </div>
  );
}
