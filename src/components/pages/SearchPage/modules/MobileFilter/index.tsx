'use client';

import { CustomDarwer } from '@/components/shared/CustomDarwer';
import { DrawerClose } from '@/components/ui/drawer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SlidersHorizontal, X } from 'lucide-react';
import { useState } from 'react';
import FilterSortByList from '../../components/FilterRadioGroup';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useTranslation } from 'react-i18next';
import FilterCheckBoxList from '../../components/FilterCheckBoxList';
import { useRoutesStore } from '@/store/useRouter';

export const MobileFilter = () => {
  const [open, setOpen] = useState<boolean>(false);
  const resetSortBy = useRoutesStore((state) => state.resetSortBy);

  const { t } = useTranslation(['common']);

  return (
    <CustomDarwer
      open={open}
      toggleOpen={() => {
        setOpen((p) => !p);
      }}
      trigger={
        <Button variant={'outline'} className='p-2 rounded-lg border-primary'>
          <SlidersHorizontal color='#098537' size={24} />
        </Button>
      }
    >
      <div className='flex items-center justify-between px-5 py-4 border-b border-b-gray_1 dark:border-b-black_2_for_text dark:bg-dark_mode_main1'>
        <h3 className='font-medium h5 text-primary_1'>{t('filter')}</h3>
        <DrawerClose asChild>
          <Button
            variant={'default'}
            className='flex items-center gap-1 p-1 rounded-md h5 bg-primary_1'
          >
            <X color='#ffffff' />
          </Button>
        </DrawerClose>
      </div>
      <ScrollArea className='relative px-5 my-6 overflow-y-scroll grow bg-grayy dark:bg-background_black_mode'>
        <ul>
          <li>
            <h5 className='mb-4 h5 text-text_prymery_color'>{t('sort_by')}:</h5>
            <FilterSortByList />
          </li>
          <Separator className='h-1 my-6 rounded-lg bg-gray_0 dark:bg-black_2_for_text' />
          <li>
            <h5 className='mb-4 h5 text-text_prymery_color'>{t('bus_companies')}:</h5>
            <FilterCheckBoxList />
          </li>
        </ul>
      </ScrollArea>
      <div className='flex items-center justify-between gap-4 px-5 py-4 border-t border-t-gray_1 dark:border-t-black_2_for_text dark:bg-dark_mode_main1'>
        <DrawerClose asChild>
          <Button
            variant={'outline'}
            className='w-full px-5 py-3 button_mobile text-primary bg-inherit'
            onClick={() => resetSortBy()}
          >
            {t('clear_all')}
          </Button>
        </DrawerClose>
        <DrawerClose asChild>
          <Button variant={'default'} className='w-full px-5 py-3 button_mobile'>
            {t('view_trips')}
          </Button>
        </DrawerClose>
      </div>
    </CustomDarwer>
  );
};
