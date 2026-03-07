'use client';

import { CustomPagination } from '@/shared/ui/custom-pagination';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

interface Props {
  currentPage: number;
  totalPages: number;
}

export const ServerPagination = ({ currentPage, totalPages }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));

    router.push(`${pathname}?${params.toString()}`);
  };

  return <CustomPagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />;
};
