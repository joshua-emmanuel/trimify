import DashboardServer from '@/app/dashboard/dashboard-server';

export default function DashboardRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashboardServer>{children}</DashboardServer>;
}
