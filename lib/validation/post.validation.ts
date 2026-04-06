import { Post } from '@/types/post';
import { validateString, validateSlug } from './helpers';

export function validatePost(data: any): data is Post {
  if (!data) return false;
  
  if (
    !validateString(data.title) ||
    !validateString(data.slug) ||
    !validateString(data.date) ||
    !validateString(data.author) ||
    !validateString(data.content)
  ) {
    return false;
  }
  
  return true;
}

export function validateFrontmatter(data: any): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};
  
  if (!validateString(data.title)) errors.title = 'Title wajib ada di frontmatter';
  if (!validateString(data.date)) errors.date = 'Date wajib ada di frontmatter';
  if (!validateString(data.author)) errors.author = 'Author ID wajib ada di frontmatter';
  if (data.slug && !validateSlug(data.slug)) errors.slug = 'Format slug tidak valid (hanya huruf kecil, angka, strip)';
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
