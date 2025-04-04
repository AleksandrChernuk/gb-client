import { Noto_Sans, Mulish } from 'next/font/google';

import '@/styles/global.css';

import { NextIntlClientProvider } from 'next-intl';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { Locale } from '@/i18n/locales';
import { Params } from '@/types/common.types';
import { ThemeProvider } from 'next-themes';
import ReactQueryContext from '@/providers/ReactQueryProvider';

const noto_sans = Noto_Sans({
  variable: '--font-geist-sans',
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
});

const mulish = Mulish({
  variable: '--font-mulish',
  subsets: ['latin'],
  weight: '800',
  display: 'swap',
});

export default async function MainLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Params;
}>) {
  const { lng } = await params;

  if (!routing.locales.includes(lng as Locale)) {
    return notFound();
  }
  const messages = await getMessages();
  setRequestLocale(lng as Locale);

  return (
    <NextIntlClientProvider messages={messages}>
      <html lang={lng} suppressHydrationWarning>
        <body className={`${noto_sans.variable} ${mulish.variable} antialiased`}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            <ReactQueryContext>{children}</ReactQueryContext>
          </ThemeProvider>
        </body>
      </html>
    </NextIntlClientProvider>
  );
}
