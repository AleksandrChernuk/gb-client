import { Mulish, Noto_Sans_Mono } from 'next/font/google';

import { cn } from '@/lib/utils';

const fontNotoMono = Noto_Sans_Mono({
  subsets: ['latin'],
  variable: '--font-noto-mono',
});

const fontMullish = Mulish({
  subsets: ['latin'],
  variable: '--font-mullish',
});

export const fontVariables = cn(fontNotoMono.variable, fontMullish.variable);
