'use client';

import { TSearchForm } from '@/features/route-search-form/types';
import MainSearchSkeleton from '@/features/route-search-form/ui/MainSearchSkeleton';
import dynamic from 'next/dynamic';

const MainSearchForm = dynamic(() => import('./ui/MainSearchForm'), {
  loading: () => <MainSearchSkeleton />,
  ssr: false,
});

export default function MainSearch({ initialValues }: TSearchForm) {
  return <MainSearchForm initialValues={initialValues} />;
}
