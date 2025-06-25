export const dynamic = 'force-dynamic';
export const revalidate = 0;

import '@/styles/globals.css';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { Locale } from '@/i18n/locales';
import { Params } from '@/types/common.types';
import ReactQueryContext from '@/providers/ReactQueryProvider';
import { ReactNode } from 'react';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { Noto_Sans } from 'next/font/google';
import { GoogleTagManager } from '@next/third-parties/google';
import { Toaster } from 'sonner';
import { GTMNoScript } from '@/components/shared/GTMAnalytics';
import LocationsInitializer from '@/components/shared/LocationsInitializer';
import SearchParamsSyncer from '@/components/shared/SearchParamsSyncer';

const notoSans = Noto_Sans({
  variable: '--nato-sans',
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function MainLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Params;
}>) {
  const { lng } = await params;

  if (!hasLocale(routing.locales, lng as Locale)) {
    return notFound();
  }

  setRequestLocale(lng as Locale);

  return (
    <NextIntlClientProvider>
      <html lang={lng} suppressHydrationWarning className="scroll-smooth">
        <body className={`${notoSans.className} antialiased`} suppressHydrationWarning>
          <GTMNoScript />
          <GoogleTagManager gtmId="GTM-TCRLXDHZ" />
          <ReactQueryContext>
            <ThemeProvider attribute="class">{children}</ThemeProvider>
            <LocationsInitializer />
            <SearchParamsSyncer />
          </ReactQueryContext>
          <Toaster />
        </body>
      </html>
    </NextIntlClientProvider>
  );
}
