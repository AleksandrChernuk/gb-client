'use client';

import { popularRoutersFakeData } from '@/constans/popular-routers.constans';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import RoutersItem from './RoutersItem';
import { useTranslations } from 'next-intl';
import { MESSAGE_FILES } from '@/constans/message.file.constans';

const RoutersDropdownList = () => {
  const [open, setOpen] = useState(false);
  const t = useTranslations(MESSAGE_FILES.MAIN_PAGE);

  const additionalRouters = popularRoutersFakeData.slice(3);

  return (
    <div>
      {open && (
        <div className="grid grid-cols-1 gap-4 mb-0 duration-300 animate-in fade-in slide-in-from-top-1 laptop:grid-cols-3 laptop:gap-8">
          {additionalRouters.map((router) => (
            <div className="w-full" key={router.id}>
              <RoutersItem from={router?.from} to={router?.to} />
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
          {t('popular_button')}{' '}
        </Button>
      </div>
    </div>
  );
};

export default RoutersDropdownList;
