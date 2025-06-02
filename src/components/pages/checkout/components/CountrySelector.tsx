'use client';

import { memo, useMemo } from 'react';
import { useFormContext, useController } from 'react-hook-form';
import { FormControl, FormItem, FormLabel } from '@/components/ui/form';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTranslations } from 'next-intl';
import { MESSAGE_FILES } from '@/constans/message.file.constans';
import countryList from 'react-select-country-list';
import { FieldConfig } from '../helpers/providerConfig/types';

type Props = {
  name: string;
  config: FieldConfig;
};

function CountrySelector({ name ,config}: Props) {
  const { control } = useFormContext();
  const t = useTranslations(MESSAGE_FILES.FORM);
  const options = useMemo(() => countryList().getData(), []);

  const {
    field: { value, onChange },
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
          <SelectTrigger className="w-full" size="full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {options.map((el) => (
                <SelectItem key={el.value} value={el.value}>
                  {el.value}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </FormControl>
    </FormItem>
  );
}

export default memo(CountrySelector);
