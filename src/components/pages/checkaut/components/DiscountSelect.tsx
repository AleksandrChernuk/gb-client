/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormItem, FormLabel } from '@/components/ui/form';
import { SelectGroup, SelectItem, SelectTrigger } from '@/components/ui/select';
import { useCurrentTicketStore } from '@/store/useCurrentTicket';
import { Select, SelectContent } from '@radix-ui/react-select';
import { useController, useFormContext } from 'react-hook-form';

type Props = {
  name: string;
};

const DiscountSelect = ({ name }: Props) => {
  const selectedTicket = useCurrentTicketStore((state) => state.selectedTicket);
  const isHydrated = useCurrentTicketStore((state) => state.isHydrated);
  const { control } = useFormContext();

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: { required: true },
  });

  if (isHydrated || !selectedTicket?.details?.discounts || selectedTicket?.details?.discounts?.length === 0) {
    console.log(selectedTicket?.details?.discounts);
    return null;
  }

  return (
    <FormItem>
      <FormLabel className="mb-2 text-sm font-normal tracking-normal leading-[21px]">Скидки</FormLabel>
      <Select onValueChange={(value) => field.onChange(value || '')}>
        <SelectTrigger className="rounded-none rounded-s-md" size="full" aria-invalid={!!error}>
          Discount
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {selectedTicket?.details?.discounts.map((element) => (
              <SelectItem
                key={element.name || element.percent || element.category || element.description || element.id || ''}
                value={`${element.name || element.percent || element.category || element.description || element.id || ''}`}
              >
                {element.name || element.percent || element.category || element.description || element.id || ''}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </FormItem>
  );
};

export default DiscountSelect;
