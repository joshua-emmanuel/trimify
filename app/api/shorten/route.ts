import { NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { createClient } from '@/utils/supabase/server';

export async function GET() {
  return NextResponse.json({ shortenedUrl: 'https://short.co/fdeu2e3' });
}

export async function POST(request: Request) {
  const supabase = createClient();

  const { originalUrl } = await request.json();
  const shortUrl = nanoid(6);

  const { data, error } = await supabase.from('links').insert({
    original_url: originalUrl,
    short_url: shortUrl,
  });

  if (error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  return new Response(JSON.stringify({ shortUrl }), { status: 200 });
}
