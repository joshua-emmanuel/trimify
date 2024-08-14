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
import { signup } from '@/app/(form)/form-actions';
import { useFormState, useFormStatus } from 'react-dom';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { redirect } from 'next/navigation';

function SignUpButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className="disabled:cursor-not-allowed w-full"
      disabled={pending}
    >
      {pending ? 'Signing up...' : 'Sign Up'}
    </Button>
  );
}

export default function SignUpPage() {
  const [formState, formAction] = useFormState(signup, {
    message: '',
    error: null,
  });

  const formRef = useRef<HTMLFormElement>(null);

  const { toast } = useToast();

  useEffect(() => {
    if (formState.message === 'success') {
      formRef.current?.reset();
      toast({
        variant: 'success',
        title: 'Successful Sign Up',
        description: 'Please check your inbox for a confirmation email',
      });
      redirect('/login');
    } else if (formState.message === 'error') {
      console.log(formState.error);
      toast({
        variant: 'error',
        title: 'An error occured',
        description: 'Please try again later',
      });
    }
  }, [formState, toast]);

  return (
    <main className="min-h-[100vh] flex flex-col items-center justify-center">
      <form action={formAction} ref={formRef}>
        <Card className="sm:w-[350px] w-100">
          <CardHeader>
            <CardTitle className="font-extrabold text-3xl">Sign Up</CardTitle>
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
            <SignUpButton />
            <p className="text-sm mt-2">
              Already have an account?{' '}
              <Link
                className="underline font-bold hover:no-underline"
                href="/login"
              >
                Log In
              </Link>
            </p>
          </CardFooter>
        </Card>
      </form>
    </main>
  );
}
