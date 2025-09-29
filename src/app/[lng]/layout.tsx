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
      <body className={`${notoSans.className} ${notoSans.variable} antialiased`} suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <GTMNoScript />
          <GoogleTagManager gtmId="GTM-TCRLXDHZ" />

          <ReactQueryContext>
            <ThemeProvider attribute="class" disableTransitionOnChange={false}>
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
