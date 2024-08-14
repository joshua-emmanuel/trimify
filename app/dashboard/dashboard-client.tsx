'use client';

import { Button } from '@/components/ui/button';
import { logout } from '@/app/(form)/form-actions';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface DashboardClientProps {
  userEmail: String | null;
}

export default function DashboardClient({ userEmail }: DashboardClientProps) {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  if (!userEmail) {
    router.push('/login');
  }

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logout();
    router.push('/');
    setIsLoggingOut(false);
  };

  return (
    <div>
      <p>Hello {userEmail}</p>
      <Button
        className="disabled:cursor-not-allowed"
        disabled={isLoggingOut}
        onClick={() => handleLogout()}
      >
        {isLoggingOut ? 'Logging out...' : 'Log out'}
      </Button>
    </div>
  );
}
