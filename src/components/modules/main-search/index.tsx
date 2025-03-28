'use client';

import dynamic from 'next/dynamic';

const MainSearchForm = dynamic(() => import('./modules/MainSearchForm'), {
  ssr: false,
  loading: () => <MainSearchSkeleton />,
});

import { MainSearchSkeleton } from '@/components/shared/MainSearchSkeleton';

export default function MainSearch() {
  return <MainSearchForm />;
}
