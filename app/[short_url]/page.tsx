'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';

type UrlType = {
  original_url: string;
};

export default function RedirectPage({
  params,
}: {
  params: {
    short_url: string;
  };
}) {
  const { toast } = useToast();
  const router = useRouter();
  const { short_url } = params;

  useEffect(() => {
    const fetchUrl = async () => {
      try {
        const response = await fetch(`/api/shorten?short_url=${short_url}`);
        if (!response.ok) {
          if (response.status === 404) {
            toast({
              variant: 'error',
              title: 'Short Url Not Found',
              description: 'You will be redirected to the homepage shortly',
            });
            router.push('/');
            return;
          }
          toast({
            variant: 'error',
            title: 'An error occured',
            description: 'You will be redirected to the homepage shortly',
          });
          router.push('/');
          return;
        }
        const data: UrlType = await response.json();
        window.location.href = data.original_url;
      } catch (error) {
        router.push('/');
      }
    };

    fetchUrl();
  }, [short_url, router]);

  return null;
}
