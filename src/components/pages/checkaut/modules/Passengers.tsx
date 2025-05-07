'use client';

import { useTranslations } from 'next-intl';
import StepNumber from '../components/StepNumber';
import { MESSAGE_FILES } from '@/constans/message.file.constans';
import { PassengersList } from '../components/PassengersList';

export default function Passengers() {
  const t_new_order = useTranslations(MESSAGE_FILES.CHECKOUT_PAGE);

  return (
    <ul className="space-y-4">
      <li className="flex items-center gap-2">
        <StepNumber step={1} />
        <h3 className="text-base font-bold leading-6 tracking-normal tablet:text-2xl tablet:font-medium tablet:leading-[28.8px] text-slate-700 dark:text-slate-50">
          {t_new_order('passengers')}
        </h3>
      </li>
      <li>
        <PassengersList />
      </li>
    </ul>
  );
}
