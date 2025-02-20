"use client";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useFormContext } from "react-hook-form";
import IconBankCard from "../../icons/IconBankCard";
import IconMoney from "../../icons/IconMoney";
import { useTranslations } from "next-intl";


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
]

export default function Payment() {
  const { control } = useFormContext()
  const t = useTranslations('new_order')
  return (
    <FormField
      control={control}
      name='payment'
      render={({ field }) => (
        <FormItem className='border border-gray_1 rounded-lg dark:bg-dark_bg dark:border-black_2_for_text'>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className='flex flex-col '
            >
              {PAYMENT_TYPES.map(({ ICON, VALUE, ID, INTL_KEY }) => (
                <FormItem
                  key={ID}
                  className='flex items-center space-x-3 space-y-0 p-4 border-solid border-b border-gray_1 last:border-b-0 dark:border-b-black_2_for_text'
                >
                  <FormControl>
                    <RadioGroupItem value={VALUE} />
                  </FormControl>
                  <FormLabel className='font-normal w-full cursor-pointer flex items-center space-x-3'>
                    <span className='addional_medium_text laptop:h5 text-text_prymery'>
                      {t(INTL_KEY)}
                    </span>
                    <div className='size-6'>{ICON}</div>
                  </FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
