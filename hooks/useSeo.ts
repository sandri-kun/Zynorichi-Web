import { useEffect } from 'react';

export function useSeo(title?: string) {
  useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);
}
