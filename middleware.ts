import { NextResponse } from 'next/server';

// Note: With our client-side only authentication approach, we can't use middleware
// to protect routes server-side. The protection will happen in the client components
// using the useAuth hook and redirects.

// This middleware is kept minimal and just passes through all requests
export function middleware() {
  return NextResponse.next();
}

// Configure the middleware to run only on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
