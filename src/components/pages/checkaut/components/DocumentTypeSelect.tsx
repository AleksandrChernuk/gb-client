import { Button } from '@/components/ui/button';
import { Popover, PopoverTrigger } from '@/components/ui/popover';
import { PopoverContent } from '@radix-ui/react-popover';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import React, { useState } from 'react';

const docType = [
  'UNKNOWN',
  'PASSPORT',
  'MILITARY_ID',
  'FOREIGN_DOCUMENT',
  'TRAVEL_PASSPORT',
  'SAILORS_PASSPORT',
  'BIRTH_CERTIFICATE',
  'DIPLOMATIC_PASSPORT',
];

type TDocumentTypeSelect = {
  value: string;
  setValue: (value: string) => void;
  error: boolean;
};

export const DocumentTypeSelect = ({ setValue, error, value }: TDocumentTypeSelect) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className={`${error && 'border-red-400'} mb-0 text-left overflow-hidden w-20 px-1 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground flex gap-1 rounded-e-none rounded-s-lg border-r-0 focus:z-10`}
        >
          {'type'}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        sideOffset={10}
        className="h-fit p-2 bg-background border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-700 dark:text-slate-50 shadow z-50"
        side="bottom"
        align="start"
      >
        <ScrollArea>
          <div className="space-y-1">
            {docType.map((item) => (
              <div
                className={`p-1 cursor-pointer hover:bg-slate-100 hover:dark:bg-slate-800 rounded-md ${value === item && 'bg-slate-100 dark:bg-slate-800'}`}
                key={item}
                onClick={() => {
                  setValue(item);
                  setOpen(false);
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};
