'use client';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useFormContext } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { MESSAGE_FILES } from '@/constans/message.file.constans';
import { PAYMENT_TYPES } from '@/constans/payment.methods.constans';
import { useCurrentTicket } from '@/store/useCurrentTicket';
import useCreateOrder from '../hooks/useCreateOrder';
import { useOrderResult } from '@/store/useOrderResult';

const Payment = () => {
  const { control, trigger } = useFormContext();
  const t = useTranslations(MESSAGE_FILES.CHECKOUT_PAGE);
  const selectedTicket = useCurrentTicket((state) => state.selectedTicket);
  const { createNewOrder } = useCreateOrder();
  const loadingResult = useOrderResult((state) => state.loadingResult);

  return (
    <FormField
      control={control}
      name="payment"
      render={({ field, fieldState }) => (
        <FormItem
          className="border rounded-lg border-slate-200 dark:bg-slate-900 dark:border-slate-700"
          aria-invalid={!!fieldState.error}
        >
          <FormControl>
            <RadioGroup
              disabled={loadingResult}
              value={field.value}
              onValueChange={async (value) => {
                const isValid = await trigger(['passengers', 'email', 'phone', 'selected_seats']);
                if (!isValid) return;
                field.onChange(value);
                await createNewOrder();
              }}
              defaultValue={field.value}
              className="flex flex-col "
            >
              <FormItem className="flex items-center p-4 space-x-3 space-y-0 border-b border-solid border-slate-200 last:border-b-0 dark:border-b-slate-700">
                <FormControl>
                  <RadioGroupItem value={PAYMENT_TYPES[0].VALUE} />
                </FormControl>
                <FormLabel className="flex items-center w-full space-x-3 font-normal cursor-pointer">
                  <span className="text-base font-medium leading-4 tracking-normal laptop:text-base laptop:font-bold laptop:leading-6 text-slate-700 dark:text-slate-50">
                    {t(PAYMENT_TYPES[0].INTL_KEY)}
                  </span>
                  <div className="size-6">{PAYMENT_TYPES[0].ICON}</div>
                </FormLabel>
              </FormItem>

              {selectedTicket?.allowed_operations.can_payment_to_driver && (
                <FormItem className="flex items-center p-4 space-x-3 space-y-0 border-b border-solid border-slate-200 last:border-b-0 dark:border-b-slate-700">
                  <FormControl>
                    <RadioGroupItem value={PAYMENT_TYPES[1].VALUE} />
                  </FormControl>
                  <FormLabel className="flex items-center w-full space-x-3 font-normal cursor-pointer">
                    <span className="text-base font-medium leading-4 tracking-normal laptop:text-base laptop:font-bold laptop:leading-6 text-slate-700 dark:text-slate-50">
                      {t(PAYMENT_TYPES[1].INTL_KEY)}
                    </span>
                    <div className="size-6">{PAYMENT_TYPES[1].ICON}</div>
                  </FormLabel>
                </FormItem>
              )}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default Payment;
