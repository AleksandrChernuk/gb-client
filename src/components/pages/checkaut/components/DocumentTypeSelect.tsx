'use client';

import { useController, useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { FormErrorMassege } from '@/components/ui/form-error';
import { FormLabel } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { SelectGroup } from '@radix-ui/react-select';
import { useTranslations } from 'next-intl';
import { MESSAGE_FILES } from '@/constans/message.file.constans';
import { FieldConfig } from '../helpers/providerFieldsConfig';
import { memo } from 'react';

type Props = {
  name: {
    type: string;
    number: string;
  };
  config: Extract<FieldConfig, { type: 'group' }>;
};

const DocumentInput = memo(function DocumentInput({ name, config }: Props) {
  const { control } = useFormContext();
  const t_forms = useTranslations(MESSAGE_FILES.FORM);

  const {
    field: typeField,
    fieldState: { error: typeError },
  } = useController({
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

  const typeFieldConfig = config.fields.type;
  const options = typeFieldConfig.type === 'select' ? typeFieldConfig.options : [];
  return (
    <div className="space-y-2">
      <FormLabel className="mb-2 text-sm font-normal tracking-normal leading-[21px]">{t_forms('document')}</FormLabel>
      <div className="flex items-center">
        <Select value={typeField.value} onValueChange={typeField.onChange}>
          <SelectTrigger className="rounded-none rounded-s-md min-w-10" size="full" />
          <SelectContent>
            <SelectGroup>
              {options.map((element) => (
                <SelectItem key={element.value} value={element.value}>
                  {t_forms(`docType.${element.value.toLowerCase()}`)}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Input
          {...numberField}
          placeholder={config.placeholder}
          aria-invalid={!!numberError}
          className={cn('rounded-none rounded-r-md rounded-l-0', numberError && 'border-red-400')}
        />
      </div>
      {!!numberError && <FormErrorMassege>{t_forms(`${numberError.message}`)}</FormErrorMassege>}
      {!!typeError && <FormErrorMassege>{t_forms(`${typeError.message}`)}</FormErrorMassege>}
    </div>
  );
});

export default DocumentInput;
