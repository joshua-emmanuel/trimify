import { createClient } from '@/utils/supabase/server';
import HomeClient from '@/app/home-client';

export default async function HomeServer() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  return <HomeClient user={data?.user} />;
}
