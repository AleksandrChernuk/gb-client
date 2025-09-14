'use client';

import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

type UsePaginatedQueryParams<TData> = {
  baseKey: unknown[]; // например: ['orders', userId, locale]
  fetchPage: (page: number, perPage: number) => Promise<TData>;
  getTotalPages: (data: TData | undefined) => number; // (data) => data?.pagination?.totalPages ?? 1
  perPage?: number; // по умолчанию 10
  initialPage?: number; // по умолчанию 1
  enabled?: boolean; // управление стартом запроса
  staleTime?: number; // дефолт 60_000
  refetchOnWindowFocus?: boolean; // дефолт false
  refetchOnReconnect?: boolean; // дефолт false
};

export function usePaginatedQuery<TData>({
  baseKey,
  fetchPage,
  getTotalPages,
  perPage = 10,
  initialPage = 1,
  enabled = true,
  staleTime = 60_000,
  refetchOnWindowFocus = false,
  refetchOnReconnect = false,
}: UsePaginatedQueryParams<TData>) {
  const [currentPage, setCurrentPage] = useState<number>(initialPage);

  const query = useQuery<TData>({
    queryKey: [...baseKey, currentPage, perPage],
    queryFn: () => fetchPage(currentPage, perPage),
    enabled,
    placeholderData: keepPreviousData,
    staleTime,
    refetchOnWindowFocus,
    refetchOnReconnect,
  });

  const totalPages = getTotalPages(query.data);

  const handlePageChange = (page: number, opts?: { scrollToTop?: boolean }) => {
    if (page < 1 || page > Math.max(1, totalPages)) return;
    setCurrentPage(page);
    if (opts?.scrollToTop && typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return {
    ...query,
    currentPage,
    setCurrentPage,
    handlePageChange,
    totalPages,
    perPage,
  };
}
