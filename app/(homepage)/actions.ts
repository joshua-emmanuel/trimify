'use server';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export async function shortenUrl(originalUrl: string) {
  try {
    const response = await fetch(`${siteUrl}/api/shorten`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ originalUrl }),
    });
    if (!response.ok) {
      if (response.status === 500) {
        return {
          message: 'error',
          data: 'Server error occurred',
        };
      }
      return {
        message: 'error',
        data: 'Something went wrong',
      };
    }
    const data = await response.json();
    return { message: 'success', data };
  } catch (error) {
    console.log(error);
    return { message: 'error', data: error };
  }
}
