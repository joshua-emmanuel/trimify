'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import ShortLinkCard from '@/app/dashboard/_components/short-link-card';
import { LinkCardSkeletons } from '@/components/ui/loading-skeletons';

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

      setLinks(data);
      setLoading(false);
    };

    fetchLinks();
  }, []);
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 2xl:container">
      <div className="grid gap-4 md:gap-8">
        <Card className="xl:col-span-2 border-none shadow-none">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle className="text-lg md:text-2xl">Your Links</CardTitle>
            </div>
            <Link
              className="h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 ml-auto gap-1 text-xs md:text-sm"
              href="/"
            >
              Shorten New Link
            </Link>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4 mt-4">
                <LinkCardSkeletons />
              </div>
            ) : links.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4 mt-4">
                {links.length > 0 &&
                  links.map((link) => (
                    <ShortLinkCard key={link.id} link={link} />
                  ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center my-10">
                <p>No Links found</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
