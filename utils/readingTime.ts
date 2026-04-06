export function getReadingTime(text: string): number {
  if (!text) return 1;
  const wpm = 225;
  const words = text.trim().split(/\s+/).length;
  const time = Math.ceil(words / wpm);
  return time === 0 ? 1 : time;
}
