'use client';

import {
  Pagination as PaginationSdcn,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from '@/shared/ui/pagination';

type TPagination = {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
};

export const PaginationTest = ({ currentPage, totalPages, handlePageChange }: TPagination) => {
  if (totalPages <= 1) return null;

  const safePage = Math.min(currentPage, totalPages);

  const getPages = () => {
    const pages: (number | 'ellipsis')[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    pages.push(1);

    if (safePage > 3) pages.push('ellipsis');

    const start = Math.max(2, safePage - 1);
    const end = Math.min(totalPages - 1, safePage + 1);

    for (let i = start; i <= end; i++) pages.push(i);

    if (safePage < totalPages - 2) pages.push('ellipsis');

    pages.push(totalPages);

    return pages;
  };

  return (
    <PaginationSdcn>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (safePage > 1) handlePageChange(safePage - 1);
            }}
            aria-disabled={safePage === 1}
            className={safePage === 1 ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>

        {getPages().map((page, i) =>
          page === 'ellipsis' ? (
            <PaginationItem key={`ellipsis-${i}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                isActive={safePage === page}
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(page);
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (safePage < totalPages) handlePageChange(safePage + 1);
            }}
            aria-disabled={safePage === totalPages}
            className={safePage === totalPages ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationSdcn>
  );
};
