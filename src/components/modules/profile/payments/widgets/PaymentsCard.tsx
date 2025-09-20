'use client';

import { ChevronDown, User as UserIcon } from 'lucide-react';
import { UserCustomerType, UserPaymentType } from '@/types/payments.Info.types';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import RefundCard from './RefundCard';
import {
  formatDatePayment,
  formatMoney,
  formatOrderNumber,
  formatProviderLabel,
  getRoute,
  transformFullName,
} from '../../common/helpers';
import { S } from '../../common/styles/style';
import { TRANSLATION_KEYS } from '@/i18n/translationKeys';
import { MetaField } from '../../common/components/MetaField';
import { useTranslations } from 'next-intl';

type Props = {
  item: UserPaymentType;
  customer: UserCustomerType;
};

export default function PaymentsCard({ item, customer }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const t = useTranslations();

  const handleToogleOPnen = () => {
    setIsOpen((p) => !p);
  };

  return (
    <div className={S.card}>
      <div className="flex gap-2 flex-row items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <div className={S.avatar}>
            <UserIcon className="size-5 text-slate-500 dark:text-slate-300" />
          </div>
          <div className="min-w-0">
            <p className={S.label}>{t(TRANSLATION_KEYS.profile.payment_payer)}</p>
            <p className="truncate text-lg laptop:text-xl font-semibold text-slate-900 dark:text-white">
              {transformFullName(customer.lastName, customer.firstName, customer.middleName)}
            </p>
          </div>
        </div>

        <div className="flex items-end md:items-center gap-6 flex-wrap">
          <div>
            <p className={S.label}>{t(TRANSLATION_KEYS.profile.payment_amount)}</p>
            <p className="text-lg laptop:text-xl font-semibold text-slate-900 dark:text-white">
              {formatMoney(item.paymentAmount, item.currency)}
            </p>
          </div>
        </div>
      </div>

      <div className="my-4 h-px w-full bg-slate-200 dark:bg-slate-700" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetaField label={TRANSLATION_KEYS.profile.payment_orderNumber} value={formatOrderNumber(item.myOrderNumber)} />

        <MetaField label={TRANSLATION_KEYS.profile.payment_paymentDate} value={formatDatePayment(item.updatedAt)} />

        <MetaField
          label={TRANSLATION_KEYS.profile.payment_route}
          value={getRoute(item.fromCityName, item.toCityName)}
        />

        <MetaField
          label={TRANSLATION_KEYS.profile.payment_provider}
          value={formatProviderLabel(item.paymentProvider)}
        />
      </div>

      <div className={S.divider} />

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <MetaField label={TRANSLATION_KEYS.profile.payment_email} value={customer.phone} />

        <MetaField label={TRANSLATION_KEYS.profile.payment_email} value={customer?.phone} />

        {customer?.birthdate && (
          <MetaField label={TRANSLATION_KEYS.profile.payment_birthdate} value={customer.birthdate} />
        )}
      </div>

      {!!item.refunds.length && (
        <div className="flex justify-end">
          <Button variant="link" onClick={handleToogleOPnen} className={S.detailsBtn}>
            <span>{t(TRANSLATION_KEYS.profile.payment_refunds)}</span>
            <ChevronDown size={16} className={`${S.chevron} ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
          </Button>
        </div>
      )}

      <div className={`${S.collapse} ${isOpen ? S.collapseOpen : S.collapseClosed}`}>
        {isOpen && (
          <div className="mt-4">
            {item.refunds.map((r) => (
              <RefundCard
                key={r.refundId}
                updatedAt={formatDatePayment(r.updatedAt)}
                route={getRoute(r.fromCityName, r.toCityName)}
                providerLabel={formatProviderLabel(r.refundProvider)}
                amount={formatMoney(r.refundAmount, r.currency)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
