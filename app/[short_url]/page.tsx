'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

interface RedirectPageProps {
  params: {
    short_url: string;
  };
}

export default function RedirectPage({ params }: RedirectPageProps) {
  const router = useRouter();
  const { short_url } = params;

  useEffect(() => {
    const supabase = createClient();

    const fetchUrl = async () => {
      const { data, error } = await supabase
        .from('links')
        .select('original_url')
        .eq('short_url', short_url)
        .single();

      if (error || !data) {
        router.push('/');
      } else {
        window.location.href = data.original_url;
      }
    };

    fetchUrl();
  }, [short_url, router]);

  return null;
}
