import React from 'react';

interface HeadMetaProps {
  name: string;
  content: string;
}

/**
 * Component for adding custom meta tags that might not be covered by Next.js Metadata API.
 */
export default function HeadMeta({ name, content }: HeadMetaProps) {
  return <meta name={name} content={content} />;
}
