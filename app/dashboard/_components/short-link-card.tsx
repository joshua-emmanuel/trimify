import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LinkIcon } from 'lucide-react';
import Link from 'next/link';

interface LinkProps {
  title: string;
  created_at: string;
  id: string;
  original_url: string;
  short_url: string;
  user_id: string;
}

export default function ShortLinkCard({ link }: { link: LinkProps }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-slate-500 font-medium">
          {link.title || 'Short Link'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm sm:text-xl text-pretty break-words whitespace-normal max-w-[100%] font-bold mb-2">
          {`${siteUrl}/${link.short_url}`}
        </p>
        <p className="text-xs text-slate-500 mb-3 truncate">
          Orginal Url: {`https://${link.original_url}`}
        </p>
        <Link
          className="h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 w-full"
          href={`/dashboard/analytics/${link.short_url}`}
        >
          <span>View Analytics</span>
          <LinkIcon className="h-4 w-4 ml-2" />
        </Link>
      </CardContent>
    </Card>
  );
}
