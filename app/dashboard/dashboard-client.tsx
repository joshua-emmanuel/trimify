'use client';

import { Button } from '@/components/ui/button';
import { logout } from '@/app/(form)/form-actions';
import { useRouter } from 'next/navigation';

interface DashboardClientProps {
  userEmail: String | null;
}

export default function DashboardClient({ userEmail }: DashboardClientProps) {
  const router = useRouter();

  if (!userEmail) {
    router.push('/login');
  }

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <div>
      <p>Hello {userEmail}</p>
      <Button onClick={() => handleLogout()}>Log Out</Button>
    </div>
  );
}
