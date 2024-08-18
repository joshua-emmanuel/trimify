import { type EmailOtpType } from '@supabase/supabase-js';
import { type NextRequest } from 'next/server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export async function GET(request: NextRequest) {
  const { searchParams, origin, pathname } = new URL(request.url);
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type') as EmailOtpType | null;
  const next = searchParams.get('next') ?? '/';

  if (token_hash && type) {
    const supabase = createClient();

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });
    if (!error) {
      // redirect user to specified redirect URL or root of app
      // redirect(next);
      searchParams.delete('token_hash');
      searchParams.delete('type');

      // Construct the clean URL without the token hash
      const cleanUrl = `${origin}${pathname}?${searchParams.toString()}`;

      // Redirect to the clean URL without keeping the old URL in history
      redirect(cleanUrl || next);
      return;
    }
  }

  // redirect the user to an error page with some instructions
  redirect('/error');
}
