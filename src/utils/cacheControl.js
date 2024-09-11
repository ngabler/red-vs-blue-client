export function addCacheControl(response) {
  const newHeaders = new Headers(response.headers);
  newHeaders.set('Cache-Control', 'public, max-age=3600');

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders
  });
}