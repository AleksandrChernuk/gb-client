import '@/styles/globals.css';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { routing } from '@/shared/i18n/routing';
import { Locale } from '@/shared/i18n/locales';
import { notFound } from 'next/navigation';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { Params } from '@/shared/types/common.types';
import { ReactNode } from 'react';
import { Rubik } from 'next/font/google';
import Script from 'next/script';
import Providers from '@/app/[lng]/Providers';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { BASE_URL } from '@/shared/configs/constants';
import type { Metadata } from 'next';

const rubik = Rubik({
  variable: '--font-rubik',
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  preload: true,
  weight: ['400', '500', '700'],
  fallback: ['system-ui', 'sans-serif'],
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://greenbus.com.ua'),
  applicationName: 'GreenBus',
  appleWebApp: {
    title: 'GreenBus',
    capable: true,
    statusBarStyle: 'default',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png' },
      { url: '/apple-touch-icon-57x57.png', sizes: '57x57', type: 'image/png' },
      { url: '/apple-touch-icon-72x72.png', sizes: '72x72', type: 'image/png' },
      { url: '/apple-touch-icon-76x76.png', sizes: '76x76', type: 'image/png' },
      { url: '/apple-touch-icon-114x114.png', sizes: '114x114', type: 'image/png' },
      { url: '/apple-touch-icon-120x120.png', sizes: '120x120', type: 'image/png' },
      { url: '/apple-touch-icon-144x144.png', sizes: '144x144', type: 'image/png' },
      { url: '/apple-touch-icon-152x152.png', sizes: '152x152', type: 'image/png' },
      { url: '/apple-touch-icon-180x180.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export function generateViewport(): import('next').Viewport {
  return {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ lng: locale }));
}

const schemaTranslations = {
  uk: { description: 'Онлайн бронювання автобусних квитків в Україну та Європу' },
  ru: { description: 'Онлайн бронирование автобусных билетов в Украину и Европу' },
  en: { description: 'Online bus ticket reservation to Ukraine and Europe' },
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Params;
}>) {
  const { lng } = await params;

  if (!hasLocale(routing.locales, lng as Locale)) {
    notFound();
  }

  setRequestLocale(lng as Locale);

  const messages = await getMessages();

  const CLIENT_NAMESPACES = [
    MESSAGE_FILES.COMMON,
    MESSAGE_FILES.FORM,
    MESSAGE_FILES.CHECKOUT_PAGE,
    MESSAGE_FILES.BUSES_PAGE,
    MESSAGE_FILES.PROFILE,
    MESSAGE_FILES.QUESTIONS_PAGE,
    MESSAGE_FILES.PAYMENT_RESULT_PAGE,
    MESSAGE_FILES.MAIN_PAGE,
    MESSAGE_FILES.ALL_COUNTRIES,
  ] as string[];

  const clientMessages = Object.fromEntries(
    Object.entries(messages).filter(([key]) => CLIENT_NAMESPACES.includes(key)),
  );

  const langTexts = schemaTranslations[lng as Locale] || schemaTranslations.uk;
  const localeHomeUrl = `${BASE_URL}/${lng}/`;

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'GreenBus',
    url: localeHomeUrl,
    description: langTexts.description,
    inLanguage: lng,
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'GreenBus',
    url: BASE_URL,
    description: langTexts.description,
    inLanguage: lng,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        telephone: '+380987446419',
        availableLanguage: ['uk', 'ru', 'en'],
      },
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        telephone: '+380996033832',
        availableLanguage: ['uk', 'ru', 'en'],
      },
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: 'greenbus.ukraine@gmail.com',
        availableLanguage: ['uk', 'ru', 'en'],
      },
    ],
    sameAs: [
      'https://www.instagram.com/greenbus_ukraine',
      'https://www.tiktok.com/@greenbusukraine',
      'https://x.com/GreenBusUkraine',
      'https://www.facebook.com/greenbus.ukraine',
      'https://t.me/+380987446419',
      'https://wa.me/380987446419',
    ],
  };

  return (
    <html lang={lng} suppressHydrationWarning>
      <body className={`${rubik.className} antialiased`} suppressHydrationWarning>
        <Script
          id="organization-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <NextIntlClientProvider locale={lng as Locale} messages={clientMessages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
