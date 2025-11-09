import { Params } from '@/shared/types/common.types';
import { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import ThirdFooter from '@/widgets/footer/ThirdFooter';

import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { Container } from '@/shared/ui/Container';
import BackRouteButton from '@/shared/ui/BackRouteButton';
import Cleanup from '@/features/checkout-form/ui/Cleanup';
import CheckoutForm from '@/widgets/checkout';
import { generatePrivatePageMetadata } from '@/shared/lib/metadata';

type Props = {
  params: Params;
};

export async function generateMetadata({ params }: Props) {
  const { lng } = (await params) as { lng: Locale };
  return await generatePrivatePageMetadata({
    lng,
    namespace: MESSAGE_FILES.METADATA,
    slug: 'checkout',
    path: 'checkout',
  });
}

export default async function Checkout() {
  const t = await getTranslations(MESSAGE_FILES.CHECKOUT_PAGE);

  return (
    <>
      <main role="main" className="pb-16 grow bg-slate-50 dark:bg-slate-900 flex-1">
        <section>
          <h1 className="sr-only">{t('h1')}</h1>
          <Container size="l" className="tablet:max-w-[960px] laptop:max-w-[1368px]">
            <div className="my-4 laptop:my-8">
              <BackRouteButton />
            </div>

            <Cleanup />
            <CheckoutForm />
          </Container>
        </section>
      </main>
      <ThirdFooter />
    </>
  );
}
