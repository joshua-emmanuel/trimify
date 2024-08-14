'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import Loading from '@/app/dashboard/loading';
import ShortLinkCard from '@/app/dashboard/_components/short-link-card';

interface Link {
  title: string;
  created_at: string;
  id: string;
  original_url: string;
  short_url: string;
  user_id: string;
}

export default function DashboardPage() {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  useEffect(() => {
    const fetchLinks = async () => {
      setLoading(true);
      const supabase = createClient();

      const { data: authData } = await supabase.auth.getUser();
      const user = authData.user;
      const { data, error }: { data: [] | any; error: any } = await supabase
        .from('links')
        .select('*')
        .eq('user_id', user?.id);

      if (error) {
        console.log(error);
        return;
      }

      console.log(data);
      setLinks(data);
      setLoading(false);
    };

    fetchLinks();
  }, []);
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 2xl:container">
      <div className="grid gap-4 md:gap-8">
        <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle className="text-lg md:text-2xl">Your Links</CardTitle>
            </div>
            <Button className="ml-auto gap-1 text-xs md:text-sm">
              Shorten New Link
            </Button>
          </CardHeader>
          {loading ? (
            <Loading />
          ) : links.length > 0 ? (
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4 mt-4">
                {links.length > 0 &&
                  links.map((link) => (
                    <ShortLinkCard key={link.id} link={link} />
                  ))}
              </div>
            </CardContent>
          ) : (
            <div>
              <p>No Links found</p>
            </div>
          )}
        </Card>
      </div>
    </main>
  );
}
