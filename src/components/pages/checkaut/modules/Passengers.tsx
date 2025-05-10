'use client';

import { useTranslations } from 'next-intl';
import StepNumber from '../components/StepNumber';
import { MESSAGE_FILES } from '@/constans/message.file.constans';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { PassengetItem } from '../components/PassengetItem';

export default function Passengers() {
  const t_new_order = useTranslations(MESSAGE_FILES.CHECKOUT_PAGE);
  const { control } = useFormContext();
  const { fields } = useFieldArray({ control, name: 'passengers' });

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
            <PassengetItem key={i} i={i} />
          ))}
        </ul>
      </li>
    </ul>
  );
}
