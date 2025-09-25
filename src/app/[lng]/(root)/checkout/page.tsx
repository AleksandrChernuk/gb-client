import { Params } from '@/shared/types/common.types';
import { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import ThirdFooter from '@/widgets/footer/ThirdFooter';

import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { Container } from '@/shared/ui/Container';
import BackRouteButton from '@/shared/ui/BackRouteButton';
import Cleanup from '@/entities/checkout/Cleanup';
import Timer from '@/entities/checkout/Timer';
import CheckoutForm from '@/features/checkout-form';

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
    title: t('checkout.title'),
    description: t('checkout.description'),
    keywords: t('checkout.keywords'),

    appleWebApp: {
      title: 'GreenBus',
      capable: true,
      statusBarStyle: 'default',
    },

    manifest: '/manifest.json',

    robots: {
      index: false,
      follow: false,
      nocache: false,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    metadataBase: new URL('https://greenbus.com.ua'),

    alternates: {
      canonical: `/${lng}/checkout`,
      languages: {
        'x-default': '/uk/checkout',
        uk: '/uk/checkout',
        en: '/en/checkout',
        ru: '/ru/checkout',
      },
    },

    openGraph: {
      images: '/logo.png',
    },
  };
}

export default async function Checkout() {
  const t = await getTranslations(MESSAGE_FILES.CHECKOUT_PAGE);

  return (
    <>
      <main role="main" className="pb-16 grow bg-slate-50 dark:bg-slate-900">
        <section>
          <h1 className="sr-only">{t('h1')}</h1>
          <Container size="l" className="tablet:max-w-[960px] laptop:max-w-[1368px]">
            <div className="my-4 laptop:my-8">
              <BackRouteButton />
            </div>
            <Timer />
            <Cleanup />
            <CheckoutForm />
          </Container>
        </section>
      </main>
      <ThirdFooter />
    </>
  );
}
