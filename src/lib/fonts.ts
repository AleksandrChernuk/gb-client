import { Mulish, Noto_Sans } from 'next/font/google';

import { cn } from '@/lib/utils';

const notoSans = Noto_Sans({
  variable: '--font-geist-sans',
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
});

const mullish = Mulish({
  variable: '--font-mulish',
  subsets: ['latin'],
  weight: '800',
  display: 'swap',
});

export const fontVariables = cn(notoSans.variable, mullish.variable);
