export function formatDate(date: string, lang: string = 'id'): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  
  const locale = lang === 'id' ? 'id-ID' : 'en-US';
  return new Date(date).toLocaleDateString(locale, options);
}

export function formatDateTime(date: string): string {
  return new Date(date).toISOString();
}
