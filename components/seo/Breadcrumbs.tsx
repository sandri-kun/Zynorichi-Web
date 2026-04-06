import Link from 'next/link';
import { generateBreadcrumbJsonLd } from '@/lib/seo/schemas';
import { JsonLd } from './JsonLd';
import { siteConfig } from '@/config/site';

export interface BreadcrumbItem {
  label: string;
  path: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const jsonLdItems = items.map(item => ({
    name: item.label,
    url: `${siteConfig.url}${item.path}`
  }));

  return (
    <nav aria-label="Breadcrumb" className="my-4">
      <JsonLd data={generateBreadcrumbJsonLd(jsonLdItems)} />
      <ol className="flex items-center space-x-2 text-sm text-gray-500">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.path} className="flex items-center space-x-2">
              {isLast ? (
                <span className="font-semibold text-gray-900" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <>
                  <Link href={item.path} className="hover:text-blue-600 transition-colors">
                    {item.label}
                  </Link>
                  <span className="text-gray-400">/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
