import { CustomCard } from '@/components/shared/CustomCard';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { FormErrorMassege } from '@/components/ui/form-error';
import { Input } from '@/components/ui/input';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import BirthdayInput from './BdayInput';
import { useTranslations } from 'next-intl';
import { MESSAGE_FILES } from '@/constans/message.file.constans';
import { DocumentInput } from './DocumentTypeSelect';
import DiscountSelect from './DiscountSelect';
import CitizenshipSelect from './CitizenshipSelect';

export const PassengetItem = ({ i }: { i: number }) => {
  const { control } = useFormContext();
  const t_forms = useTranslations(MESSAGE_FILES.FORM);

  return (
    <li>
      <CustomCard className="dark:bg-slate-800 grid rid-cols-1 lg:grid-cols-2 tablet:grid-rows- gap-4">
        <FormField
          control={control}
          name={`passengers.${i}.name`}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className="mb-2 text-sm font-normal tracking-normal leading-[21px]">
                {t_forms('name')}
              </FormLabel>
              <FormControl>
                <Input {...field} type="text" placeholder={t_forms('name_placeholder')} />
              </FormControl>
              {Boolean(fieldState?.error) && (
                <FormErrorMassege>{t_forms(`${fieldState.error?.message}`)}</FormErrorMassege>
              )}
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={`passengers.${i}.surname`}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>{t_forms('surname')}</FormLabel>
              <FormControl>
                <Input {...field} type="text" placeholder={t_forms('surname_placeholder')} />
              </FormControl>
              {Boolean(fieldState?.error) && (
                <FormErrorMassege>{t_forms(`${fieldState.error?.message}`)}</FormErrorMassege>
              )}
            </FormItem>
          )}
        />

        <DocumentInput
          name={{
            type: `passengers.${i}.document.type`,
            number: `passengers.${i}.document.number`,
          }}
          control={control}
        />

        <FormField
          control={control}
          name={`passengers.${i}.dob`}
          render={({ field, fieldState }) => {
            return (
              <FormItem>
                <FormLabel className="mb-2 text-sm font-normal tracking-normal leading-[21px]">
                  {t_forms('dob')}
                </FormLabel>
                <FormControl>
                  <BirthdayInput handleSet={field.onChange} error={Boolean(fieldState?.error)} />
                </FormControl>
                {Boolean(fieldState?.error) && (
                  <FormErrorMassege>{t_forms(`${fieldState.error?.message}`)}</FormErrorMassege>
                )}
              </FormItem>
            );
          }}
        />

        <FormField
          control={control}
          name={`passengers.${i}.notes`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mb-2 text-sm font-normal tracking-normal leading-[21px]">
                {t_forms('notes')}
              </FormLabel>
              <FormControl>
                <Input {...field} type="text" />
              </FormControl>
            </FormItem>
          )}
        />

        <CitizenshipSelect name={`passengers.${i}.citizenship`} />

        <DiscountSelect name={`passengers.${i}.discount`} control={control} />
      </CustomCard>
    </li>
  );
};
