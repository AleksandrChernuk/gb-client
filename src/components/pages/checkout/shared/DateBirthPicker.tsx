'use client';

import * as React from 'react';
import { ChevronDownIcon, Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { FieldConfig } from '../providerConfig/types';
import { useController, useFormContext } from 'react-hook-form';
import useDateLocale from '@/hooks/useDateLocale';
import { MESSAGE_FILES } from '@/config/message.file.constans';
import { useTranslations } from 'next-intl';
import { Calendar } from '@/components/ui/calendar';
import { IconCalendar } from '@/assets/icons/IconCalendar';
import { FormControl, FormItem, FormLabel } from '@/components/ui/form';
import { format, isValid, parse } from 'date-fns';

type Props = {
  name: string;
  config: FieldConfig;
};
function parseDate(value: string): Date | undefined {
  if (!value) return undefined;
  const date = parse(value, 'yyyy-MM-dd', new Date());
  return isValid(date) ? date : undefined;
}
export function DateBirthPicker({ name, config }: Props) {
  const { locale } = useDateLocale();
  const { control } = useFormContext();
  const t_forms = useTranslations(MESSAGE_FILES.FORM);

  const {
    field: { value = '', onChange, ref },
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
        <div className="flex items-center gap-1 max-w-full  ">
          <div className="flex-1 h-full min-w-0">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild ref={ref}>
                <Button
                  variant="outline"
                  id="date"
                  aria-invalid={!!error}
                  className="flex justify-between h-auto rounded-md border border-slate-200 dark:border-slate-700 dark:hover:bg-black  dark:hover:border-slate-700 dark:focus:bg-slate-600 dark:focus:border-slate-900  bg-background px-2 py-3 text-sm font-normal leading-6 tracking-normal text-slate-700 dark:text-slate-50 disabled:cursor-not-allowed disabled:opacity-50 outline-hidden hover:bg-slate-50 hover:border-slate-200 focus:border-slate-700 focus:bg-white
         aria-invalid:ring-[#de2a1a] dark:aria-invalid:ring-[#de2a1a]
         aria-invalid:border-[#de2a1a] dark:aria-invalid:border-[#de2a1a]"
                >
                  <div className="flex items-center gap-2 truncate">
                    <IconCalendar />
                    {value ? value : t_forms(config.placeholder || '')}
                  </div>
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto overflow-hidden" align="start">
                <Calendar
                  mode="single"
                  selected={parseDate(value)}
                  captionLayout="dropdown"
                  onSelect={(date) => {
                    if (date) {
                      onChange(format(date, 'yyyy-MM-dd'));
                    }
                    setOpen(false);
                  }}
                  locale={locale}
                />
              </PopoverContent>
            </Popover>
          </div>

          {!!value && (
            <Button
              variant="ghost"
              className="flex w-fit py-1 cursor-pointer"
              onClick={() => {
                onChange('');
              }}
            >
              <Trash className="stroke-red-400 " />
            </Button>
          )}
        </div>
      </FormControl>

      {!!error && <div className="mt-1 text-xs text-red-500">{t_forms(`${error.message}`)}</div>}
    </FormItem>
  );
}
