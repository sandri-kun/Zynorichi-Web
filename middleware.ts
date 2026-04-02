import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { SUPPORTED_LANGS, DEFAULT_LOCALE } from './constants/config'

const locales = SUPPORTED_LANGS
const defaultLocale = DEFAULT_LOCALE

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Melewati file statis dan API internal Next.js
  if (
    pathname.includes('.') || 
    pathname.startsWith('/_next') || 
    pathname.startsWith('/api')
  ) {
    return NextResponse.next()
  }

  // Cek apakah URL sudah memiliki standar i18n
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return NextResponse.next()

  // Redirect ke default locale jika tidak ada
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}