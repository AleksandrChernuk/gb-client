import { CustomCard } from '@/components/shared/CustomCard';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { FormErrorMassege } from '@/components/ui/form-error';
import { Input } from '@/components/ui/input';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import BirthdayInput from './BdayInput';
import { useTranslations } from 'next-intl';
import { MESSAGE_FILES } from '@/constans/message.file.constans';
import { DocumentTypeSelect } from './DocumentTypeSelect';
import { DiscountSelect } from './DiscountSelect';
import { useCurrentTicketStore } from '@/store/useCurrentTicket';

export const PassengetItem = ({ i }: { i: number }) => {
  const { control } = useFormContext();
  const t_forms = useTranslations(MESSAGE_FILES.FORM);
  const selectedTicket = useCurrentTicketStore((state) => state.selectedTicket);

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

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0">
            <FormField
              control={control}
              name={`passengers.${i}.document.type`}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Документ</FormLabel>
                  <FormControl>
                    <DocumentTypeSelect
                      setValue={field.onChange}
                      value={field.value}
                      error={Boolean(fieldState?.error)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="pl-20">
            <FormField
              control={control}
              name={`passengers.${i}.document.number`}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-white dark:text-slate-800">Документ</FormLabel>
                  <FormControl>
                    <Input {...field} className="rounded-none rounded-l-0 rounded-r-md" />
                  </FormControl>
                  {Boolean(fieldState?.error) && (
                    <FormErrorMassege>{t_forms(`${fieldState.error?.message}`)}</FormErrorMassege>
                  )}
                </FormItem>
              )}
            />
          </div>
        </div>

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

        {(!selectedTicket?.details?.discounts || selectedTicket?.details?.discounts.length !== 0) && (
          <FormField
            control={control}
            name={`passengers.${i}.discount`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-2 text-sm font-normal tracking-normal leading-[21px]">Скидки</FormLabel>
                <FormControl>
                  <DiscountSelect setValue={field.onChange} value={field.value} />
                </FormControl>
              </FormItem>
            )}
          />
        )}
      </CustomCard>
    </li>
  );
};
