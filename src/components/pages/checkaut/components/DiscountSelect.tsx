import { FormItem, FormLabel } from '@/components/ui/form';
import { SelectGroup, SelectItem, SelectTrigger } from '@/components/ui/select';
import { Select, SelectContent } from '@radix-ui/react-select';
import { useController, useFormContext } from 'react-hook-form';
import { FieldConfig } from '../helpers/providerFieldsConfig';

type Props = {
  name: string;
  config: Extract<FieldConfig, { type: 'select' }>;
};

const DiscountSelect = ({ name, config }: Props) => {
  const { control } = useFormContext();

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: { required: true },
  });

  return (
    <FormItem>
      <FormLabel className="mb-2 text-sm font-normal tracking-normal leading-[21px]">{config.label}</FormLabel>
      <Select onValueChange={(value) => field.onChange(value || '')} value={field.value}>
        <SelectTrigger className="rounded-none rounded-s-md" size="full" aria-invalid={!!error}>
          {config.options.find((opt) => opt.value === field.value)?.label || config.placeholder || config.label}
        </SelectTrigger>
        <SelectContent>
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
};

export default DiscountSelect;
