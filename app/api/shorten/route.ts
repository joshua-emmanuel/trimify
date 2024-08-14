import { nanoid } from 'nanoid';
import { createClient } from '@/utils/supabase/server';

async function logLinkVisit(urlData: any, ipAddress: any) {
  const supabase = createClient();

  await supabase
    .from('links')
    .update({
      last_accessed_ip: ipAddress,
      click_count: urlData.click_count + 1,
      last_accessed_at: new Date().toLocaleTimeString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    })
    .eq('short_url', urlData.short_url);
}

export async function GET(request: Request) {
  const supabase = createClient();
  const { searchParams } = new URL(request.url);
  const short_url = searchParams.get('short_url');

  const ipAddress =
    request.headers.get('x-forwarded-for') ||
    request.headers.get('remote-addr');

  const { data: urlData, error } = await supabase
    .from('links')
    .select('*')
    .eq('short_url', short_url)
    .single();

  if (error || !urlData) {
    return new Response(JSON.stringify({ error: 'URL not found' }), {
      status: 404,
    });
  }

  await logLinkVisit(urlData, ipAddress);

  return new Response(JSON.stringify({ original_url: urlData.original_url }), {
    status: 200,
  });
}

export async function POST(request: Request) {
  const supabase = createClient();
  const { data: authData } = await supabase.auth.getUser();
  const user = authData?.user;

  const { originalUrl } = await request.json();
  const shortUrl = nanoid(6);

  const { data, error } = await supabase.from('links').insert({
    original_url: originalUrl,
    short_url: shortUrl,
    user_id: user?.id,
  });

  if (error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  return new Response(JSON.stringify({ shortUrl, user }), { status: 200 });
}
