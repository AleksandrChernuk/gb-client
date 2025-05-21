'use client';

import { useTranslations } from 'next-intl';
import StepNumber from '../components/StepNumber';
import { MESSAGE_FILES } from '@/constans/message.file.constans';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { UniversalField } from '../components/UniversalField';
import { useCurrentTicket } from '@/store/useCurrentTicket';
import { getProviderConfigByName } from '../helpers/providerFieldsConfig';
import { CustomCard } from '@/components/shared/CustomCard';

export default function Passengers() {
  const t_new_order = useTranslations(MESSAGE_FILES.CHECKOUT_PAGE);
  const { control } = useFormContext();
  const { fields } = useFieldArray({ control, name: 'passengers' });

  const ticket = useCurrentTicket((state) => state.selectedTicket);
  const providerConfig = getProviderConfigByName(ticket);

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
            <li key={field.id}>
              <CustomCard className="dark:bg-slate-800 space-y-2">
                <h3 className="text-sm  tablet:text-xl text-green-300">{`Пасажир №${i + 1}`}</h3>{' '}
                {providerConfig.required.map((fieldName) => (
                  <UniversalField
                    key={fieldName}
                    name={`passengers.${i}.${fieldName}`}
                    config={providerConfig.fields[fieldName]}
                  />
                ))}
                {providerConfig.optional.map((fieldName) => (
                  <UniversalField
                    key={fieldName}
                    name={`passengers.${i}.${fieldName}`}
                    config={providerConfig.fields[fieldName]}
                  />
                ))}
              </CustomCard>
            </li>
          ))}
        </ul>
      </li>
    </ul>
  );
}
