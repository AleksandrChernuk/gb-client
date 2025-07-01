'use client';

import * as React from 'react';
import { ChevronDownIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { FieldConfig } from '../helpers/providerConfig/types';
import { useController, useFormContext } from 'react-hook-form';
import useDateLocale from '@/hooks/useDateLocale';
import { MESSAGE_FILES } from '@/constans/message.file.constans';
import { useTranslations } from 'next-intl';
import { Calendar } from '@/components/ui/calendar';
import { IconCalendar } from '@/assets/icons/IconCalendar';
import { FormControl, FormItem, FormLabel } from '@/components/ui/form';

type Props = {
  name: string;
  config: FieldConfig;
};

export function DateBirthPicker({ name, config }: Props) {
  const { locale } = useDateLocale();
  const { control } = useFormContext();
  const t_forms = useTranslations(MESSAGE_FILES.FORM);

  const {
    field: { value = '', onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const [open, setOpen] = React.useState(false);

  return (
    <FormItem>
      <FormLabel>{t_forms(config.label)}</FormLabel>
      <FormControl>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date"
              aria-invalid={!!error}
              className="flex justify-between h-auto w-full rounded-md border border-slate-200 dark:border-slate-700 dark:hover:bg-black  dark:hover:border-slate-700 dark:focus:bg-slate-600 dark:focus:border-slate-900  bg-background px-2 py-3 text-sm font-normal leading-6 tracking-normal text-slate-700 dark:text-slate-50 disabled:cursor-not-allowed disabled:opacity-50 outline-hidden hover:bg-slate-50 hover:border-slate-200 focus:border-slate-700 focus:bg-white
         aria-invalid:ring-[#de2a1a] dark:aria-invalid:ring-[#de2a1a]
         aria-invalid:border-[#de2a1a] dark:aria-invalid:border-[#de2a1a]"
            >
              <div className="flex gap-2 items-center">
                <IconCalendar />
                {value ? value.toLocaleDateString() : config.placeholder ? t_forms(config.placeholder) : ''}
              </div>
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden" align="start">
            <Calendar
              mode="single"
              selected={value}
              captionLayout="dropdown"
              onSelect={(date) => {
                onChange(date);
                setOpen(false);
              }}
              locale={locale}
            />
          </PopoverContent>
        </Popover>
      </FormControl>
      {!!error && <div className="mt-1 text-xs text-red-500">{t_forms(`${error.message}`)}</div>}
    </FormItem>
  );
}
