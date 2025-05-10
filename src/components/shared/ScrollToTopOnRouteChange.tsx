'use client';
import { useEffect } from 'react';

export function ScrollToTopOnRouteChange() {
  useEffect(() => {
    const handlePopState = () => {
      setTimeout(() => {
        window.scrollTo({ top: 0 });
      }, 50);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return null;
}
