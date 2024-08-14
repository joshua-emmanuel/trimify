'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

type FormState = {
  message: string;
  error: string | null;
};

export async function login(prevState: FormState, formData: FormData) {
  const supabase = createClient();

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return {
      message: 'error',
      error: String(error),
    };
  }

  return {
    message: 'success',
    error: null,
  };
}

export async function signup(prevState: FormState, formData: FormData) {
  const supabase = createClient();

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const getURL = () => {
    let url =
      process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
      process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
      'http://localhost:3000/';
    // Make sure to include `https://` when not localhost.
    url = url.startsWith('http') ? url : `https://${url}`;
    // Make sure to include a trailing `/`.
    url = url.endsWith('/') ? url : `${url}/`;
    return url;
  };

  const { error } = await supabase.auth.signUp({
    ...data,
    options: {
      emailRedirectTo: getURL(),
    },
  });

  if (error) {
    return {
      message: 'error',
      error: String(error),
    };
  }

  return {
    message: 'success',
    error: null,
  };
}

export async function logout() {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();
  const { data } = await supabase.auth.getUser();
  console.log('user:', data);

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/');
}
