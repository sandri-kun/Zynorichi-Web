/**
 * Generates a URL-friendly slug from a string.
 */
export function generateSlug(text: string): string {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')     // Replace spaces with -
      .replace(/[^\w-]+/g, '')   // Remove all non-word chars
      .replace(/--+/g, '-')      // Replace multiple - with single -
      .replace(/^-+/, '')       // Trim - from start of text
      .replace(/-+$/, '');      // Trim - from end of text
  }
  
  /**
   * Truncates text to a specific length and adds ellipses.
   */
  export function truncateText(text: string, length: number): string {
    if (text.length <= length) return text;
    return text.slice(0, length).trim() + '...';
  }
  
  /**
   * Formats a date string for JSON-LD (ISO 8601).
   */
  export function formatDateForSchema(date: string | Date): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toISOString();
  }
  
  /**
   * Gets the absolute URL for a given path.
   */
  export function getAbsoluteUrl(path: string, siteUrl: string): string {
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${siteUrl}${cleanPath}`;
  }
  
