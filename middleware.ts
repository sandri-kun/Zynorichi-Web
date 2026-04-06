import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['id', 'en'];
const defaultLocale = 'id';

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language');
  if (!acceptLanguage) return defaultLocale;
  
  const langStr = acceptLanguage.toLowerCase();
  // Deteksi sederhana dari header Accept-Language
  if (langStr.includes('id') || langStr.includes('in')) return 'id';
  if (langStr.includes('en')) return 'en';
  
  return defaultLocale;
}

export function middleware(req: NextRequest) {
  // 1. Security Headers
  let res = NextResponse.next();
  res.headers.set('X-Content-Type-Options', 'nosniff');
  res.headers.set('X-Frame-Options', 'DENY');
  res.headers.set('X-XSS-Protection', '1; mode=block');
  
  const { pathname } = req.nextUrl;

  // 2. Proteksi Halaman /admin menggunakan Basic Auth
  if (pathname.startsWith('/admin')) {
    const basicAuth = req.headers.get('authorization');

    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1];
      const [user, pwd] = atob(authValue).split(':');

      const adminUser = process.env.ADMIN_USER || 'admin';
      const adminPass = process.env.ADMIN_PASS || 'admin123';

      if (user === adminUser && pwd === adminPass) {
        return res; // Lanjut akses jika kredensial benar
      }
    }
    
    // Jika auth gagal atau tidak ada header auth:
    const url = req.nextUrl.clone();
    url.pathname = '/api/auth';
    return new NextResponse('Autentikasi Diperlukan', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="System Admin Area"',
      },
    });
  }

  // 3. i18n Auto Detect Lang (Redirect ke default [lang])
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  const isExcluded = pathname.startsWith('/admin') || pathname.startsWith('/api') || pathname.startsWith('/static');

  if (!pathnameHasLocale && !isExcluded && pathname !== '/favicon.ico') {
    const locale = getLocale(req);
    
    // Auto redirect e.g. / -> /id  atau  /blog -> /id/blog
    const newUrl = req.nextUrl.clone();
    newUrl.pathname = `/${locale}${pathname}`;
    // Preserve search params e.g. /?page=2 -> /id/?page=2
    return NextResponse.redirect(newUrl); 
  }

  return res;
}

export const config = {
  // Hanya panggil middleware pada route selain static files Next
  matcher: ['/((?!_next/static|_next/image|images|favicon.ico).*)'], 
};