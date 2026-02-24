// API middleware: validates auth token for all /api/* routes except /api/auth/*

function getCookie(cookieString, name) {
  if (!cookieString) return null;
  const cookies = cookieString.split(';');
  for (const cookie of cookies) {
    const [key, value] = cookie.trim().split('=');
    if (key === name) return value;
  }
  return null;
}

export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);

  // Allow auth endpoints to pass through without token check
  if (url.pathname.startsWith('/api/auth/')) {
    return next();
  }

  const cookieHeader = request.headers.get('Cookie');
  const authToken = getCookie(cookieHeader, 'auth_token');

  if (!authToken || authToken.length === 0) {
    return new Response(
      JSON.stringify({ error: 'Unauthorized' }),
      {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  return next();
}
