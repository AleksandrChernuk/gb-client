'use client';

import { Input } from '@/components/ui/input';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { useController, useFormContext } from 'react-hook-form';
import { FormControl, FormItem, FormLabel } from '@/components/ui/form';
import { MESSAGE_FILES } from '@/constans/message.file.constans';
import { FieldConfig } from '../helpers/providerFieldsConfig';
import { FormErrorMassege } from '@/components/ui/form-error';

type Props = {
  name: string;
  config: FieldConfig;
};

export default function TextInput({ name, config }: Props) {
  const { control } = useFormContext();
  const t_forms = useTranslations(MESSAGE_FILES.FORM);

  const {
    field: { value, onChange, onBlur },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: { required: true },
  });

  return (
    <FormItem>
      <FormLabel>{t_forms(config.label)}</FormLabel>
      <FormControl>
        <Input
          type="text"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={t_forms(config.placeholder || '')}
          aria-invalid={!!error}
          inputMode="text"
          className={cn(
            `flex h-auto w-full rounded-md border border-slate-200 dark:border-slate-700 dark:hover:bg-black
            dark:hover:border-slate-700 dark:focus:bg-slate-600 dark:focus:border-slate-900 bg-background px-2
            py-3 text-sm font-normal leading-6 tracking-normal text-slate-700 dark:text-slate-50
            disabled:cursor-not-allowed disabled:opacity-50 outline-hidden hover:bg-slate-50
            hover:border-slate-200 focus:border-slate-700 focus:bg-white
            aria-invalid:ring-[#de2a1a] dark:aria-invalid:ring-[#de2a1a]
            aria-invalid:border-[#de2a1a] dark:aria-invalid:border-[#de2a1a]`,
          )}
          autoComplete="off"
        />
      </FormControl>
      {!!error && <FormErrorMassege>{t_forms(`${error.message}`)}</FormErrorMassege>}
    </FormItem>
  );
}
