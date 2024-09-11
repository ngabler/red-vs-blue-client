import { handleWebSocketUpgrade } from './webSocketHandler.js';
import { handleCORS } from './corsHandler.js';
import { serveMainPage } from '../pages/mainPage.js';
import { addSecurityHeaders } from '../utils/securityHeaders.js';
import { addCacheControl } from '../utils/cacheControl.js';

export async function handleRequest(request) {
  const url = new URL(request.url);

  // Handle WebSocket upgrade
  if (request.headers.get('Upgrade') === 'websocket') {
    return handleWebSocketUpgrade(request);
  }

  // Serve the main page
  if (url.pathname === '/' || url.pathname === '/index.html') {
    return serveMainPage();
  }

  // Handle health check
  if (url.pathname === '/health-check') {
    return new Response('OK', { status: 200 });
  }

  // Handle CORS preflight requests
  if (request.method === 'OPTIONS') {
    return handleCORS(request);
  }

  // Handle other requests (pass through to origin)
  let response = await fetch(request);

  // Cache control for static assets
  if (url.pathname.match(/\.(css|js|png|jpg|jpeg|gif|ico)$/)) {
    response = addCacheControl(response);
  }

  // Add security headers
  response = addSecurityHeaders(response);

  return response;
}