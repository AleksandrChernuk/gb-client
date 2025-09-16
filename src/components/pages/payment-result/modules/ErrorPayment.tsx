import { MESSAGE_FILES } from '@/config/message.file.constans';
import { getTranslations } from 'next-intl/server';

function getPaymentStatusKey(msg?: string): string {
  if (!msg) return 'errors.default';

  switch (msg) {
    case 'Payment is pending':
    case 'BOARDING_PAY':
    case 'Order created':
      return 'errors.default';

    default:
      return `errors.${msg}`;
  }
}

type Props = {
  errorHeading: string;
  message: string;
};

export const ErrorPayment = async ({ message, errorHeading }: Props) => {
  const t = await getTranslations(MESSAGE_FILES.PAYMENT_RESULT_PAGE);

  return (
    <div className="text-center space-y-8">
      <h1 className="text-xl tablet:text-2xl text-center">{t(errorHeading)}</h1>
      <h3 className="text-center text-red-500 dark:text-red-300 text-lg tablet:text-xl">
        {t(getPaymentStatusKey(message))}
      </h3>
    </div>
  );
};
