import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { postContent } from '@/lib/content/posts';
import { ArticleCard } from '@/components/features/blog/ArticleCard';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('HomePage');
  const navT = await getTranslations('Navigation');
  
  const filteredPosts = postContent.getPostsByLocale(locale).slice(0, 6);

  const breadcrumbs = [
    { label: navT('home'), href: `/`, active: true }
  ];

  return (
    <main className="px-6 py-12 md:py-20 max-w-5xl mx-auto">
      <Breadcrumbs items={breadcrumbs} />
      
      <header className="mb-16 relative">
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse" />
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-bold tracking-wider uppercase mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          {t('welcome') || 'Welcome to Zynorichi'}
        </div>
        <h1 className="text-5xl md:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-br from-foreground via-foreground/80 to-muted-foreground tracking-tight mb-6">
          {t('title')}
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
          {t('description')}
        </p>
      </header>
      
      <section className="space-y-12">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Recent Posts</h2>
          <div className="h-px flex-1 mx-8 bg-border/40 hidden md:block" />
        </div>

        {filteredPosts.length === 0 ? (
          <div className="glass-card text-center py-20">
            <p className="text-muted-foreground">{t('emptyState')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <ArticleCard key={post.slug} post={post} lang={locale} />
            ))}
          </div>
        )}

        {filteredPosts.length > 0 && (
          <div className="mt-16 text-center">
            <Button asChild size="lg" className="rounded-full px-8 h-12 text-base font-bold shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all hover:-translate-y-0.5">
              <Link href="/blog" className="flex items-center gap-2">
                {t('readMore')}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        )}
      </section>
    </main>
  );
}
