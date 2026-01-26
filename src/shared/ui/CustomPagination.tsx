'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { usePathname } from '@/shared/i18n/routing';
import {
  Pagination as PaginationSdcn,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from '@/shared/ui/pagination';

type TPagination = {
  currentPage: number;
  totalPages: number;
  maxVisiblePages: number;
  handlePageChange?: (page: number) => void;
};

export const CustomPagination = ({ currentPage, totalPages, maxVisiblePages, handlePageChange }: TPagination) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const changePage = (page: number) => {
    if (page < 1 || page > totalPages) return;

    if (handlePageChange) {
      // старый механизм
      handlePageChange(page);
      return;
    }

    // новый механизм через search params
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    router.replace(`${pathname}?${params.toString()}`, { scroll: true });
  };

  const items: React.ReactNode[] = [];
  const startPage = Math.max(1, currentPage - 1);
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  for (let page = startPage; page <= endPage; page++) {
    items.push(
      <PaginationItem key={page}>
        <PaginationLink
          href="#"
          isActive={currentPage === page}
          onClick={(e) => {
            e.preventDefault();
            changePage(page);
          }}
        >
          {page}
        </PaginationLink>
      </PaginationItem>,
    );
  }

  return (
    <PaginationSdcn>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              changePage(currentPage - 1);
            }}
            aria-disabled={currentPage === 1}
            className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>

        {items}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              changePage(currentPage + 1);
            }}
            aria-disabled={currentPage === totalPages}
            className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationSdcn>
  );
};
