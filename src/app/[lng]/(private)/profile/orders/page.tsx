export const dynamic = 'force-dynamic';
export const revalidate = 0;

import OrdersPage from '@/components/modules/profile/orders';
import { MESSAGE_FILES } from '@/config/message.file.constans';
import { getTranslations } from 'next-intl/server';

const Orders = async () => {
  const t = await getTranslations(MESSAGE_FILES.PROFILE);

  return (
    <>
      <h1 className="mb-4">{t('orders')}</h1>
      <OrdersPage />
    </>
  );
};

export default Orders;
