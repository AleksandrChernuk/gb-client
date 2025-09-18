'use client';

import { usePathname } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export function GTMAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const locale = useLocale();

  useEffect(() => {
    if (pathname && process.env.NODE_ENV === 'production') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'page_view',
        page_path: `${pathname}${searchParams?.toString() ? `?${searchParams}` : ''}`,
        page_title: document.title,
        page_locale: locale,
      });
    }
  }, [pathname, searchParams, locale]);

  return null;
}

export function GTMNoScript() {
  return (
    <noscript>
      <iframe
        src="https://www.googletagmanager.com/ns.html?id=GTM-TCRLXDHZ"
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  );
}
