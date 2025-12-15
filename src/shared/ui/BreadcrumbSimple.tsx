import Link from 'next/link';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/shared/ui/breadcrumb';

export type Crumb = {
  label: string;
  href: string;
};

export function BreadcrumbSimple({ items }: { items: Crumb[] }) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, idx) => {
          return (
            <span key={idx} className="flex items-center gap-1 truncate">
              {idx > 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={item.href} prefetch={false} rel="nofollow noopener noreferrer">
                    {item.label}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </span>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
