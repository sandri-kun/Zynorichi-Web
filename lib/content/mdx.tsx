import React from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { cn } from '@/lib/utils';

const mdxComponents: any = {
  h1: (props: any) => <h1 className="text-3xl font-black mt-12 mb-6 tracking-tight text-foreground" {...props} />,
  h2: (props: any) => <h2 className="text-2xl font-bold mt-10 mb-4 tracking-tight text-foreground" {...props} />,
  h3: (props: any) => <h3 className="text-xl font-bold mt-8 mb-4 tracking-tight text-foreground" {...props} />,
  p: (props: any) => <p className="text-lg leading-relaxed text-muted-foreground mb-6" {...props} />,
  ul: (props: any) => <ul className="list-disc pl-6 mb-6 space-y-2 text-muted-foreground" {...props} />,
  ol: (props: any) => <ol className="list-decimal pl-6 mb-6 space-y-2 text-muted-foreground" {...props} />,
  li: (props: any) => <li className="text-lg leading-relaxed" {...props} />,
  pre: (props: any) => (
    <pre className="glass-card p-6 overflow-x-auto my-8 rounded-2xl border border-primary/10 shadow-xl shadow-primary/5" {...props} />
  ),
  code: (props: any) => (
    <code className="font-mono text-sm bg-primary/5 text-primary px-1.5 py-0.5 rounded-md border border-primary/10" {...props} />
  ),
};

export async function RenderMDX({ content, components = {} }: { content: string, components?: Record<string, any> }) {
  const mergedComponents = { ...mdxComponents, ...components };
  
  return (
    <div className="prose prose-zinc dark:prose-invert max-w-none prose-pre:bg-transparent prose-pre:p-0 transition-opacity">
      <MDXRemote 
         source={content} 
         components={mergedComponents} 
      />
    </div>
  );
}
