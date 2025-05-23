'use client';

import { Input } from '@/components/ui/input';
import { useLocale, useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { IconCalendar } from '@/assets/icons/IconCalendar';
import { useController, useFormContext } from 'react-hook-form';
import { FormControl, FormItem, FormLabel } from '@/components/ui/form';
import { MESSAGE_FILES } from '@/constans/message.file.constans';
import { FieldConfig } from '../helpers/providerFieldsConfig';

type Props = {
  name: string;
  config: FieldConfig;
};

const placeholders = {
  en: 'DD/MM/YYYY',
  ru: 'ДД/ММ/ГГГГ',
  uk: 'ДД/ММ/РРРР',
};

export default function BirthdayInput({ name, config }: Props) {
  const locale = useLocale();
  const { control } = useFormContext();
  const t_forms = useTranslations(MESSAGE_FILES.FORM);

  const {
    field: { value = '', onChange, onBlur },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: { required: true },
  });

  // Форматируем ввод
  const formatInput = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 8);
    const day = digits.slice(0, 2);
    const month = digits.slice(2, 4);
    const year = digits.slice(4, 8);

    let res = day;
    if (month) res += '/' + month;
    if (year) res += '/' + year;
    return res;
  };

  // Отдаём RHF строку в формате YYYY-MM-DD
  const handleFormattedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatInput(e.target.value);

    onChange(formatted);
  };

  return (
    <FormItem>
      <FormLabel>{t_forms(config.label)}</FormLabel>
      <FormControl>
        <div className="relative">
          <Input
            type="text"
            value={value}
            onChange={handleFormattedChange}
            onBlur={onBlur}
            aria-invalid={!!error}
            inputMode="numeric"
            placeholder={placeholders[locale] || 'DD/MM/YYYY'}
            className={cn(
              `flex h-auto w-full rounded-md border border-slate-200 dark:border-slate-700 dark:hover:bg-black
            dark:hover:border-slate-700 dark:focus:bg-slate-600 dark:focus:border-slate-900 bg-background
            py-3 text-sm font-normal leading-6 tracking-normal text-slate-700 dark:text-slate-50
            disabled:cursor-not-allowed disabled:opacity-50 outline-hidden hover:bg-slate-50
            hover:border-slate-200 focus:border-slate-700 focus:bg-white pl-10
            aria-invalid:ring-[#de2a1a] dark:aria-invalid:ring-[#de2a1a]
            aria-invalid:border-[#de2a1a] dark:aria-invalid:border-[#de2a1a]`,
            )}
            autoComplete="off"
            maxLength={10}
          />
          <div className="absolute transform -translate-y-1/2 pointer-events-none left-2    top-1/2">
            <IconCalendar />
          </div>
        </div>
      </FormControl>
      {!!error && <div className="mt-1 text-xs text-red-500">{t_forms(`${error.message}`)}</div>}
    </FormItem>
  );
}
