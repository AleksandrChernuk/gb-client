'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import RoutersItem from './RoutersItem';
import { useTranslations } from 'next-intl';
import { MESSAGE_FILES } from '@/constans/message.file.constans';
import { ILocation } from '@/types/location.types';

type Props = {
  list: { from: ILocation; to: ILocation }[];
};

const RoutersDropdownList = ({ list }: Props) => {
  const [open, setOpen] = useState(false);
  const t = useTranslations(MESSAGE_FILES.MAIN_PAGE);

  return (
    <div>
      {open && (
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4 laptop:grid-cols-2 mb-0 duration-300 animate-in fade-in slide-in-from-top-1">
          {list.map((router, i) => (
            <div className="w-full" key={i + 10}>
              <RoutersItem from={router.from} to={router.to} />
            </div>
          ))}
        </div>
      )}

      <div className="text-right laptop:text-center">
        <Button
          variant={'link'}
          onClick={() => setOpen(!open)}
          className="h-auto p-0 mt-4 text-base font-normal text-white"
        >
          {t('popular_button')}
        </Button>
      </div>
    </div>
  );
};

export default RoutersDropdownList;
