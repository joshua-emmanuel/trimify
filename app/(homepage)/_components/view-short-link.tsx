import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Copy } from 'lucide-react';

type ViewShortLinkProps = {
  shortUrl: string | undefined;
};

export default function ViewShortLink({ shortUrl }: ViewShortLinkProps) {
  const { toast } = useToast();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const shortLink = `${siteUrl}/${shortUrl}`;

  const copyShortLink = () => {
    navigator.clipboard.writeText(shortLink);
    toast({
      variant: 'success',
      title: 'Short Link Copied',
      description: 'Feel free to share it online',
    });
  };

  return (
    <>
      {shortUrl && (
        <div className="flex items-center justify-center space-x-2 mx-auto mt-4">
          <div className="">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              className="min-w-[18rem]"
              id="link"
              value={shortLink}
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
    </>
  );
}
