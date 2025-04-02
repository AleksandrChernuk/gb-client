'use client';

import { useMediaQuery } from '@/hooks/useMediaQuery';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function DesctopContainer({ children }: Props) {
  const matches = useMediaQuery('(min-width: 768px)');

  return matches ? <>{children}</> : null;
}
