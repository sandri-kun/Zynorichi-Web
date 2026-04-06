export function validateString(val: any, minLength: number = 1): boolean {
  return typeof val === 'string' && val.trim().length >= minLength;
}

export function validateEmail(val: any): boolean {
  if (!validateString(val)) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(val);
}

export function validateUrl(val: any): boolean {
  if (!validateString(val)) return false;
  try {
    new URL(val);
    return true;
  } catch {
    return false;
  }
}

export function validateNumber(val: any): boolean {
  return typeof val === 'number' && !isNaN(val);
}

export function validateSlug(val: any): boolean {
  if (!validateString(val)) return false;
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugRegex.test(val);
}
