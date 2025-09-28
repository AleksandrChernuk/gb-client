export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { getTranslations } from 'next-intl/server';
import ProfilePaymentsList from '@/widgets/profile-payments-list';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { generatePrivatePageMetadata } from '@/shared/lib/metadata';
import { Params } from '@/shared/types/common.types';
import { Locale } from '@/shared/i18n/locales';

type Props = {
  params: Params;
};

export async function generateMetadata({ params }: Props) {
  const { lng } = (await params) as { lng: Locale };
  return generatePrivatePageMetadata({
    lng,
    namespace: MESSAGE_FILES.METADATA,
    slug: 'profile',
    path: '/profile/payment-info',
  });
}

const Payments = async () => {
  const t = await getTranslations(MESSAGE_FILES.PROFILE);
  return (
    <>
      <h1 className="mb-4">{t('payments')}</h1>
      <ProfilePaymentsList />
    </>
  );
};

export default Payments;
