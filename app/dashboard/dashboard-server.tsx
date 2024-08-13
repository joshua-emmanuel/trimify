import { createClient } from '@/utils/supabase/server';
import DashboardClient from '@/app/dashboard/dashboard-client';

export default async function DashboardServer() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  const userEmail = data?.user?.email as String | null;

  return <DashboardClient userEmail={userEmail} />;
}
