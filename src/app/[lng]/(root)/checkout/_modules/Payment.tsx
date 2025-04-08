'use client';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useFormContext } from 'react-hook-form';

import { useTranslations } from 'next-intl';
import IconMoney from './icons/IconMoney';
import IconBankCard from './icons/IconBankCard';

const PAYMENT_TYPES = [
  {
    ID: '1',
    VALUE: 'booking',
    ICON: <IconMoney />,
    INTL_KEY: 'booking',
  },
  {
    ID: '2',
    VALUE: 'card',
    ICON: <IconBankCard />,
    INTL_KEY: 'bank_card',
  },
  {
    ID: '3',
    VALUE: 'on_boarding',
    ICON: <IconMoney />,
    INTL_KEY: 'payment_upon_boarding',
  },
];

export default function Payment() {
  const { control } = useFormContext();
  const t = useTranslations('new_order');
  return (
    <FormField
      control={control}
      name="payment"
      render={({ field }) => (
        <FormItem className="border rounded-lg border-slate-200 dark:bg-slate-900 dark:border-slate-700">
          <FormControl>
            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col ">
              {PAYMENT_TYPES.map(({ ICON, VALUE, ID, INTL_KEY }) => (
                <FormItem
                  key={ID}
                  className="flex items-center p-4 space-x-3 space-y-0 border-b border-solid border-slate-200 last:border-b-0 dark:border-b-slate-700"
                >
                  <FormControl>
                    <RadioGroupItem value={VALUE} />
                  </FormControl>
                  <FormLabel className="flex items-center w-full space-x-3 font-normal cursor-pointer">
                    <span className="text-base font-medium leading-4 tracking-normal laptop:text-base laptop:font-bold laptop:leading-6 text-slate-700 dark:text-slate-50">
                      {t(INTL_KEY)}
                    </span>
                    <div className="size-6">{ICON}</div>
                  </FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
