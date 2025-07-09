'use client';

import * as React from 'react';
import { ChevronDownIcon,   X } from 'lucide-react';

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
import { format, isBefore, isValid, parse, subDays, subYears } from 'date-fns';

type Props = {
  name: string;
  config: FieldConfig;
};
function parseDate(value: string): Date | undefined {
  if (!value) return undefined;
  const date = parse(value, 'dd.MM.yyyy', new Date());
  return isValid(date) ? date : undefined;
}
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

  const date = parse(value, 'dd.MM.yyyy', new Date());

  console.log('date', date);

  const now = new Date();
  console.log('subDays(now, 1)', subDays(now, 1));

  console.log('subYears(now, 80)', subYears(now, 80));
  console.log(
    'isBefore(minDate, date) === false && isBefore(date, maxDate)',
    isBefore(subYears(now, 80), date) === false && isBefore(date, subDays(now, 1)),
  );
  const [open, setOpen] = React.useState(false);
  console.log(value);
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
              <div className="relative flex w-full justify-between">
                <div className="flex gap-2 items-center">
                  <IconCalendar />
                  {value ? value : t_forms(config.placeholder || '')}
                </div>

                <div>
                  {value && (
                    <div
                      className="absolute right-10 top-0 bottom-0 z-50 cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onChange('');
                      }}
                    >
                      <X className="stroke-green-300" size={24} />
                    </div>
                  )}

                  <ChevronDownIcon className="stroke-green-300" />
                </div>
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden" align="start">
            <Calendar
              mode="single"
              selected={parseDate(value)}
              captionLayout="dropdown"
              onSelect={(date) => {
                if (date) {
                  onChange(format(date, 'dd.MM.yyyy'));
                }
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
