'use client';

import { CircleUser, ScissorsLineDashed } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { logout } from '@/app/(form)/form-actions';
import { useRouter } from 'next/navigation';
import { ReactNode, useState } from 'react';

interface DashboardLayoutProps {
  userEmail: String | null;
  children: ReactNode;
}

export default function DashboardLayout({
  children,
  userEmail,
}: DashboardLayoutProps) {
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
    <>
      <div className="flex min-h-screen w-full flex-col">
        <header className="flex h-20 items-centergap-4 border-b bg-background px-4 md:px-6 2xl:container">
          <nav className="flex gap-6 text-sm font-medium items-center md:gap-5 md:text-sm lg:gap-6 mr-auto justify-between">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 font-black text-slate-900 text-2xl tracking-tight dark:text-white"
            >
              <ScissorsLineDashed className="h-6 w-6" />
              <span className="">Scissors</span>
            </Link>
            <Link
              href="/dashboard"
              className="text-foreground transition-colors hover:text-foreground mt-1"
            >
              Dashboard
            </Link>
          </nav>
          <div className="flex flex-col w-full items-end justify-center gap-4 md:ml-auto md:gap-2 lg:gap-4 ml-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <CircleUser className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="p-2" align="end">
                <DropdownMenuLabel>
                  {userEmail?.split('@')[0]}&apos;s dashboard
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="p-2">
                  <Button
                    className="disabled:cursor-not-allowed w-full"
                    disabled={isLoggingOut}
                    onClick={() => handleLogout()}
                  >
                    {isLoggingOut ? 'Logging out...' : 'Log out'}
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        {children}
      </div>
    </>
  );
}
