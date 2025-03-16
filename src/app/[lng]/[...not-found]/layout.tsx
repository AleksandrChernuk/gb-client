import { Noto_Sans, Mulish } from 'next/font/google';
import '@/styles/global.css';
import { Params } from '@/types/common.types';
import { Locale } from '@/i18n/locales';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';

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

export default async function NotFoundLayout({
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
  setRequestLocale(lng);

  return (
    <html lang={lng} suppressHydrationWarning>
      <body className={`${noto_sans.variable} ${mulish.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          {' '}
          <div className="flex flex-col h-screen">{children}</div>;
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
