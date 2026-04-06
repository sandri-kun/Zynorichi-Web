import '@/app/globals.css'
import { ReactNode } from 'react'

import { constructMetadata } from '@/lib/seo/metadata';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return constructMetadata({
    title: lang === 'id' ? 'Beranda Blog' : 'Blog Home',
  });
}

export default async function RootLayout(
  props: { children: ReactNode, params: Promise<{ lang: string }> }
) {
  const params = await props.params;
  
  return (
    <html lang={params.lang}>
      <body className="bg-slate-50 text-slate-900 font-sans">
        <nav className="p-4 bg-white shadow-sm flex gap-4 font-bold border-b max-w-4xl mx-auto">
          <a href={`/${params.lang}`}>Beranda</a>
          <div className="ml-auto flex gap-4">
            <a href="/id" className="text-sm text-blue-600 hover:underline">ID</a>
            <a href="/en" className="text-sm text-blue-600 hover:underline">EN</a>
          </div>
        </nav>
        {props.children}
      </body>
    </html>
  )
}