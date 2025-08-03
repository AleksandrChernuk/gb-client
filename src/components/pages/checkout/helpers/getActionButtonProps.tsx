import { LoaderCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

type Props = {
  isError: boolean;
  paymentType: string;
  payLoading: boolean;
  t: ReturnType<typeof useTranslations>;
  handlePayOrder: () => void;
  handleConfirmlOrder: () => void;
  handleSMSValidation: () => void;
  hasSMSValidation: boolean;
  router: ReturnType<typeof useRouter>;
};

export function getActionButtonProps({ paymentType, payLoading, t, handlePayOrder, handleConfirmlOrder }: Props) {
  if (paymentType !== 'BOOK') {
    return {
      children: payLoading ? <LoaderCircle className="animate-spin" /> : t('payment_confirm_book'),
      variant: 'secondary' as const,
      size: 'primery' as const,
      onClick: handleConfirmlOrder,
      disabled: payLoading,
    };
  }

  return {
    children: payLoading ? <LoaderCircle className="animate-spin" /> : t('payment_confirm_pay'),
    variant: 'secondary' as const,
    size: 'primery' as const,
    onClick: handlePayOrder,
    disabled: payLoading,
  };
}
