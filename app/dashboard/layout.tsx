import DashboardHeader from '@/app/dashboard/_components/header';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  const userEmail = data?.user?.email as string | null;

  if (!userEmail) {
    revalidatePath('/', 'layout');
    redirect('/');
  }

  return (
    <>
      <div className="flex min-h-screen w-full flex-col">
        <DashboardHeader userEmail={userEmail} />
        {children}
      </div>
    </>
  );
}
