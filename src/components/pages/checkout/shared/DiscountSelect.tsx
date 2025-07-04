import { FormItem, FormLabel } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectGroup } from '@/components/ui/select';
import { useController, useFormContext } from 'react-hook-form';
import { memo } from 'react';
import { FieldConfig } from '../helpers/providerConfig/types';
import { useTranslations } from 'next-intl';
import { MESSAGE_FILES } from '@/constans/message.file.constans';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

type Props = {
  name: string;
  config: Extract<FieldConfig, { type: 'discount' }>;
  i: number;
};

const DiscountSelect = memo(function UniversalSelect({ name, config, i }: Props) {
  const { control, setValue } = useFormContext();
  const t_forms = useTranslations(MESSAGE_FILES.FORM);

  const { field: fieldDiscountId } = useController({ name: `passengers.${i}.discount_id`, control });

  const { field: fieldDiscountDescription } = useController({
    name: `passengers.${i}.discount_description`,
    control,
  });

  const { field: fieldDiscountPercent } = useController({ name: `passengers.${i}.discount_percent`, control });

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const handleDiscountChange = (value: string) => {
    field.onChange(value);
    const option = config.options.find((opt) => opt.value === value);
    fieldDiscountId.onChange(value);

    fieldDiscountDescription.onChange(option?.label ?? '');
    fieldDiscountPercent.onChange(option?.discount_percent ?? undefined);
  };

  const handleReset = () => {
    setValue(name, '');
    setValue(`passengers.${i}.discount_id`, '');
    setValue(`passengers.${i}.discount_description`, '');
    setValue(`passengers.${i}.discount_percent`, undefined);
  };

  return (
    <div>
      {' '}
      <FormLabel className="mb-2 text-sm font-normal tracking-normal leading-[21px]">{t_forms(config.label)}</FormLabel>
      <div className="flex items-center gap-2">
        <FormItem className="w-full ">
          <Select onValueChange={handleDiscountChange} value={field.value || ''}>
            <SelectTrigger
              className="w-full mb-0"
              size="full"
              aria-invalid={!!error}
              onReset={() => {}}
              value={field.value}
            >
              {config.options.find((opt) => opt.value === field.value)?.label ||
                t_forms(config.placeholder!) ||
                config.label}
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

          {!!error && <div className="mt-1 text-xs text-red-500">{t_forms(`${error.message}`)}</div>}
        </FormItem>
        {field.value && (
          <div className="flex items-center justify-center">
            <Button
              className="text-xs flex items-center justify-center"
              variant={'ghost'}
              type="button"
              onClick={handleReset}
            >
              <X />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
});

export default DiscountSelect;
