import '@/styles/globals.css';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { routing } from '@/shared/i18n/routing';
import { Locale } from '@/shared/i18n/locales';
import { notFound } from 'next/navigation';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { Params } from '@/shared/types/common.types';
import ReactQueryContext from '@/shared/providers/ReactQueryProvider';
import { ReactNode } from 'react';
import { ThemeProvider } from '@/shared/providers/ThemeProvider';
import { Noto_Sans } from 'next/font/google';
import { GoogleTagManager } from '@next/third-parties/google';
import { Toaster } from 'sonner';
import ProfileCheckProvider from '@/shared/providers/ProfileCheck.provider';
import { GTMNoScript } from '@/shared/providers/GTMAnalytics';
import LocationsInitializer from '@/entities/locations/LocationsInitializer';

const notoSans = Noto_Sans({
  variable: '--nato-sans',
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Функция для определения направления текста
function getTextDirection(locale: Locale): 'ltr' | 'rtl' {
  const rtlLocales = ['ar', 'he', 'fa', 'ur'];
  return rtlLocales.includes(locale) ? 'rtl' : 'ltr';
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

  const messages = await getMessages();
  setRequestLocale(lng as Locale);

  return (
    <html lang={lng} dir={getTextDirection(lng as Locale)} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />

        {/* Favicon и Apple Touch Icons */}
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png" />

        {/* Preconnect для ускорения загрузки */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* PWA мета-теги */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="GreenBus" />

        {/* Мета-теги для безопасности */}
        <meta name="referrer" content="strict-origin-when-cross-origin" />
      </head>

      <body className={`${notoSans.className} ${notoSans.variable} antialiased`} suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <GTMNoScript />
          <GoogleTagManager gtmId="GTM-TCRLXDHZ" />

          <ReactQueryContext>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange={false}>
              {children}
              <ProfileCheckProvider />
              <LocationsInitializer />
            </ThemeProvider>
          </ReactQueryContext>

          <Toaster richColors position="top-center" closeButton duration={4000} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
