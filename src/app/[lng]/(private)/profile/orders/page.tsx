import OrdersPage from '@/components/pages/profile/orders';
import { MESSAGE_FILES } from '@/config/message.file.constans';
import { getTranslations } from 'next-intl/server';

const Orders = async () => {
  const t = await getTranslations(MESSAGE_FILES.PROFILE);

  return (
    <div>
      <h1 className="mb-4">{t('orders')}</h1>
      <OrdersPage />
    </div>
  );
};

export default Orders;
