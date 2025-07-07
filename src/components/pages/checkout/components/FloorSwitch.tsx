'use client';

import { Button } from '@/components/ui/button';
import { ReactNode, useState } from 'react';
import { useTranslations } from 'next-intl';
import { MESSAGE_FILES } from '@/constans/message.file.constans';

type Props = {
  floor_first: ReactNode;
  floor_second: ReactNode;
};

function FloorSwitch({ floor_first, floor_second }: Props) {
  const t = useTranslations(MESSAGE_FILES.CHECKOUT_PAGE);
  const [floor, setFloor] = useState<'first' | 'second'>('first');

  return (
    <div className="relative ">
      <div className="grid grid-cols-2 gap-2 sticky top-0 py-2 tablet:py-4 bg-slate-50 dark:bg-slate-900 z-50">
        <Button aria-selected={floor === 'first'} variant={'outline'} onClick={() => setFloor('first')}>
          {t('floor_1')}
        </Button>

        <Button aria-selected={floor === 'second'} variant={'outline'} onClick={() => setFloor('second')}>
          {t('floor_2')}
        </Button>
      </div>
      <div>{floor === 'first' && floor_first}</div>
      <div>{floor === 'second' && floor_second}</div>
    </div>
  );
}

export default FloorSwitch;
