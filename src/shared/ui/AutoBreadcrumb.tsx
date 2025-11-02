'use client';

import Link from 'next/link';
import React from 'react';
import { usePathname } from '@/shared/i18n/routing';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../ui/breadcrumb';

export function AutoBreadcrumb({ hideCurrent = false }: { hideCurrent?: boolean }) {
  const pathname = usePathname();

  const segments = pathname.split('/').filter(Boolean);

  const format = (str: string) => {
    const decoded = decodeURIComponent(str);

    const cleaned = decoded.replace(/^\d+-/, '');

    return cleaned.replace(/-/g, ' ').trim();
  };

  const paths = segments.map((segment, i) => ({
    name: format(segment),
    href: '/' + segments.slice(0, i + 1).join('/'),
  }));

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Головна</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {paths.map((p, idx) => {
          const isLast = idx === paths.length - 1;

          if (hideCurrent && isLast) return null;

          return (
            <React.Fragment key={p.href}>
              <BreadcrumbSeparator />

              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{p.name}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={p.href}>{p.name}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
