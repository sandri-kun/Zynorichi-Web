import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { getBreadcrumbSchema } from '@/lib/seo/schemas';
import JsonLd from './JsonLd';

interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
}

interface BreadcrumbsProps {
  items: Breadcrumb[];
}

/**
 * Breadcrumb component with visual navigation and JSON-LD schema support.
 */
export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const schemaItems = [
    { name: 'Home', item: '/' },
    ...items.map((item) => ({ name: item.label, item: item.href })),
  ];

  const breadcrumbSchema = getBreadcrumbSchema(schemaItems);

  return (
    <nav aria-label="Breadcrumb" className="flex flex-col gap-2">
      <JsonLd schema={breadcrumbSchema} />
      <ol className="flex items-center space-x-2 text-sm text-slate-500">
        <li>
          <Link href="/" className="hover:text-blue-600 transition-colors flex items-center">
            <Home className="w-4 h-4" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center space-x-2">
            <ChevronRight className="w-4 h-4 text-slate-400" />
            {item.active ? (
              <span className="font-medium text-slate-900" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="hover:text-blue-600 transition-colors"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
