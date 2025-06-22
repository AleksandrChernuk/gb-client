import FaqTabs from '@/components/pages/faq/FaqTabs';
import { MESSAGE_FILES } from '@/constans/message.file.constans';
import { Params } from '@/types/common.types';
import { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type Props = {
  params: Params;
};

export async function generateMetadata({ params }: Props) {
  const { lng } = (await params) as { lng: Locale };
  const t = await getTranslations({
    locale: lng,
    namespace: MESSAGE_FILES.METADATA,
  });

  return {
    title: t('faq_ticket_refund.title'),
    description: t('faq_ticket_refund.description'),
    keywords: t('faq_ticket_refund.keywords'),

    appleWebApp: {
      title: 'GreenBus',
      capable: true,
      statusBarStyle: 'default',
    },

    manifest: '/manifest.json',

    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    metadataBase: new URL('https://greenbus.com.ua'),

    alternates: {
      canonical: `/${lng}/faq/ticket-refund`,
      languages: {
        'x-default': '/uk/faq/ticket-refund',
        uk: '/uk/faq/ticket-refund',
        en: '/en/faq/ticket-refund',
        ru: '/ru/faq/ticket-refund',
      },
    },

    openGraph: {
      images: '/logo.png',
    },
  };
}

export default async function TicketRefund({
  params,
}: Readonly<{
  params: Params;
}>) {
  const { lng } = await params;

  setRequestLocale(lng as Locale);
  return <FaqTabs />;
}
