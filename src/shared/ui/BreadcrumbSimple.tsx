'use client';

import Link from 'next/link';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/shared/ui/breadcrumb';

export type Crumb = {
  label: string;
  href?: string;
};

export function BreadcrumbSimple({ items }: { items: Crumb[] }) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          const isHome = item.href === '/';

          return (
            <span key={idx} className="flex items-center">
              {idx > 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                {item.href && (isHome || !isLast) ? (
                  <BreadcrumbLink asChild>
                    <Link href={item.href} prefetch={false} rel="nofollow noopener noreferrer">
                      {item.label}
                    </Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
            </span>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
