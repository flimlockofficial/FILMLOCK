
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
 
export function middleware(request: NextRequest) {
  const cookie = cookies().get('film_lock_admin_auth');
  const isAuthenticated = cookie?.value === 'true';
 
  const { pathname } = request.nextUrl;
 
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
 
  if (pathname.startsWith('/admin/login') && isAuthenticated) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }
 
  return NextResponse.next();
}
 
export const config = {
  matcher: ['/admin/:path*'],
};
