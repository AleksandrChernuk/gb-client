'use client';

import { UserOrdersType } from '@/types/payments.Info.types';
import { useTranslations } from 'next-intl';
import { MESSAGE_FILES } from '@/config/message.file.constans';
import { format } from 'date-fns';
import Link from 'next/link';

type Props = {
  item: UserOrdersType;
};

const CLS = {
  label: 'block text-xs tablet:text-sm font-medium text-slate-500 dark:text-slate-300',
  value: 'text-sm tablet:text-base font-medium text-slate-700 dark:text-slate-50 break-words',
  list: 'space-y-1 text-xs tablet:text-sm text-slate-700 dark:text-slate-50',
};

export default function OrderDetails({ item }: Props) {
  const t = useTranslations(MESSAGE_FILES.PROFILE);

  return (
    <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
      <div>
        <span className={CLS.label}>{t('order_number')}</span>
        <span className={CLS.value}>{item.orderNumber.padStart(9, '0')}</span>
      </div>

      {item.routeName && (
        <div>
          <span className={CLS.label}>{t('route')}</span>
          <span className={CLS.value}>{item.routeName}</span>
        </div>
      )}

      {item.paymentDate && (
        <div>
          <span className={CLS.label}>{t('payment_date')}</span>
          <span className={CLS.value}>{format(item.paymentDate, 'dd.MM.yyyy HH:mm')}</span>
        </div>
      )}

      {item.reserveExpiresAt && (
        <div>
          <span className={CLS.label}>{t('reserve_expires_at')}</span>
          <span className={CLS.value}>{format(item.reserveExpiresAt, 'dd.MM.yyyy HH:mm')}</span>
        </div>
      )}

      {item.refundDate && (
        <div>
          <span className={CLS.label}>{t('refund_date')}</span>
          <span className={CLS.value}>{format(item.refundDate, 'dd.MM.yyyy HH:mm')}</span>
        </div>
      )}

      {item.totalRefundAmount && item.totalRefundAmount !== '0' && (
        <div>
          <span className={CLS.label}>{t('refund_amount')}</span>
          <span className={CLS.value}>{item.totalRefundAmount}</span>
        </div>
      )}

      {item.carrierName && (
        <div>
          <span className={CLS.label}>{t('carrier')}</span>
          <span className={CLS.value}>{item.carrierName}</span>
        </div>
      )}

      {item.carrierPhone && (
        <div>
          <span className={CLS.label}>{t('carrier_phone')}</span>
          <div className="flex flex-col gap-1">
            {item.carrierPhone.split(',').map((phone, idx) => (
              <Link key={idx} href={`tel:${phone.trim()}`} className={CLS.value + ' hover:underline'}>
                {phone.trim()}
              </Link>
            ))}
          </div>
        </div>
      )}

      {item.busModel && (
        <div>
          <span className={CLS.label}>{t('bus_model')}</span>
          <span className={CLS.value}>{item.busModel}</span>
        </div>
      )}

      {item.busNumber && (
        <div>
          <span className={CLS.label}>{t('bus_number')}</span>
          <span className={CLS.value}>{item.busNumber}</span>
        </div>
      )}

      {item.baggageRules?.length ? (
        <div>
          <span className={CLS.label}>{t('baggage_rules')}</span>
          <ul className={CLS.list}>
            {item.baggageRules.map((rule, idx) => (
              <li key={idx}>{rule}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {item.refundRules?.length ? (
        <div>
          <span className={CLS.label}>{t('refund_rules')}</span>
          <ul className={CLS.list}>
            {item.refundRules.map((rule, idx) => (
              <li key={idx}>{rule}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
