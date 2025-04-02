'use client';

import { useMediaQuery } from '@/hooks/useMediaQuery';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function MobileContainer({ children }: Props) {
  const matches = useMediaQuery('(max-width: 768px)');
  return matches ? <>{children}</> : null;
}
