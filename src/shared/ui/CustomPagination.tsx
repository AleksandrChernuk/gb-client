'use client';

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
  handlePageChange: (page: number) => void;
};

const getPaginationItems = ({ currentPage, totalPages, maxVisiblePages, handlePageChange }: TPagination) => {
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
            handlePageChange(page);
          }}
        >
          {page}
        </PaginationLink>
      </PaginationItem>,
    );
  }

  return items;
};

export const CustomPagination = ({ currentPage, totalPages, handlePageChange, maxVisiblePages }: TPagination) => {
  return (
    <PaginationSdcn>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(currentPage - 1);
            }}
            aria-disabled={currentPage === 1}
            className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>
        {getPaginationItems({ currentPage, totalPages, handlePageChange, maxVisiblePages })}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(currentPage + 1);
            }}
            aria-disabled={currentPage === totalPages}
            className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationSdcn>
  );
};
