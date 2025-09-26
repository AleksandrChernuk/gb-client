/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client';

import { useTranslations } from 'next-intl';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { useMemo } from 'react';
import { useSelectedTickets } from '@/shared/store/useSelectedTickets';
import { getProviderConfigByName } from '@/features/checkout-form/config';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import PassengerCard from '@/entities/checkout/PassengerCard';
import StepNumber from '@/entities/checkout/StepNumber';

export default function Passengers() {
  const t_new_order = useTranslations(MESSAGE_FILES.CHECKOUT_PAGE);
  const { control } = useFormContext();
  const { fields } = useFieldArray({ control, name: 'passengers' });
  const ticket = useSelectedTickets((state) => state.selectedTicket);
  const providerConfig = useMemo(() => getProviderConfigByName(ticket), [ticket]);

  return (
    <ul className="space-y-4">
      <li className="flex items-center gap-2">
        <StepNumber step={1} />
        <h3 className="text-base font-bold leading-6 tracking-normal tablet:text-2xl tablet:font-medium tablet:leading-[28.8px] text-slate-700 dark:text-slate-50">
          {t_new_order('passengers')}
        </h3>
      </li>
      <li>
        <ul className="space-y-6">
          {fields.map((field, i) => (
            //@ts-ignore
            <PassengerCard isChild={field.isChildren} i={i} key={field.id} providerConfig={providerConfig} />
          ))}
        </ul>
      </li>
    </ul>
  );
}
