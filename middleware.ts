import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // 1. Security Headers
  const res = NextResponse.next();
  res.headers.set('X-Content-Type-Options', 'nosniff');
  res.headers.set('X-Frame-Options', 'DENY');
  res.headers.set('X-XSS-Protection', '1; mode=block');
  
  // 2. Proteksi Halaman /admin menggunakan Basic Auth
  if (req.nextUrl.pathname.startsWith('/admin')) {
    const basicAuth = req.headers.get('authorization');
    const url = req.nextUrl;

    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1];
      const [user, pwd] = atob(authValue).split(':');

      const adminUser = process.env.ADMIN_USER || 'admin';
      const adminPass = process.env.ADMIN_PASS || 'admin123';

      if (user === adminUser && pwd === adminPass) {
        return res;
      }
    }
    
    url.pathname = '/api/auth';
    return new NextResponse('Autentikasi Diperlukan', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="System Admin Area"',
      },
    });
  }

  return res;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'], // all routes except statics
};