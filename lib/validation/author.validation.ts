import { Author } from '@/types/author';
import { validateString, validateEmail, validateUrl } from './helpers';

export function validateAuthor(data: any): data is Author {
  if (!data) return false;
  
  if (!validateString(data.id) || !validateString(data.name) || !validateString(data.avatar)) {
    return false;
  }
  
  if (data.email && !validateEmail(data.email)) return false;
  if (data.website && !validateUrl(data.website)) return false;
  
  if (!Array.isArray(data.expertise)) return false;
  
  return true;
}

export function validateCreateAuthor(data: any): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};
  
  if (!validateString(data.id)) errors.id = 'ID author tidak valid atau kosong';
  if (!validateString(data.name)) errors.name = 'Nama author wajib diisi';
  if (!validateString(data.avatar)) errors.avatar = 'URL Avatar wajib diisi';
  if (data.email && !validateEmail(data.email)) errors.email = 'Format email tidak valid';
  if (data.website && !validateUrl(data.website)) errors.website = 'Format URL website tidak valid';
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
