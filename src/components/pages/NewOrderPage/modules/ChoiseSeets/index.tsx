import { CustomDarwer } from '@/components/shared/CustomDarwer';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import IconSeat from '../../icons/IconSeat';
import { ChevronRight } from 'lucide-react';

export default function ChoiseSeets() {
  const [open, setOpen] = useState(false);
  return (
    <CustomDarwer
      open={open}
      toggleOpen={() => setOpen(!open)}
      trigger={
        <Button variant={'outline'} className='items-center justify-between w-full px-4 py-3 '>
          <div className='flex'>
            <IconSeat />
            <div>
              <p> Choose a location</p>
            </div>
          </div>
          <ChevronRight />
        </Button>
      }
    >
      <div></div>
    </CustomDarwer>
  );
}
