export const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api.blogku.com' 
  : 'http://localhost:8080';
export const SUPPORTED_LANGS = ['id', 'en'] as const;
export const CATEGORIES = ['tech', 'anime', 'crypto'] as const;
export const DEFAULT_LOCALE = 'id';
