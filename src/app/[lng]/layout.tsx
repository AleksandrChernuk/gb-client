import '@/styles/globals.css';

import { NextIntlClientProvider } from 'next-intl';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { Locale } from '@/i18n/locales';
import { Params } from '@/types/common.types';
import ReactQueryContext from '@/providers/ReactQueryProvider';
import { ReactNode } from 'react';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { Noto_Sans } from 'next/font/google';

const notoSans = Noto_Sans({
  variable: '--nato-sans',
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
});

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

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages} locale={lng as Locale}>
      <html lang={lng} suppressHydrationWarning>
        <body className={`${notoSans.className}  antialiased`}>
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
