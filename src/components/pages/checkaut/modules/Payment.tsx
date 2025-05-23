'use client';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useFormContext } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { MESSAGE_FILES } from '@/constans/message.file.constans';
import { PAYMENT_TYPES } from '@/constans/payment.methods.constans';

const Payment = () => {
  const { control } = useFormContext();
  const t = useTranslations(MESSAGE_FILES.CHECKOUT_PAGE);
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
};

export default Payment;
