import '@/app/globals.css';
import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { constructMetadata } from '@/lib/seo/metadata';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { ThemeColorProvider } from '@/components/theme-color-provider';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

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
      <body className={cn(inter.variable, "font-sans antialiased")}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ThemeColorProvider>
            <NextIntlClientProvider messages={messages}>
              <header className="glass-nav flex gap-4 font-bold items-center transition-all duration-300">
                <Link href="/" className="text-xl tracking-tight hover:opacity-80 transition-opacity">
                  Zyno<span className="text-primary italic">richi</span>
                </Link>
                <div className="ml-auto flex gap-6 items-center">
                  <ThemeSwitcher />
                  <div className="h-4 w-[1px] bg-border/40 mx-1" />
                  <LanguageSwitcher />
                </div>
              </header>
              <main className="relative min-h-[calc(100vh-8rem)]">
                {props.children}
              </main>
              <footer className="py-12 mt-20 border-t border-border/40 text-center text-sm text-muted-foreground glass rounded-t-[3rem]">
                <p>&copy; {new Date().getFullYear()} Zynorichi. Built with Modern Elegance.</p>
              </footer>
            </NextIntlClientProvider>
          </ThemeColorProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
