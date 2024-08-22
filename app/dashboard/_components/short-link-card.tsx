import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Copy, Edit, Edit2 } from 'lucide-react';
import { ensureProtocol } from '@/utils/utils';
import Link from 'next/link';
import { EditShortLinkDialog } from '@/app/dashboard/_components/edit-short-link-dialog';

type LinkProps = {
  title: string;
  created_at: string;
  id: string;
  original_url: string;
  short_url: string;
  user_id: string;
};

export default function ShortLinkCard({
  link,
  refetchLinks,
}: {
  link: LinkProps;
  refetchLinks: () => void;
}) {
  const { toast } = useToast();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const shortLink = `${siteUrl}/${link.short_url}`;

  const copyShortLink = () => {
    navigator.clipboard.writeText(shortLink);
    toast({
      variant: 'success',
      title: 'Short Link Copied',
      description: 'Feel free to share it online',
    });
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-slate-500 font-medium flex items-center justify-between">
          <p>{link.title || 'Short Link'}</p>
          <Button
            variant="ghost"
            onClick={copyShortLink}
            type="submit"
            size="sm"
            className="flex items-center justify-center"
          >
            <span className="sr-only">Copy</span>
            <Copy className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm sm:text-xl text-pretty break-words whitespace-normal max-w-[100%] font-bold mb-2">
          {shortLink}
        </p>
        <p className="text-xs text-slate-500 mb-3 truncate">
          Original Url: {ensureProtocol(link.original_url)}
        </p>
        <div className="flex gap-2">
          <Link
            className="h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 w-full"
            href={`/dashboard/analytics/${link.short_url}`}
          >
            <span>View Analytics</span>
          </Link>
          <EditShortLinkDialog link={link} refetchLinks={refetchLinks} />
        </div>
      </CardContent>
    </Card>
  );
}
