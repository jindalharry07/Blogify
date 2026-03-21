import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request) {
  const token = request.cookies.get('token')?.value;

  const { pathname } = request.nextUrl;
  
  // Public routes that should not be accessed if logged in
  const isAuthRoute = pathname === '/login' || pathname === '/signup';
  
  // Protected routes
  const isAdminRoute = pathname.startsWith('/admin');

  let payload = null;
  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'my_super_secret_blogify_key');
      const { payload: jwtPayload } = await jwtVerify(token, secret);
      payload = jwtPayload;
    } catch (error) {
      // Invalid token
      payload = null;
    }
  }

  // Redirect users on Auth routes if already logged in
  if (isAuthRoute) {
    if (payload) {
      if (payload.role === 'admin') {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  // Protect Admin routes
  if (isAdminRoute) {
    if (!payload) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    if (payload.role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/login', '/signup']
};
