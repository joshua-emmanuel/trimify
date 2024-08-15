'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LinkAnalyticsCardSkeletons } from '@/components/ui/loading-skeletons';
import { CalendarFold, MapPin, MousePointerClick } from 'lucide-react';

interface LinkDetailsProps {
  title?: string;
  created_at?: string;
  id: string;
  original_url: string;
  short_url: string;
  user_id?: string;
  click_count?: string;
  last_accessed_at?: string;
  last_accessed_ip?: string;
}

interface LocationProps {
  country_name?: string;
  city?: string;
}

export default function DashboardAnalytics() {
  const params = useParams();
  const { short_url } = params;

  const [linkDetails, setLinkDetails] = useState<LinkDetailsProps | null>(null);
  const [location, setLocation] = useState<LocationProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  useEffect(() => {
    setLoading(true);
    const fetchLinks = async () => {
      const supabase = createClient();

      const { data, error } = await supabase
        .from('links')
        .select('*')
        .eq('short_url', short_url)
        .single();

      if (!error) {
        setLinkDetails(data);
      }
    };

    fetchLinks();
  }, [short_url]);

  useEffect(() => {
    async function getGeoLocation(ipAddress: any) {
      try {
        const response = await fetch(`https://ipapi.co/${ipAddress}/json/`);
        const data = await response.json();
        setLocation(data);
      } catch (error) {
        setLoading(false);
        return null;
      }
    }

    getGeoLocation(linkDetails?.last_accessed_ip);
  }, [linkDetails]);

  useEffect(() => {
    if (location) {
      setLoading(false);
    }
  }, [location]);

  return (
    <div>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            {siteUrl}/{short_url} stats
          </h2>
          {loading ? (
            <div
              role="status"
              className={`before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent relative overflow-hidden h-3 w-[30%] rounded-md bg-gray-100 mb-4 animate-shimmer shadow-sm`}
            >
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <p className="text-slate-600 font-medium text-sm">
              Original Url: {linkDetails?.original_url}
            </p>
          )}
        </div>
        {loading ? (
          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <LinkAnalyticsCardSkeletons />
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            {linkDetails?.click_count && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                  <CardTitle className="text-sm font-medium text-slate-600">
                    Total Clicks
                  </CardTitle>
                  <MousePointerClick className="h-4 w-4 text-slate-600" />
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">
                    {linkDetails?.click_count}
                  </p>
                </CardContent>
              </Card>
            )}
            {linkDetails?.last_accessed_at && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                  <CardTitle className="text-sm font-medium text-slate-600">
                    Last Accessed Date
                  </CardTitle>
                  <CalendarFold className="h-4 w-4 text-slate-600" />
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold break-words">
                    {linkDetails?.last_accessed_at.split('at')[0]}
                  </p>
                </CardContent>
              </Card>
            )}
            {location?.city && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                  <CardTitle className="text-sm font-medium text-slate-600">
                    Last Accessed City
                  </CardTitle>
                  <MapPin className="h-4 w-4 text-slate-600" />
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold break-words">
                    {location?.city}
                  </p>
                </CardContent>
              </Card>
            )}
            {location?.country_name && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                  <CardTitle className="text-sm font-medium text-slate-600">
                    Last Accessed Country
                  </CardTitle>
                  <MapPin className="h-4 w-4 text-slate-600" />
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold break-words">
                    {location?.country_name}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
