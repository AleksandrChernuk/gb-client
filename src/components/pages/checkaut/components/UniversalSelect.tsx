import { FormItem, FormLabel } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectGroup } from '@/components/ui/select';
import { useController, useFormContext } from 'react-hook-form';
import { FieldConfig } from '../helpers/providerFieldsConfig';
import { memo } from 'react';

type Props = {
  name: string;
  config: Extract<FieldConfig, { type: 'select' }>;
};

const UniversalSelect = memo(function UniversalSelect({ name, config }: Props) {
  const { control } = useFormContext();

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <FormItem>
      <FormLabel className="mb-2 text-sm font-normal tracking-normal leading-[21px]">{config.label}</FormLabel>
      <Select onValueChange={field.onChange} value={field.value}>
        <SelectTrigger className="w-full " size="full" aria-invalid={!!error}>
          {config.options.find((opt) => opt.value === field.value)?.label || config.placeholder || config.label}
        </SelectTrigger>
        <SelectContent className="w-full">
          <SelectGroup>
            {config.options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </FormItem>
  );
});

export default UniversalSelect;
