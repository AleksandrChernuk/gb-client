export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import ProfileOrdersList from '@/widgets/profile-orders-list';
import { getTranslations } from 'next-intl/server';

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
