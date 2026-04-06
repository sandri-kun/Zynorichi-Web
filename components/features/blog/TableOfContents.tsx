import React from 'react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  // Simple regex parser for markdown headings
  const headings = content.match(/^(#{2,4})\s+(.+)$/gm);
  
  if (!headings || headings.length === 0) return null;

  const toc: TOCItem[] = headings.map(heading => {
    const level = (heading.match(/^#+/) || [''])[0].length;
    const text = heading.replace(/^#+\s+/, '');
    // Generate simple id
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    
    return { id, text, level };
  });

  return (
    <nav className="bg-gray-50 border rounded-xl p-6 sticky top-8">
      <h3 className="font-bold text-gray-900 mb-4 uppercase tracking-wider text-sm">Daftar Isi</h3>
      <ul className="space-y-3">
        {toc.map((item, i) => (
          <li key={i} style={{ paddingLeft: `${(item.level - 2) * 1}rem` }}>
            <a 
              href={`#${item.id}`} 
              className="text-sm text-gray-600 hover:text-blue-600 hover:underline block"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
