export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { getTranslations } from 'next-intl/server';
import ProfilePaymentsList from '@/widgets/profile-payments-list';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';

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
