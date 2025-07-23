import { FormControl, FormItem, FormLabel } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectGroup } from '@/components/ui/select';
import { useController, useFormContext } from 'react-hook-form';
import { memo } from 'react';
import { FieldConfig } from '../providerConfig/types';
import { useTranslations } from 'next-intl';
import { MESSAGE_FILES } from '@/constans/message.file.constans';
import { Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FormErrorMassege } from '@/components/ui/form-error';

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
          <div className="flex-1 h-full min-w-0">
            <Select onValueChange={onChange} value={value}>
              <SelectTrigger className="w-full " size="full" aria-invalid={!!error}>
                {config.translateOptions
                  ? t_forms(
                      config.options.find((opt) => opt.value === value)?.label || config.placeholder || config.label,
                    )
                  : config.options.find((opt) => opt.value === value)?.label ||
                    t_forms(config.placeholder!) ||
                    config.label}
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
              variant="ghost"
              className="flex w-fit py-1 cursor-pointer"
              onClick={() => {
                onChange('');
              }}
            >
              <Trash className="stroke-red-400 " />
            </Button>
          )}
        </div>
      </FormControl>
      {!!error && <FormErrorMassege>{t_forms(`${error.message}`)}</FormErrorMassege>}
    </FormItem>
  );
});

export default UniversalSelect;
