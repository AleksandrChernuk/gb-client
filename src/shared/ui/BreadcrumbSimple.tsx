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

const locales = ['uk', 'ru', 'en'] as const;

export type Crumb = {
  label: string;
  href: string;
};

function isExternalHref(href: string) {
  return /^(https?:|mailto:|tel:)/i.test(href);
}

function normalizeInternalHref(locale: (typeof locales)[number], href: string) {
  if (isExternalHref(href)) return href;

  const [pathname = '/', suffix = ''] = href.match(/^([^?#]*)(.*)$/)?.slice(1) ?? [];
  const parts = pathname.split('/').filter(Boolean);

  if (locales.includes(parts[0] as (typeof locales)[number])) {
    parts.shift();
  }

  let cleanPath = parts.length > 0 ? `/${parts.join('/')}` : '/';

  if (!cleanPath.match(/\.[a-z]+$/i) && !cleanPath.endsWith('/')) {
    cleanPath += '/';
  }

  return `/${locale}${cleanPath}${suffix}`;
}

function toAbsoluteUrl(baseUrl: string, href: string) {
  if (isExternalHref(href)) return href;
  return `${baseUrl.replace(/\/+$/, '')}${href}`;
}

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
    itemListElement: items.map((item, idx) => {
      const isLast = items.length > 1 && idx === items.length - 1;
      const href = normalizeInternalHref(locale, item.href);

      return {
        '@type': 'ListItem',
        position: idx + 1,
        name: item.label,
        ...(isLast ? {} : { item: toAbsoluteUrl(baseUrl, href) }),
      };
    }),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumb className={cn('text-current', className)}>
        <BreadcrumbList>
          {items.map((item, idx) => {
            const isLast = items.length > 1 && idx === items.length - 1;
            const href = normalizeInternalHref(locale, item.href);

            return (
              <span key={idx} className="flex items-center gap-1 truncate">
                {idx > 0 && <BreadcrumbSeparator />}
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage className={pageClassName}>{item.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink className={linkClassName} asChild>
                      <Link href={href}>{item.label}</Link>
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
