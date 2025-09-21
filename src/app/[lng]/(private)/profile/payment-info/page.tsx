export const dynamic = 'force-dynamic';
export const revalidate = 0;

import PaymentsPage from '@/components/modules/profile/payments';
import { MESSAGE_FILES } from '@/config/message.file.constans';
import { getTranslations } from 'next-intl/server';

const Payments = async () => {
  const t = await getTranslations(MESSAGE_FILES.PROFILE);
  return (
    <>
      <h1 className="mb-4">{t('payments')}</h1>
      <PaymentsPage />
    </>
  );
};

export default Payments;
