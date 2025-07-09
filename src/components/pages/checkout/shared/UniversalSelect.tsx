import { FormItem, FormLabel } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectGroup } from '@/components/ui/select';
import { useController, useFormContext } from 'react-hook-form';
import { memo } from 'react';
import { FieldConfig } from '../helpers/providerConfig/types';
import { useTranslations } from 'next-intl';
import { MESSAGE_FILES } from '@/constans/message.file.constans';
import { X } from 'lucide-react';

type Props = {
  name: string;
  config: Extract<FieldConfig, { type: 'select' }>;
};

const UniversalSelect = memo(function UniversalSelect({ name, config }: Props) {
  const { control } = useFormContext();
  const t_forms = useTranslations(MESSAGE_FILES.FORM);

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <FormItem>
      <FormLabel className="mb-2 text-sm font-normal tracking-normal leading-[21px]">{t_forms(config.label)}</FormLabel>
      <Select onValueChange={field.onChange} value={field.value}>
        <SelectTrigger
          className="w-full "
          size="full"
          aria-invalid={!!error}
          clear={
            field.value && (
              <div
                className="absolute right-10 top-0 bottom-0 z-50 cursor-pointer flex items-center"
                onPointerDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  field.value.onChange('');
                }}
              >
                <X className="stroke-green-300" size={20} />
              </div>
            )
          }
        >
          {config.translateOptions
            ? t_forms(
                config.options.find((opt) => opt.value === field.value)?.label || config.placeholder || config.label,
              )
            : config.options.find((opt) => opt.value === field.value)?.label ||
              t_forms(config.placeholder!) ||
              config.label}
        </SelectTrigger>
        <SelectContent className="w-full">
          <SelectGroup>
            {config.options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {config.translateOptions ? t_forms(option.label) : option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </FormItem>
  );
});

export default UniversalSelect;
