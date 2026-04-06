import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import yaml from 'js-yaml';

export type Author = {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  email?: string;
  website?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
  credentials?: {
    title?: string;
    company?: string;
    experience?: string;
    education?: string[];
    certifications?: string[];
    achievements?: string[];
  };
  expertise: string[];
  location?: string;
  joinDate?: string;
};

export type Post = {
  title: string;
  slug: string;
  date: string;
  lang: string;
  category: string;
  author: string;
  description: string;
  content: string; // raw MDX string
};

const contentDir = path.join(process.cwd(), 'content');

function getFiles(dir: string, fileList: string[] = []): string[] {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  }
  return fileList;
}

export const authors: Author[] = (() => {
  const authorsDir = path.join(contentDir, 'authors');
  const files = getFiles(authorsDir).filter(f => f.endsWith('.yml') || f.endsWith('.yaml'));
  
  return files.map(file => {
    const fileContent = fs.readFileSync(file, 'utf8');
    const parsed = yaml.load(fileContent) as any;
    
    // Fallback ID to filename if not present
    if (!parsed.id) {
       parsed.id = path.basename(file, path.extname(file));
    }
    
    return parsed as Author;
  });
})();

export const posts: Post[] = (() => {
  const blogDir = path.join(contentDir, 'blog');
  const files = getFiles(blogDir).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
  
  return files.map(file => {
    const fileContent = fs.readFileSync(file, 'utf8');
    const { data, content } = matter(fileContent);
    
    // Create slug from path if not specified in frontmatter
    let slug = data.slug;
    if (!slug) {
        // e.g. path/to/content/blog/tech/id/belajar-nextjs.mdx -> tech/id/belajar-nextjs
        const relativePath = path.relative(blogDir, file);
        slug = relativePath.replace(/\\/g, '/').replace(/\.mdx?$/, '');
    }
    
    return {
      title: data.title || '',
      slug,
      date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
      lang: data.lang || 'en',
      category: data.category || 'tech',
      author: data.author || '',
      description: data.description || '',
      content: content
    };
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
})();
