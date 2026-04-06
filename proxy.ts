import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export function proxy(req: NextRequest) {
  // 1. Setup Security Headers pada Respon Next-Intl
  // Kita harus me-run intlMiddleware dulu untuk i18n
  const res = intlMiddleware(req);
  res.headers.set('X-Content-Type-Options', 'nosniff');
  res.headers.set('X-Frame-Options', 'DENY');
  res.headers.set('X-XSS-Protection', '1; mode=block');

  const { pathname } = req.nextUrl;

  // 2. Proteksi Halaman /admin menggunakan Basic Auth
  // Perhatikan bahwa dengan as-needed, bahasa EN tidak punya awalan /en.
  // Tapi untuk ID, URL nya jadi /id/admin/...
  // Jadi kita mengecek "/admin" menggunakan includes atau regex
  if (pathname.includes('/admin')) {
    const basicAuth = req.headers.get('authorization');

    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1];
      const [user, pwd] = atob(authValue).split(':');

      const adminUser = process.env.ADMIN_USER || 'admin';
      const adminPass = process.env.ADMIN_PASS || 'admin123';

      if (user === adminUser && pwd === adminPass) {
        return res; 
      }
    }
    
    // Auth Required Response
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
  // Matcher untuk bypass static files & API rute & metadata files
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|static|robots.txt|sitemap.xml|manifest.json).*)']
};