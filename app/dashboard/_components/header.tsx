'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CircleUser, ScissorsLineDashed } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { logout } from '@/app/(form)/form-actions';

export default function DashboardHeader({
  userEmail,
}: {
  userEmail: string | null;
}) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logout();
    router.push('/');
    setIsLoggingOut(false);
  };

  return (
    <header className="flex h-20 items-centergap-4 border-b bg-background px-4 md:px-6 2xl:container">
      <nav className="flex gap-4 text-sm font-medium items-center md:gap-5 md:text-sm lg:gap-6 mr-auto justify-between">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 font-black text-slate-900 text-lg md:text-2xl tracking-tight dark:text-white"
        >
          <ScissorsLineDashed className="h-6 w-6" />
          <span className="">Trimify</span>
        </Link>
        <Link
          href="/dashboard"
          className="text-foreground transition-colors hover:text-foreground text-xs sm:text-sm mt-[0.1rem]"
        >
          Dashboard
        </Link>
      </nav>
      <div className="flex flex-col w-full items-end justify-center gap-4 md:ml-auto md:gap-2 lg:gap-4 ml-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
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
                {isLoggingOut && (
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-4 h-4 me-2 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                )}
                {isLoggingOut ? 'Logging out...' : 'Log out'}
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
