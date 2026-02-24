// Global middleware: protects all routes except login path, assets, and API

export async function onRequest(context) {
  const { request, env, next } = context;
  const url = new URL(request.url);
  const pathname = url.pathname;

  // Allow static assets and API calls to pass through
  if (
    pathname.startsWith('/assets/') ||
    pathname.startsWith('/api/') ||
    pathname.includes('.')
  ) {
    return next();
  }

  // Get the secret login path from environment variable
  const LOGIN_PATH = env.LOGIN_PATH || 'login';
  const loginPathWithSlash = `/${LOGIN_PATH}`;

  // Allow access to the secret login path
  if (pathname === loginPathWithSlash || pathname === `${loginPathWithSlash}/`) {
    return next();
  }

  // Check auth cookie for dashboard routes
  const cookieHeader = request.headers.get('Cookie');
  const authToken = getCookie(cookieHeader, 'auth_token');

  if (authToken && authToken.length > 0) {
    // Authenticated: allow access
    return next();
  }

  // Not authenticated and not on login path: return 404
  return new Response('Not Found', {
    status: 404,
    headers: { 'Content-Type': 'text/plain' },
  });
}

function getCookie(cookieString, name) {
  if (!cookieString) return null;
  const cookies = cookieString.split(';');
  for (const cookie of cookies) {
    const [key, value] = cookie.trim().split('=');
    if (key === name) return value;
  }
  return null;
}
