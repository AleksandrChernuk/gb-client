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
import { BASE_URL } from '@/shared/configs/constants';

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
    path: '',
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
    description: 'Онлайн бронювання автобусних квитків в Україну та Європу',
  },
  ru: {
    description: 'Онлайн бронирование автобусных билетов в Украину и Европу',
  },
  en: {
    description: 'Online bus ticket reservation to Ukraine and Europe',
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
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/${lng}/buses/?from={from}&to={to}`,
      },
      'query-input': 'required name=from required name=to',
    },
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
