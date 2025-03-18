'use client';

import dynamic from 'next/dynamic';

const Search = dynamic(() => import('./Search'), {
  ssr: false,
  loading: () => <MainSearchSkeleton />,
});

import { MainSearchSkeleton } from '@/components/shared/MainSearchSkeleton';

export default function MainSearch() {
  return <Search />;
}
