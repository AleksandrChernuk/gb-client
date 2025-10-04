'use client';

import { UserOrdersType } from '@/shared/types/payments.Info.types';
import { useTranslations } from 'next-intl';
import { format } from 'date-fns';
import { ReactElement } from 'react';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { MetaField } from '@/entities/profile/MetaField';
import { TRANSLATION_KEYS } from '@/shared/i18n/translationKeys';
import { Link } from '@/shared/i18n/routing';
import { S } from '@/styles/style';
import { formatMoney } from '@/shared/utils/route.details.helper';

type Props = {
  item: UserOrdersType;
  tickets?: ReactElement;
  orderStatus?: string;
};

const CLS = {
  label: 'block text-xs tablet:text-sm font-medium dark:text-green-100 text-green-200 mb-1',
  value: 'text-sm tablet:text-base font-medium text-slate-700 dark:text-slate-50 break-words',
  list: 'space-y-1 text-xs tablet:text-sm text-slate-700 dark:text-slate-50',
};

export default function OrderDetails({ item, tickets, orderStatus }: Props) {
  const t = useTranslations();
  const tpr = useTranslations(MESSAGE_FILES.PAYMENT_RESULT_PAGE);

  return (
    <div className="grid grid-cols-2 tablet:grid-cols-3 gap-4">
      {item.routeName && <MetaField label={TRANSLATION_KEYS.profile.route} value={item.routeName} />}
      {item.paymentDate && (
        <MetaField
          label={TRANSLATION_KEYS.profile.payment_date}
          value={format(item.paymentDate, 'dd.MM.yyyy, HH:mm')}
        />
      )}
      {item.reserveExpiresAt && (
        <MetaField
          label={TRANSLATION_KEYS.profile.reserve_expires_at}
          value={format(item.reserveExpiresAt, 'dd.MM.yyyy, HH:mm')}
        />
      )}
      {item.refundDate && (
        <MetaField label={TRANSLATION_KEYS.profile.refund_date} value={format(item.refundDate, 'dd.MM.yyyy, HH:mm')} />
      )}
      {item.totalRefundAmount && item.totalRefundAmount !== '0' && (
        <MetaField
          label={TRANSLATION_KEYS.profile.refund_amount}
          value={formatMoney(item.totalRefundAmount, item.currency)}
        />
      )}

      {item.carrierName && <MetaField label={TRANSLATION_KEYS.profile.carrier} value={item.carrierName} />}

      {item.carrierPhone && (
        <div>
          <p className={S.label}>{t(TRANSLATION_KEYS.profile.carrier_phone)}</p>
          <div className="flex flex-col gap-1">
            {item.carrierPhone.split(',').map((phone, idx) => (
              <Link
                key={idx}
                href={`tel:${phone.trim()}`}
                className={S.value + ' hover:underline'}
                target="_blank"
                rel="nofollow noopener noreferrer"
              >
                {phone.trim()}
              </Link>
            ))}
          </div>
        </div>
      )}
      {item.busModel && <MetaField label={TRANSLATION_KEYS.profile.bus_model} value={item.busModel} />}

      {item.busNumber && <MetaField label={TRANSLATION_KEYS.profile.bus_number} value={item.busNumber} />}

      {item.baggageRules?.length ? (
        <div className="col-span-2">
          <p className={CLS.label}>{t(TRANSLATION_KEYS.profile.baggage_rules)}</p>
          <ul className={CLS.list}>
            {item.baggageRules.map((rule, idx) => (
              <li key={idx}>{<MetaField classNamesValue="text-[12px]" value={rule} />}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {item.refundRules?.length ? (
        <div className="col-span-2">
          <span className={CLS.label}>{t(TRANSLATION_KEYS.profile.refund_rules)}</span>
          <ul className={CLS.list}>
            {item.refundRules.map((rule, idx) => (
              <li key={idx}>
                <MetaField value={rule} classNamesValue="text-[12px]" />
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {orderStatus && (
        <MetaField label={TRANSLATION_KEYS.profile.payment_status} value={tpr(`errors.${orderStatus}`)} />
      )}

      {!!tickets && (
        <div className="col-span-2 sm:col-span-1">
          <div className={CLS.list}>{tickets}</div>
        </div>
      )}
    </div>
  );
}
