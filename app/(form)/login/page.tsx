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
import { login } from '@/app/(form)/form-actions';
import { useFormState } from 'react-dom';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
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
        description: 'You would be redirected to the homepage in a few seconds',
      });
      router.push('/');
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
      <form action={formAction} ref={formRef}>
        <Card className="sm:w-[350px] w-100">
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
            <Button>Log In</Button>
            <p className="text-sm mt-2">
              <span>Don&apos;t have an account?</span>
              <Link className="underline font-bold" href="/signup">
                Sign Up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </form>
    </main>
  );
}
