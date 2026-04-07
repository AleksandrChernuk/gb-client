import '@/styles/globals.css';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { routing } from '@/shared/i18n/routing';
import { Locale } from '@/shared/i18n/locales';
import { notFound } from 'next/navigation';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { Params } from '@/shared/types/common.types';
import { ReactNode } from 'react';
import { Rubik } from 'next/font/google';
import Providers from '@/app/[lng]/Providers';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { generatePublicPageMetadata } from '@/shared/lib/metadata';

type Props = {
  params: Params;
};

const rubik = Rubik({
  variable: '--font-rubik',
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  preload: true,
  weight: ['400', '500', '700'],
  fallback: ['system-ui', 'sans-serif'],
  adjustFontFallback: true,
});

export async function generateMetadata({ params }: Props) {
  const { lng } = (await params) as { lng: Locale };
  return await generatePublicPageMetadata({
    lng,
    namespace: MESSAGE_FILES.METADATA,
    slug: 'main',
    path: '/',
  });
}

export function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ lng: locale }));
}

const schemaTranslations = {
  uk: {
    name: 'GreenBus',
    description: 'Онлайн бронювання автобусних квитків в Україну та Європу',
    serviceDescription: 'Замовте автобусні квитки онлайн. Доступні маршрути по Україні та в Європу.',
    countries: ['Україна', 'Польща', 'Чехія', 'Німеччина'],
  },
  ru: {
    name: 'GreenBus',
    description: 'Онлайн бронирование автобусных билетов в Украину и Европу',
    serviceDescription: 'Закажите автобусные билеты онлайн. Доступные маршруты по Украине и в Европу.',
    countries: ['Украина', 'Польша', 'Чехия', 'Германия'],
  },
  en: {
    name: 'GreenBus',
    description: 'Online bus ticket reservation to Ukraine and Europe',
    serviceDescription: 'Book bus tickets online. Available routes throughout Ukraine and Europe.',
    countries: ['Ukraine', 'Poland', 'Czechia', 'Germany'],
  },
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

  // Только namespaces, которые реально используются клиентскими компонентами (useTranslations).
  // Серверные компоненты (getTranslations) продолжают получать ВСЕ переводы напрямую.
  // Это убирает ~138 КБ (oferta-page 88KB, privacy-policy 24KB, metadata 16KB и др.)
  // из HTML-payload каждой страницы.
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

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'GreenBus',
    url: 'https://greenbus.com.ua',
    inLanguage: lng,
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'GreenBus',
    url: 'https://greenbus.com.ua',
    logo: 'https://greenbus.com.ua/logo.png',
    description: langTexts.description,
    inLanguage: lng,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: ['uk', 'ru', 'en'],
    },
    sameAs: [
      'https://www.instagram.com/greenbus_ukraine',
      'https://www.tiktok.com/@greenbusukraine',
      'https://x.com/@GreenBusUkraine',
      'https://www.facebook.com/greenbus.ukraine',
    ],
  };

  return (
    <html lang={lng} suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />

        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      </head>
      <body className={`${rubik.className} antialiased`} suppressHydrationWarning>
        <NextIntlClientProvider locale={lng as Locale} messages={clientMessages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
