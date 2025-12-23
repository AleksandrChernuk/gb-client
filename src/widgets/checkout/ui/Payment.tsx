'use client';

import { FormControl, FormItem, FormLabel, FormMessage } from '@/shared/ui/form';
import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { useSelectedTickets } from '@/shared/store/useSelectedTickets';
import { useNewOrderResult } from '@/shared/store/useOrderResult';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { PAYMENT_TYPES } from '@/shared/constans/payment.methods.constans';
import { useShallow } from 'zustand/react/shallow';

const Payment = () => {
  const { control } = useFormContext();
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name: 'payment',
    control,
    rules: { required: true },
  });
  const t = useTranslations(MESSAGE_FILES.CHECKOUT_PAGE);

  const { selectedTicket } = useSelectedTickets(
    useShallow((state) => ({
      selectedTicket: state.selectedTicket?.route,
    })),
  );

  const loadingResult = useNewOrderResult((state) => state.loadingResult);

  return (
    <FormItem
      className="border rounded-lg border-slate-200 dark:bg-slate-900 dark:border-slate-700"
      aria-invalid={!!error}
    >
      <FormControl>
        <RadioGroup
          disabled={loadingResult}
          value={value}
          onValueChange={(value) => {
            onChange(value);
          }}
          defaultValue={value}
          className="flex flex-col "
        >
          <FormItem className="flex items-center p-4 space-x-3 space-y-0 border-b border-solid border-slate-200 last:border-b-0 dark:border-b-slate-700">
            <FormControl>
              <RadioGroupItem checked={value === PAYMENT_TYPES[0].VALUE} value={PAYMENT_TYPES[0].VALUE} />
            </FormControl>
            <FormLabel className="flex items-center w-full space-x-3 font-normal cursor-pointer">
              <span className="text-base font-medium leading-4 tracking-normal laptop:text-base laptop:font-bold laptop:leading-6 text-slate-700 dark:text-slate-50">
                {t(PAYMENT_TYPES[0].INTL_KEY)}
              </span>
              <div className="size-6">{PAYMENT_TYPES[0].ICON}</div>
            </FormLabel>
          </FormItem>

          {selectedTicket?.allowedOperations.canPaymentToDriver &&
            selectedTicket?.providerName !== 'KLR' &&
            selectedTicket.carrier.name !== 'САНСАН БУС ТОВ' &&
            selectedTicket.carrier.name !== 'ТУРЮКРЕЙН ТОВ' && (
              <FormItem className="flex items-center p-4 space-x-3 space-y-0 border-b border-solid border-slate-200 last:border-b-0 dark:border-b-slate-700">
                <FormControl>
                  <RadioGroupItem value={PAYMENT_TYPES[1].VALUE} checked={value === PAYMENT_TYPES[1].VALUE} />
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
  );
};

export default Payment;
