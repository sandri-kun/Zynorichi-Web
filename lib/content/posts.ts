import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post } from '@/types/post';
import { getReadingTime } from '@/utils/readingTime';

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
      
      let slug = data.slug;
      if (!slug) {
          const relativePath = path.relative(blogDir, file);
          slug = relativePath.replace(/\\/g, '/').replace(/\.mdx?$/, '');
      }
      
      const readingTime = getReadingTime(content);
      const isPublished = data.published !== false; // true by default

      loadedPosts.push({
        title: data.title || '',
        slug,
        date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
        lang: data.lang || 'id',
        category: data.category || 'tech',
        author: data.author || '',
        description: data.description || '',
        content: content,
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

  public getPostsByLang(lang: string): Post[] {
    return this.getAllPosts().filter(p => p.lang === lang);
  }

  public getPostBySlug(slug: string, lang?: string, category?: string): Post | undefined {
    let posts = this.getAllPosts();
    if (lang) posts = posts.filter(p => p.lang === lang);
    if (category) posts = posts.filter(p => p.category === category);
    
    // Exact match vs endsWith to handle directory nesting if slug includes paths
    return posts.find(p => p.slug === slug || p.slug.endsWith(slug));
  }

  public getPostsByAuthor(authorId: string): Post[] {
    return this.getAllPosts().filter(p => p.author === authorId);
  }

  public getPostsByCategory(category: string, lang?: string): Post[] {
    let posts = this.getAllPosts().filter(p => p.category === category);
    if (lang) {
      posts = posts.filter(p => p.lang === lang);
    }
    return posts;
  }
}

export const postContent = PostManager.getInstance();
