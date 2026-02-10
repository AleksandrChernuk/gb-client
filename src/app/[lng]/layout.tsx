import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { routing } from '@/shared/i18n/routing';
import { Locale } from '@/shared/i18n/locales';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { Params } from '@/shared/types/common.types';
import ReactQueryContext from '@/shared/providers/ReactQueryProvider';
import { ReactNode } from 'react';
import { ThemeProvider } from '@/shared/providers/ThemeProvider';
import { Rubik } from 'next/font/google';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import Script from 'next/script';
import ClientOnlyProviders from '@/shared/ClientOnlyProviders';

const rubik = Rubik({
  variable: '--font-rubik',
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  weight: ['400', '500', '700'],
  preload: true,
});

export async function generateMetadata() {
  return {
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon.ico',
      apple: '/apple-touch-icon.png',
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ lng: locale }));
}

export default async function LocaleLayout({
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

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'GreenBus',
    url: `https://greenbus.com.ua/${lng}`,
    inLanguage: lng,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `https://greenbus.com.ua/${lng}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'GreenBus',
    url: 'https://greenbus.com.ua',
    logo: 'https://greenbus.com.ua/logo.png',
    description: 'Онлайн бронирование автобусных билетов',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: ['Ukrainian', 'Russian', 'English'],
    },
  };

  return (
    <html lang={lng} suppressHydrationWarning>
      <body className={rubik.className} suppressHydrationWarning>
        <Script
          id="website-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <Script
          id="organization-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />

        <NextIntlClientProvider locale={lng as Locale}>
          <NuqsAdapter>
            <ReactQueryContext>
              <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
                {children}
                <ClientOnlyProviders />
              </ThemeProvider>
            </ReactQueryContext>
          </NuqsAdapter>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
