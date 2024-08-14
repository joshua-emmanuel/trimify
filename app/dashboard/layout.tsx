import DashboardServer from '@/app/dashboard/dashboard-server';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashboardServer>{children}</DashboardServer>;
}
