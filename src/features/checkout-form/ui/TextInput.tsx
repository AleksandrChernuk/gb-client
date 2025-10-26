'use client';

import { Input } from '@/shared/ui/input';
import { useTranslations } from 'next-intl';
import { useController, useFormContext } from 'react-hook-form';
import { FormControl, FormItem, FormLabel } from '@/shared/ui/form';
import { memo } from 'react';
import { FieldConfig } from '../../../shared/types/checkot.types';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { FormErrorMassege } from '@/shared/ui/form-error';
import { cn } from '@/shared/lib/utils';

type Props = {
  name: string;
  config: FieldConfig;
};

const TextInput = memo(function TextInput({ name, config }: Props) {
  const { control } = useFormContext();
  const t_forms = useTranslations(MESSAGE_FILES.FORM);

  const {
    field: { value, onChange, onBlur, ref },
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
          ref={ref}
          type="text"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={config.placeholder && t_forms(config.placeholder)}
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
});

export default TextInput;
