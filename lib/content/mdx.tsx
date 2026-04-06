import React from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';

const mdxComponents = {};

export async function RenderMDX({ content, components = {} }: { content: string, components?: Record<string, any> }) {
  const mergedComponents = { ...mdxComponents, ...components };
  
  return (
    <MDXRemote 
       source={content} 
       components={mergedComponents} 
    />
  );
}
