'use client';

import { FormItem, FormLabel } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectGroup } from '@/components/ui/select';
import { useController, useFormContext } from 'react-hook-form';
import { memo } from 'react';
import { FieldConfig } from '../providerConfig/types';
import { useTranslations } from 'next-intl';
import { MESSAGE_FILES } from '@/config/message.file.constans';
import { Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Props = {
  name: string;
  config: Extract<FieldConfig, { type: 'discount' }>;
  i: number;
};

const DiscountSelect = memo(function UniversalSelect({ name, config, i }: Props) {
  const { control, setValue } = useFormContext();
  const t_forms = useTranslations(MESSAGE_FILES.FORM);

  const { field: fieldDiscountId } = useController({ name: `passengers.${i}.discountId`, control });

  const { field: fieldDiscountDescription } = useController({
    name: `passengers.${i}.discountDescription`,
    control,
  });

  const { field: fieldDiscountPercent } = useController({ name: `passengers.${i}.discountPercent`, control });

  const {
    field: { value, onChange, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const handleDiscountChange = (value: string) => {
    onChange(value);
    const option = config?.options && config.options?.find((opt) => opt.value === value);

    fieldDiscountId.onChange(value);
    fieldDiscountDescription.onChange(option?.label ?? '');
    fieldDiscountPercent.onChange(option?.discountPercent ?? undefined);
  };

  return (
    <div className="">
      <FormLabel className="mb-2 text-sm font-normal tracking-normal leading-[21px]">{t_forms(config.label)}</FormLabel>
      <FormItem className="w-full ">
        <div className="flex items-center gap-1 max-w-full">
          <div className="flex-1 min-w-0">
            <Select onValueChange={handleDiscountChange} value={value || ''}>
              <SelectTrigger className="w-full mb-0 " size="full" aria-invalid={!!error} value={value} ref={ref}>
                {config.options.find((opt) => opt.value === value)?.label ||
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
          </div>
          {!!value && (
            <Button
              variant="ghost"
              className="flex w-fit py-1 cursor-pointer"
              onClick={() => {
                setValue(`passengers.${i}.discountId`, '');
                setValue(`passengers.${i}.discountDescription`, '');
                setValue(`passengers.${i}.discountPercent`, '');
                onChange('');
              }}
            >
              <Trash className="stroke-red-400" />
            </Button>
          )}
        </div>
        {!!error && <div className="mt-1 text-xs text-red-500">{t_forms(`${error.message}`)}</div>}
      </FormItem>
    </div>
  );
});

export default DiscountSelect;
