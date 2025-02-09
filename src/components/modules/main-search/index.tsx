"use client"

const Search = dynamic(() => import("./Search"), {
  ssr: false,
  loading: () => <MainSearchSkeleton />,
});

import { MainSearchSkeleton } from '@/components/shared/MainSearchSkeleton';
 import dynamic from 'next/dynamic';

export default function MainSearch() {
   return <Search />;
};

