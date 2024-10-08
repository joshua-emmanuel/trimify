'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { Button } from '@/components/ui/button';
import { login } from '@/app/(form)/actions';
import { useFormState, useFormStatus } from 'react-dom';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

function LogInButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className="disabled:cursor-not-allowed w-full"
      disabled={pending}
    >
      {pending && (
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
      {pending ? 'Logging in...' : 'Log In'}
    </Button>
  );
}

export default function LogInPage() {
  const [formState, formAction] = useFormState(login, {
    message: '',
    error: null,
  });

  const formRef = useRef<HTMLFormElement>(null);

  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (formState.message === 'success') {
      formRef.current?.reset();
      toast({
        variant: 'success',
        title: 'Successful Log In',
        description:
          'You would be redirected to your dashboard in a few seconds',
      });
      router.push('/dashboard');
    } else if (formState.message === 'error') {
      console.log(formState.error);
      const errorMessage = formState.error?.split('AuthApiError: ')[1];
      if (errorMessage === 'Invalid login credentials') {
        toast({
          variant: 'error',
          title: errorMessage,
          description:
            'Please confirm that you are logging in with the right credentials',
        });
      } else if (errorMessage === 'Email not confirmed') {
        toast({
          title: errorMessage,
          description: 'Please check your inbox for a confirmation email',
        });
      }
    }
  }, [formState, router, toast]);

  return (
    <main className="min-h-[100vh] flex flex-col items-center justify-center">
      <form
        className="min-[425px]:w-[350px] w-[90%]"
        action={formAction}
        ref={formRef}
      >
        <Card>
          <CardHeader>
            <CardTitle className="font-extrabold text-3xl">Log In</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label className="text-sm" htmlFor="email">
                  Email
                </Label>
                <Input id="email" name="email" type="email" required />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label className="text-sm" htmlFor="password">
                  Password
                </Label>
                <Input id="password" name="password" type="password" required />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-start">
            <LogInButton />
            <p className="text-sm mt-2">
              <Link
                className="underline font-bold hover:no-underline"
                href="/reset-password"
              >
                Forgot Password?
              </Link>
            </p>
            <p className="text-sm mt-2">
              <span>Don&apos;t have an account? </span>
              <Link
                className="underline font-bold hover:no-underline"
                href="/signup"
              >
                Sign Up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </form>
    </main>
  );
}
