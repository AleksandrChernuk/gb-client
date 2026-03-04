'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import {
  Pagination as PaginationSdcn,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from '@/shared/ui/pagination';

interface Props {
  currentPage: number;
  totalPages: number;
}

const getPageHref = (page: number, pathname: string, searchParams: URLSearchParams) => {
  const params = new URLSearchParams(searchParams.toString());
  params.set('page', String(page));
  return `${pathname}?${params.toString()}`;
};

export const ServerPagination = ({ currentPage, totalPages }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const safePage = Math.min(currentPage, totalPages);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    router.push(getPageHref(page, pathname, new URLSearchParams(searchParams.toString())));
  };

  const getPages = (): (number | 'ellipsis')[] => {
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

  const sp = new URLSearchParams(searchParams.toString());

  return (
    <PaginationSdcn>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={safePage > 1 ? getPageHref(safePage - 1, pathname, sp) : undefined}
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
                href={getPageHref(page, pathname, sp)}
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
            href={safePage < totalPages ? getPageHref(safePage + 1, pathname, sp) : undefined}
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
