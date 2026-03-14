import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/shared/ui/breadcrumb';
import { cn } from '@/shared/lib/utils';
import Link from 'next/link';

export type Crumb = {
  label: string;
  href: string;
};

export function BreadcrumbSimple({
  items,
  className,
  locale,
  linkClassName,
  pageClassName,
  baseUrl = 'https://greenbus.com.ua',
}: {
  items: Crumb[];
  className?: string;
  linkClassName?: string;
  pageClassName?: string;
  locale: 'uk' | 'ru' | 'en';
  baseUrl?: string;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.label,
      item: `${baseUrl}/${locale}${item.href}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumb className={cn('text-current', className)}>
        <BreadcrumbList>
          {items.map((item, idx) => {
            const isLast = items.length > 1 && idx === items.length - 1;

            return (
              <span key={idx} className="flex items-center gap-1 truncate">
                {idx > 0 && <BreadcrumbSeparator />}
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage className={pageClassName}>{item.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink className={linkClassName} asChild>
                      <Link href={item.href}>{item.label}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </span>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
}
