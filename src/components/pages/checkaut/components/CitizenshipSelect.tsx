import { memo } from 'react';
import { useFormContext, useController } from 'react-hook-form';
import { FormControl, FormItem, FormLabel } from '@/components/ui/form';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { citizenship } from '@/constans/citizenship.constans';

type Props = {
  name: string;
};

function CitizenshipSelect({ name }: Props) {
  const { control } = useFormContext();

  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
    rules: { required: true },
  });

  return (
    <FormItem>
      <FormLabel className="mb-2 text-sm font-normal leading-[21px]">Гражданство</FormLabel>
      <FormControl>
        <Select value={value ?? ''} onValueChange={onChange}>
          <SelectTrigger className="w-full" size="full">
            <SelectValue placeholder="Выберите гражданство" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {citizenship.map((el) => (
                <SelectItem key={el.num_code} value={el.alpha_2_code ?? ''}>
                  {el.nationality}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </FormControl>
    </FormItem>
  );
}

export default memo(CitizenshipSelect);
