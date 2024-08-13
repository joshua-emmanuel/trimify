'use client';

import { logout } from '@/app/(form)/form-actions';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { AuthError } from '@supabase/supabase-js';

type homeClientProps = {
  user: object | null;
};

export default function HomeClient({ user }: homeClientProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.refresh(); // To re-fetch the user state after logout
  };

  return (
    <main className="bg-white">
      <p>Home</p>
      {user ? (
        <form action={handleLogout}>
          <Button type="submit">Logout</Button>
        </form>
      ) : (
        <Button onClick={() => router.push('/login')}>Login</Button>
      )}
    </main>
  );
}
