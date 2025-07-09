'use client';

import { FormControl, FormItem, FormLabel } from '@/components/ui/form';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MESSAGE_FILES } from '@/constans/message.file.constans';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useController, useFormContext } from 'react-hook-form';

type Props = {
  name: string;
};

function GenderSelect({ name }: Props) {
  const { control } = useFormContext();
  const t_forms = useTranslations(MESSAGE_FILES.FORM);

  const { field } = useController({
    name,
    control,
  });

  return (
    <FormItem>
      <FormLabel className="mb-2 text-sm font-normal leading-[21px]">{t_forms('gender_label')}</FormLabel>
      <FormControl>
        <Select value={field.value} onValueChange={field.onChange}>
          <SelectTrigger
            className="w-full"
            size="full"
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
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {['M', 'L'].map((el) => (
                <SelectItem key={el} value={el}>
                  {t_forms(`genderList.${el}`)}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </FormControl>
    </FormItem>
  );
}

export default GenderSelect;
