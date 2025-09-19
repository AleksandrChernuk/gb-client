import { TRANSLATION_KEYS } from '@/i18n/ translationKeys';
import { MetaField } from '../../common/components/MetaField';
import { S } from '../../common/styles/style';

type TRefundCard = { updatedAt: string; route: string; providerLabel: string; amount: string };

const RefundCard = ({ updatedAt, route, providerLabel, amount }: TRefundCard) => {
  return (
    <div className={S.refundCard}>
      <MetaField label={TRANSLATION_KEYS.profile.payment_refundDate} value={updatedAt} />

      <MetaField label={TRANSLATION_KEYS.profile.payment_refundRoute} value={route} />

      <MetaField label={TRANSLATION_KEYS.profile.payment_refundProvider} value={providerLabel} />

      <MetaField label={TRANSLATION_KEYS.profile.payment_refundAmount} value={amount} />
    </div>
  );
};

export default RefundCard;
