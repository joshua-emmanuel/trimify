function ensureProtocol(url: string): string {
  if (!/^https?:\/\//i.test(url)) {
    return `https://${url}`;
  }
  return url;
}

function getUrl() {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ??
    process?.env?.NEXT_PUBLIC_VERCEL_URL ??
    'http://localhost:3000';

  url = url.startsWith('http') ? url : `https://${url}`;
  url = url.endsWith('/') ? url.substring(0, url.length - 1) : url;
  return url;
}

export { ensureProtocol, getUrl };
