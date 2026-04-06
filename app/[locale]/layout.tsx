import '@/app/globals.css';
import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { constructMetadata } from '@/lib/seo/metadata';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return constructMetadata({
    title: locale === 'id' ? 'Beranda Blog' : 'Blog Home',
    locale,
  });
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout(
  props: { children: ReactNode, params: Promise<{ locale: string }> }
) {
  const { locale } = await props.params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  
  return (
    <html lang={locale}>
      <body className="bg-slate-50 text-slate-900 font-sans">
        <NextIntlClientProvider messages={messages}>
          <nav className="p-4 bg-white shadow-sm flex gap-4 font-bold border-b max-w-4xl mx-auto items-center">
            <Link href="/">Zynorichi</Link>
            <div className="ml-auto flex gap-4 items-center">
              <LanguageSwitcher />
            </div>
          </nav>
          {props.children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
