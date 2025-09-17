export const dynamic = 'force-dynamic';
export const revalidate = 0;

import PaymentsPage from '@/components/pages/profile/payments';
import { MESSAGE_FILES } from '@/config/message.file.constans';
import { getTranslations } from 'next-intl/server';
import { unstable_noStore as noStore } from 'next/cache';

const Payments = async () => {
  const t = await getTranslations(MESSAGE_FILES.PROFILE);
  noStore();
  return (
    <div>
      <h1 className="mb-4">{t('payments')}</h1>
      <PaymentsPage />
    </div>
  );
};

export default Payments;
