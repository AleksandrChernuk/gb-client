'use client';

import { memo, useMemo } from 'react';
import { useFormContext, useController } from 'react-hook-form';
import { FormControl, FormItem, FormLabel } from '@/components/ui/form';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger } from '@/components/ui/select';
import { useTranslations } from 'next-intl';
import { MESSAGE_FILES } from '@/constans/message.file.constans';
import countryList from 'react-select-country-list';
import { FieldConfig } from '../helpers/providerConfig/types';
import { FormErrorMassege } from '@/components/ui/form-error';
import { Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Props = {
  name: string;
  config: FieldConfig;
};

function CitizenshipSelect({ name, config }: Props) {
  const { control } = useFormContext();
  const t = useTranslations(MESSAGE_FILES.FORM);
  const options = useMemo(() => countryList().getData(), []);
  const t_forms = useTranslations(MESSAGE_FILES.FORM);

  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: { required: true },
  });
  console.log(config.placeholder);
  console.log(options.find((opt) => opt.value === value)?.label || t_forms(config.placeholder!));

  return (
    <FormItem>
      <FormLabel className="mb-2 text-sm font-normal leading-[21px]">{t(config.label)}</FormLabel>

      <FormControl>
        <div className="flex items-center gap-1 max-w-full">
          <div className="flex-1 h-full min-w-0">
            <Select value={value} onValueChange={onChange}>
              <SelectTrigger className="w-full mb-0" size="full" aria-invalid={!!error} value={value || ''}>
                {options.find((opt) => opt.value === value)?.label || t_forms(config.placeholder!)}
              </SelectTrigger>
              <SelectContent className="w-full">
                <SelectGroup>
                  {options.map((el) => (
                    <SelectItem key={el.value} value={el.value}>
                      {`${el.label} "${el.value}"`}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {!!value && (
            <Button
              variant="ghost"
              className="flex w-fit py-1 cursor-pointer"
              onClick={() => {
                onChange('');
              }}
            >
              <Trash className="stroke-red-400" />
            </Button>
          )}
        </div>
      </FormControl>

      {!!error && <FormErrorMassege>{t_forms(`${error.message}`)}</FormErrorMassege>}
    </FormItem>
  );
}

export default memo(CitizenshipSelect);
