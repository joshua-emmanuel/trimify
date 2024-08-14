import { createClient } from '@/utils/supabase/server';
import DashboardLayout from '@/app/dashboard/dashboard-layout';

export default async function DashboardServer({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  const userEmail = data?.user?.email as String | null;

  return <DashboardLayout userEmail={userEmail} children={children} />;
}
