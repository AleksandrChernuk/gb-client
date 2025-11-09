'use client';

import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { BorderBeam } from '@/shared/ui/border-beam';

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 100);
    };

    window.addEventListener('scroll', toggleVisibility);
    toggleVisibility();

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <Button
      onClick={scrollToTop}
      size="icon"
      className="fixed bottom-8 right-8 z-50 h-12 w-12 rounded-full transition-all duration-300 hover:scale-110 shadow-sm"
      aria-label="Scroll to top of page"
    >
      <ChevronUp className="h-6 w-6" />
      <BorderBeam duration={8} size={50} className="from-transparent via-green-100 to-transparent" />
    </Button>
  );
}
