import { type EmailOtpType } from '@supabase/supabase-js';
import { type NextRequest } from 'next/server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type') as EmailOtpType | null;
  const next = searchParams.get('next') ?? '/';

  if (token_hash && type) {
    const supabase = createClient();

    const { data: authData, error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    const access_token = authData.session?.access_token;
    const refresh_token = authData.session?.refresh_token;

    if (!error) {
      if (access_token && refresh_token) {
        const { data, error } = await supabase.auth.setSession({
          access_token,
          refresh_token,
        });
      }
      redirect(next);
    }
  }

  // redirect the user to an error page with some instructions
  redirect('/error');
}
