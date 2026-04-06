import '@/app/globals.css';
import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { constructMetadata } from '@/lib/seo/metadata';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { MainLayout } from '@/components/features/layout/MainLayout';
import { cn } from '@/lib/utils';

const plusJakartaSans = Plus_Jakarta_Sans({ 
  subsets: ['latin'], 
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700', '800']
});

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
    <html lang={locale} suppressHydrationWarning>
      <body className={cn(plusJakartaSans.variable, "font-sans antialiased text-foreground")}>
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            <MainLayout>
              {props.children}
              <footer className="py-12 mt-20 border-t border-border/40 text-center text-sm text-muted-foreground glass-panel rounded-3xl mx-auto max-w-5xl mb-12">
                <p>&copy; {new Date().getFullYear()} NEBULA. Precision Minimalist Blog.</p>
              </footer>
            </MainLayout>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
