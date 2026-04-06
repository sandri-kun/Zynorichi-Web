import React from 'react';
import { Home } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { getBreadcrumbSchema } from '@/lib/seo/schemas';
import JsonLd from './JsonLd';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbItemType {
  label: string;
  href: string;
  active?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItemType[];
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
    <nav aria-label="Breadcrumb" className="mb-8 p-1">
      <JsonLd schema={breadcrumbSchema} />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/" className="flex items-center gap-1 hover:text-primary transition-colors">
                <Home className="w-3.5 h-3.5" />
                <span className="sr-only">Home</span>
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          
          {items.map((item, index) => (
            <React.Fragment key={item.href}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {item.active ? (
                  <BreadcrumbPage className="font-semibold text-foreground">
                    {item.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={item.href} className="hover:text-primary transition-colors">
                      {item.label}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </nav>
  );
}
