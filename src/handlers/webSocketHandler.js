export async function handleWebSocketUpgrade(request) {
  const webSocketUrl = new URL(request.url);
  webSocketUrl.hostname = 'wss.gabler.app';
  webSocketUrl.protocol = 'wss:';
  webSocketUrl.port = '443';

  const newRequest = new Request(webSocketUrl.toString(), {
    method: request.method,
    headers: request.headers,
    body: request.body
  });

  return fetch(newRequest);
}