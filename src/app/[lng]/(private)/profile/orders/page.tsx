export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { Locale } from '@/shared/i18n/locales';
import { generatePrivatePageMetadata } from '@/shared/lib/metadata';
import { Params } from '@/shared/types/common.types';
import ProfileOrdersList from '@/widgets/profile-orders-list';
import { getTranslations } from 'next-intl/server';

type Props = {
  params: Params;
};

export async function generateMetadata({ params }: Props) {
  const { lng } = (await params) as { lng: Locale };
  return generatePrivatePageMetadata({
    lng,
    namespace: MESSAGE_FILES.METADATA,
    slug: 'profile',
    path: '/profile/orders',
  });
}

const Orders = async () => {
  const t = await getTranslations(MESSAGE_FILES.PROFILE);

  return (
    <>
      <h1 className="mb-4">{t('orders')}</h1>
      <ProfileOrdersList />
    </>
  );
};

export default Orders;
