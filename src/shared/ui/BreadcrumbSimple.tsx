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
  href: string;
  className?: string;
};

export function BreadcrumbSimple({
  items,
  className,
  pageClassName,
  ItemClassName,
  LinkClassName,
}: {
  items: Crumb[];
  className?: string;
  pageClassName?: string;
  ItemClassName?: string;
  LinkClassName?: string;
}) {
  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {items.map((item, idx) => {
          const isLast = items.length > 1 && idx === items.length - 1;

          return (
            <span key={idx} className="flex items-center gap-1 truncate">
              {idx > 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem className={ItemClassName}>
                {isLast ? (
                  <BreadcrumbPage className={pageClassName}>{item.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild className={LinkClassName}>
                    <Link href={item.href}>{item.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </span>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
