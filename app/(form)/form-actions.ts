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
      process?.env?.NEXT_PUBLIC_SITE_URL ??
      process?.env?.NEXT_PUBLIC_VERCEL_URL ??
      'http://localhost:3000';

    url = url.startsWith('http') ? url : `https://${url}`;
    url = url.endsWith('/') ? url.substring(0, url.length - 1) : url;
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
