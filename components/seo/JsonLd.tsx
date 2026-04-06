import React from 'react';

interface JsonLdProps {
  schema: Record<string, any>;
}

/**
 * Component to inject JSON-LD structured data into the page.
 */
export default function JsonLd({ schema }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
