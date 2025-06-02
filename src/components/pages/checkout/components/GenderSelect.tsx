import { FormControl, FormItem, FormLabel } from '@/components/ui/form';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { grnderList } from '@/constans/gender.list.constans';
import { MESSAGE_FILES } from '@/constans/message.file.constans';
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
          <SelectTrigger className="w-full" size="full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {grnderList.map((el) => (
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
