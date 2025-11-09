import { FormControl, FormItem, FormLabel } from '@/shared/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectGroup } from '@/shared/ui/select';
import { useController, useFormContext } from 'react-hook-form';
import { memo } from 'react';
import { useTranslations } from 'next-intl';
import { Trash } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { FormErrorMassege } from '@/shared/ui/form-error';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { FieldConfig } from '@/shared/types/checkot.types';

type Props = {
  name: string;
  config: Extract<FieldConfig, { type: 'select' }>;
};

const UniversalSelect = memo(function UniversalSelect({ name, config }: Props) {
  const { control } = useFormContext();
  const t_forms = useTranslations(MESSAGE_FILES.FORM);

  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <FormItem>
      <FormLabel className="mb-2 text-sm font-normal tracking-normal leading-[21px]">{t_forms(config.label)}</FormLabel>

      <FormControl>
        <div className="flex items-center gap-2">
          <div className="flex-1 min-w-0">
            <Select onValueChange={onChange} value={value}>
              <SelectTrigger className="w-full" size="full" aria-invalid={!!error}>
                <span className="truncate block">
                  {config.translateOptions
                    ? t_forms(
                        config.options.find((opt) => opt.value === value)?.label || config.placeholder || config.label,
                      )
                    : config.options.find((opt) => opt.value === value)?.label ||
                      t_forms(config.placeholder!) ||
                      config.label}
                </span>
              </SelectTrigger>
              <SelectContent className="w-full">
                <SelectGroup>
                  {config.options.map((option) => (
                    <SelectItem key={`${name}-${option.value}`} value={option.value}>
                      {config.translateOptions ? t_forms(option.label) : option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {!!value && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="flex-shrink-0 h-10 w-10"
              onClick={() => {
                onChange('');
              }}
              aria-label="Clear selection"
            >
              <Trash className=" stroke-red-400" />
            </Button>
          )}
        </div>
      </FormControl>
      {!!error && <FormErrorMassege>{t_forms(`${error.message}`)}</FormErrorMassege>}
    </FormItem>
  );
});

export default UniversalSelect;
