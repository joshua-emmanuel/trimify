'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useParams } from 'next/navigation';

interface LinkDetailsProps {
  title?: string;
  created_at?: string;
  id: string;
  original_url: string;
  short_url: string;
  user_id?: string;
  click_count?: string;
  last_accessed_at?: string;
  last_accessed_city?: string;
  last_accessed_country?: string;
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

  useEffect(() => {
    const fetchLinks = async () => {
      const supabase = createClient();

      const { data, error } = await supabase
        .from('links')
        .select('*')
        .eq('short_url', short_url)
        .single();

      if (error) {
        console.log(error);
        return;
      }

      setLinkDetails(data);
    };

    fetchLinks();
  }, [short_url]);

  useEffect(() => {
    async function getGeoLocation(ipAddress: any) {
      try {
        const response = await fetch(`https://ipapi.co/${ipAddress}/json/`);
        const data = await response.json();
        console.log(data);
        setLocation(data);
      } catch (error) {
        console.error('Error fetching geolocation:', error);
        return null;
      }
    }

    getGeoLocation(linkDetails?.last_accessed_ip);
  }, [linkDetails]);

  return (
    <div>
      <h1>Your Shortened Link</h1>
      <p>Click Count: {linkDetails?.click_count}</p>
      <p>Short Url: {linkDetails?.short_url}</p>
      <p>Last Accessed At: {linkDetails?.last_accessed_at}</p>
      <p>Last Accessed City: {location?.city}</p>
      <p>Last Accessed Country: {location?.country_name}</p>
      <p>Last Accessed Ip: {linkDetails?.last_accessed_ip}</p>
    </div>
  );
}
