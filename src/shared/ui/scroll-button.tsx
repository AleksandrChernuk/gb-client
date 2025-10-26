'use client';

import { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { BorderBeam } from '@/shared/ui/border-beam';

export default function ScrollButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const scrollPercent = scrollTop / (docHeight - winHeight);

      // Show button when user has scrolled more than 50px
      setIsVisible(scrollTop > 50);

      // Updated logic:
      // - At top (0-50% scrolled): show scroll to bottom
      // - At bottom (50-100% scrolled): show scroll to top
      if (scrollPercent <= 0.5) {
        setIsAtTop(true); // Show scroll to bottom
      } else {
        setIsAtTop(false); // Show scroll to top
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    toggleVisibility(); // Check initial state

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const handleClick = () => {
    if (isAtTop) {
      scrollToBottom();
    } else {
      scrollToTop();
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Button
      onClick={handleClick}
      size="icon"
      className="fixed bottom-8 right-8 z-50 h-12 w-12 rounded-full transition-all duration-300 hover:scale-110 shadow-sm"
      aria-label={isAtTop ? 'Scroll to bottom of page' : 'Scroll to top of page'}
    >
      {isAtTop ? <ChevronDown className="h-6 w-6" /> : <ChevronUp className="h-6 w-6" />}{' '}
      <BorderBeam duration={8} size={50} className="from-transparent via-green-100 to-transparent" />
    </Button>
  );
}
