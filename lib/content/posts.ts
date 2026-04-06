import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post } from '@/types/post';
import { getReadingTime } from '@/utils/readingTime';
import { authorContent } from './authors';

const blogDir = path.join(process.cwd(), 'content', 'blog');

export class PostManager {
  private static instance: PostManager;
  private posts: Post[] | null = null;

  private constructor() {}

  public static getInstance(): PostManager {
    if (!PostManager.instance) {
      PostManager.instance = new PostManager();
    }
    return PostManager.instance;
  }

  private getFiles(dir: string, fileList: string[] = []): string[] {
    if (!fs.existsSync(dir)) return fileList;
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      if (fs.statSync(filePath).isDirectory()) {
        this.getFiles(filePath, fileList);
      } else if (filePath.endsWith('.md') || filePath.endsWith('.mdx')) {
        fileList.push(filePath);
      }
    }
    return fileList;
  }

  private loadPosts(): Post[] {
    if (!fs.existsSync(blogDir)) {
      return [];
    }

    const files = this.getFiles(blogDir);
    const loadedPosts: Post[] = [];

    for (const file of files) {
      const fileContent = fs.readFileSync(file, 'utf8');
      const { data, content } = matter(fileContent);
      
      const relativePath = path.relative(blogDir, file);
      // Normalized path parts
      const pathParts = relativePath.split(/[\\\/]/);
      
      // Auto-detect language from path if not in frontmatter
      // Supporting patterns like: /content/blog/en/... or /content/blog/tech/en/...
      let lang = data.lang;
      if (!lang) {
        if (pathParts.includes('en')) lang = 'en';
        else if (pathParts.includes('id')) lang = 'id';
        else lang = 'en'; // default
      }

      let slug = data.slug;
      if (!slug) {
          slug = pathParts[pathParts.length - 1].replace(/\.mdx?$/, '');
      }
      
      const readingTime = getReadingTime(content);
      const isPublished = data.published !== false; // true by default

      loadedPosts.push({
        title: data.title || '',
        slug,
        date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
        lang,
        category: data.category || pathParts[0] || 'tech',
        author: authorContent.getAuthorById(data.author)?.name || data.author || 'Zynorichi',
        description: data.description || '',
        content: content,
        image: data.image || '',
        readingTime,
        published: isPublished
      });
    }

    return loadedPosts
        .filter(post => post.published)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  public getAllPosts(): Post[] {
    if (!this.posts) {
      this.posts = this.loadPosts();
    }
    return this.posts;
  }

  public getPostsByLocale(locale: string): Post[] {
    return this.getAllPosts().filter(p => p.lang === locale);
  }

  public getPostBySlug(slug: string, locale?: string, category?: string): Post | undefined {
    let posts = this.getAllPosts();
    if (locale) posts = posts.filter(p => p.lang === locale);
    if (category) posts = posts.filter(p => p.category === category);
    
    return posts.find(p => p.slug === slug);
  }

  public getPostsByAuthor(authorId: string, locale?: string): Post[] {
    let posts = this.getAllPosts().filter(p => p.author === authorId);
    if (locale) posts = posts.filter(p => p.lang === locale);
    return posts;
  }

  public getPostsByCategory(category: string, locale?: string): Post[] {
    let posts = this.getAllPosts().filter(p => p.category === category);
    if (locale) {
      posts = posts.filter(p => p.lang === locale);
    }
    return posts;
  }
}

export const postContent = PostManager.getInstance();
