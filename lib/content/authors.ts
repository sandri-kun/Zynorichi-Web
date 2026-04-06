import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { Author } from '@/types/author';
import { validateAuthor } from '../validation/author.validation';

const authorsDir = path.join(process.cwd(), 'content', 'authors');

export class AuthorManager {
  private static instance: AuthorManager;
  private authors: Author[] | null = null;

  private constructor() {}

  public static getInstance(): AuthorManager {
    if (!AuthorManager.instance) {
      AuthorManager.instance = new AuthorManager();
    }
    return AuthorManager.instance;
  }

  private loadAuthors(): Author[] {
    if (!fs.existsSync(authorsDir)) {
       fs.mkdirSync(authorsDir, { recursive: true });
       return [];
    }
    
    const files = fs.readdirSync(authorsDir).filter(f => f.endsWith('.yml') || f.endsWith('.yaml'));
    
    const loadedAuthors: Author[] = [];
    
    for (const file of files) {
      const filePath = path.join(authorsDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      
      try {
        const parsed = yaml.load(fileContent) as any;
        if (!parsed.id) {
          parsed.id = path.basename(file, path.extname(file));
        }
        
        if (validateAuthor(parsed)) {
          loadedAuthors.push(parsed);
        } else {
          console.warn(`[AuthorManager] Penulis ${file} tidak lolos validasi.`);
        }
      } catch (e) {
        console.error(`[AuthorManager] Error parsing ${file}`, e);
      }
    }
    
    return loadedAuthors;
  }

  public getAllAuthors(): Author[] {
    if (!this.authors) {
      this.authors = this.loadAuthors();
    }
    return this.authors;
  }

  public getAuthorById(id: string): Author | undefined {
    return this.getAllAuthors().find(a => a.id === id);
  }

  public createAuthor(data: Author): boolean {
    try {
      if (!fs.existsSync(authorsDir)) fs.mkdirSync(authorsDir, { recursive: true });
      const filePath = path.join(authorsDir, `${data.id}.yml`);
      const yamlStr = yaml.dump(data);
      fs.writeFileSync(filePath, yamlStr, 'utf8');
      
      // Invalidate cache
      this.authors = null;
      return true;
    } catch (e) {
      console.error('[AuthorManager] Gagal menyimpan author', e);
      return false;
    }
  }
}

export const authorContent = AuthorManager.getInstance();
