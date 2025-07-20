/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client';

import { useTranslations } from 'next-intl';
import StepNumber from '../components/StepNumber';
import { MESSAGE_FILES } from '@/constans/message.file.constans';
import { useFieldArray, useFormContext } from 'react-hook-form';
import PassengerCard from '../shared/PassengerCard';
import { useMemo } from 'react';
import { getProviderConfigByName } from '../helpers/providerConfig';
import { useSelectedTickets } from '@/store/useSelectedTickets';

export default function Passengers() {
  const t_new_order = useTranslations(MESSAGE_FILES.CHECKOUT_PAGE);
  const { control } = useFormContext();
  const { fields } = useFieldArray({ control, name: 'passengers' });
  console.log(fields);
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
