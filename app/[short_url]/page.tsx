'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface RedirectPageProps {
  params: {
    short_url: string;
  };
}

interface UrlProps {
  original_url: string;
}

export default function RedirectPage({ params }: RedirectPageProps) {
  const router = useRouter();
  const { short_url } = params;

  useEffect(() => {
    const fetchUrl = async () => {
      try {
        const response = await fetch(`/api/shorten?short_url=${short_url}`);
        const data: UrlProps = await response.json();
        window.location.href = data.original_url;
      } catch (error) {
        router.push('/');
      }
    };

    fetchUrl();
  }, [short_url, router]);

  return null;
}
