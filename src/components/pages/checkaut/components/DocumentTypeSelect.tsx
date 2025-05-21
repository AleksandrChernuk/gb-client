'use client';

import * as React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { FormErrorMassege } from '@/components/ui/form-error';
import { FormLabel } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { SelectGroup } from '@radix-ui/react-select';
import { useTranslations } from 'next-intl';
import { MESSAGE_FILES } from '@/constans/message.file.constans';
import { docTypes } from '@/constans/doc.types.constans';
import { FieldConfig } from '../helpers/providerFieldsConfig';

type Props = {
  name: {
    type: string;
    number: string;
  };
  config: FieldConfig;
};

export const DocumentInput = ({ name }: Props) => {
  const { control } = useFormContext();
  const t_forms = useTranslations(MESSAGE_FILES.FORM);

  const { field: typeField } = useController({
    name: name.type,
    control,
  });

  const {
    field: numberField,
    fieldState: { error: numberError },
  } = useController({
    name: name.number,
    control,
  });

  return (
    <div className="space-y-2">
      <FormLabel className="mb-2 text-sm font-normal tracking-normal leading-[21px]">{t_forms('document')}</FormLabel>
      <div className="flex items-center">
        <Select onValueChange={(value) => typeField.onChange(value)}>
          <SelectTrigger className="rounded-none rounded-s-md min-w-10" size="full" />
          <SelectContent>
            <SelectGroup>
              {docTypes.map((element) => (
                <SelectItem key={element} value={element}>
                  {t_forms(`docType.${element.toLowerCase()}`)}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Input
          {...numberField}
          aria-invalid={!!numberError}
          className={cn('rounded-none rounded-r-md rounded-l-0', numberError && 'border-red-400')}
        />
      </div>
      {!!numberError && <FormErrorMassege>{t_forms(`${numberError.message}`)}</FormErrorMassege>}
    </div>
  );
};
