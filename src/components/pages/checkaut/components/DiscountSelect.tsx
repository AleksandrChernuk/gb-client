import { Button } from '@/components/ui/button';
import { PopoverTrigger, Popover } from '@/components/ui/popover';
import { useCurrentTicketStore } from '@/store/useCurrentTicket';
import { IDiscount } from '@/types/discount-interface';
import { PopoverContent } from '@radix-ui/react-popover';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { useState } from 'react';

type TDocumentTypeSelect = {
  value: string;
  setValue: (value: string) => void;
};

export const DiscountSelect = ({ value, setValue }: TDocumentTypeSelect) => {
  const selectedTicket = useCurrentTicketStore((state) => state.selectedTicket);

  const [open, setOpen] = useState(false);

  if (!selectedTicket?.details?.discounts) {
    return null;
  }
  const discounts: IDiscount[] = selectedTicket?.details?.discounts ?? [];

  const displayValue = discounts.find((el) => el.id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className={`${false && 'border-red-400'} mb-0 text-left overflow-hidden w-full px-1 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground flex gap-1 rounded-md text-sm font-normal tracking-normal leading-[21px] text-slate-700 dark:text-white`}
        >
          {displayValue?.name || 'Select discount'}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        sideOffset={10}
        className="h-fit p-2 bg-background border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-700 dark:text-slate-50 shadow z-50"
        side="bottom"
        align="start"
      >
        <ScrollArea>
          <div className="space-y-2">
            {selectedTicket?.details?.discounts.map((element) => (
              <div
                className={`p-1 cursor-pointer hover:bg-slate-100 hover:dark:bg-slate-800 rounded-md ${false && 'bg-slate-100 dark:bg-slate-800'}`}
                key={element.id}
                onClick={() => {
                  setValue(element.id || '');
                  setOpen(false);
                }}
              >
                {element.name || element.percent || element.category || element.description || element.id}
              </div>
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};
