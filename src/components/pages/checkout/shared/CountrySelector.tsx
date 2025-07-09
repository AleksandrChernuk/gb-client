'use client';

import { memo, useMemo } from 'react';
import { useFormContext, useController } from 'react-hook-form';
import { FormControl, FormItem, FormLabel } from '@/components/ui/form';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTranslations } from 'next-intl';
import { MESSAGE_FILES } from '@/constans/message.file.constans';
import countryList from 'react-select-country-list';
import { FieldConfig } from '../helpers/providerConfig/types';
import { FormErrorMassege } from '@/components/ui/form-error';
import { X } from 'lucide-react';

type Props = {
  name: string;
  config: FieldConfig;
};

function CountrySelector({ name, config }: Props) {
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

  return (
    <FormItem>
      <FormLabel className="mb-2 text-sm font-normal leading-[21px]">{t(config.label)}</FormLabel>
      <FormControl>
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger
            className="w-full"
            size="full"
            aria-invalid={!!error}
            clear={
              value && (
                <div
                  className="absolute right-7 top-0 bottom-0 z-50 cursor-pointer flex items-center"
                  onPointerDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    value.onChange('');
                  }}
                >
                  <X className="stroke-green-300" size={20} />
                </div>
              )
            }
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {options.map((el) => (
                <SelectItem key={el.value} value={el.value}>
                  {`${el.label} "${el.value}"`}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </FormControl>
      {!!error && <FormErrorMassege>{t_forms(`${error.message}`)}</FormErrorMassege>}
    </FormItem>
  );
}

export default memo(CountrySelector);
