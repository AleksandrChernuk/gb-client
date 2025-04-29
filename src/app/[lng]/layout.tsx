import '@/styles/globals.css';
import { NextIntlClientProvider } from 'next-intl';
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

  if (!routing.locales.includes(lng as Locale)) {
    return notFound();
  }

  setRequestLocale(lng as Locale);

  return (
    <NextIntlClientProvider>
      <html lang={lng} suppressHydrationWarning>
        <head>
          <link rel="preconnect" href="https://media.nedigital.sg" />
          <link rel="dns-prefetch" href="https://media.nedigital.sg" />
        </head>
        <GoogleTagManager gtmId="GTM-TCRLXDHZ" />
        <GoogleTagManager gtmId="G-H1T333J6GL" />
        <body className={`${notoSans.className} antialiased`} suppressHydrationWarning>
          <ReactQueryContext>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
              {children}
            </ThemeProvider>
          </ReactQueryContext>
        </body>
      </html>
    </NextIntlClientProvider>
  );
}
