import '@/styles/globals.css';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { routing } from '@/shared/i18n/routing';
import { Locale } from '@/shared/i18n/locales';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { Params } from '@/shared/types/common.types';
import { ReactNode } from 'react';
import { Rubik } from 'next/font/google';
import Providers from '@/app/[lng]/Providers';

const rubik = Rubik({
  variable: '--font-rubik',
  subsets: ['latin', 'cyrillic'],
  display: 'optional',
  weight: ['400', '500', '700'],
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
  adjustFontFallback: true,
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
    <html lang={lng}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      </head>
      <body className={`${rubik.className} antialiased`}>
        <NextIntlClientProvider locale={lng as Locale}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
