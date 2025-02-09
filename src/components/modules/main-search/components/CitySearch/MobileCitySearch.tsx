"use client";

import { IconClear } from "@/components/icons/IconClear";
import { IconFrom } from "@/components/icons/IconFrom";
import { IconTo } from "@/components/icons/IconTo";
import { IconSwap } from "@/components/icons/IconSwap";
import { memo } from "react";
import { useCitySearch } from "../../hooks/useCitySearch";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { EndIcon, StartIcon, InputError } from '../../ui';
import { CustomDarwer } from '@/components/shared/CustomDarwer';
import { DrawerClose } from '@/components/ui/drawer';
import { IconBack } from '@/components/icons/IconBack';
import { useTranslation } from 'react-i18next';
import { useSearchStore } from '@/store/useSearch';
 
const ClearButton = ({ handleClear }: { handleClear: () => void }) => {
  return (
    <div
      className='absolute right-0 inline-flex w-10 h-10 p-2 -translate-y-1/2 rounded-lg cursor-pointer top-1/2'
      onClick={(e) => {
        e.stopPropagation();
        handleClear();
      }}
    >
      <IconClear />
    </div>
  );
};

export const MobCitySeacrh = memo(({ name }: { name: 'from' | 'to' }) => {
  const {
    open,
    handleToggleOpen,
    handleCloseDrawer,
    value,
    onInputChange,
    list,
    handleClearMobileInput,
    placeholder,
  } = useCitySearch({
    name,
  });
  const { t } = useTranslation(['common']);

  const swap = useSearchStore((state) => state.swap);
  const errors = useSearchStore((state) => state.errors[name]);
  const setErrors = useSearchStore((state) => state.setErrors);

  return (
    <CustomDarwer
      open={open}
      toggleOpen={handleToggleOpen}
      trigger={
        <div className='relative'>
          <StartIcon icon={name === 'from' ? <IconFrom /> : <IconTo />} />
          <input
            type='button'
            value={placeholder}
            className={`${errors && 'border-red'} text-text_prymery_color z-0 min-h-10 rounded-md size-full h-auto px-4 py-2 pl-8 tablet:px-9 laptop:px-12 tablet:py-4 outline-hidden bg-transparent focus:bg-gray_1 active:bg-gray_1 dark:focus:bg-black_2_for_text dark:active:bg-black_2_for_text placeholder-text_prymery_color  body_medium laptop:filter_input_medium_text  text-left text-nowrap truncate border-[1px] border-transparent `}
            onFocus={() => {
              if (errors) {
                setErrors(name, null);
              }
            }}
          />
          <InputError inputError={errors && t(`${errors}`)} />
          <EndIcon icon={name === 'from' && <IconSwap />} onClick={swap} />
        </div>
      }
      onClose={handleCloseDrawer}
    >
      <div className='flex items-center justify-between border-b-[2px] px-5 py-6  border-b-gray_1 dark:border-b-black_2_for_text dark:bg-dark_mode_main1'>
        <DrawerClose className='flex items-center gap-1 h5 text-text_prymery_color'>
          <IconBack />
          {t('backBtn')}
        </DrawerClose>
      </div>
      <ScrollArea className='relative px-5 overflow-y-scroll grow bg-grayy dark:bg-background_black_mode'>
        <div className='sticky top-0 left-0 right-0 h-12 '>
          <div className='relative py-4 bg-grayy dark:bg-background_black_mode'>
            <input
              id={name}
              type='text'
              value={value}
              placeholder={placeholder}
              name={name}
              onChange={(e) => onInputChange(e.target.value)}
              autoComplete='off'
              autoCapitalize='off'
              spellCheck='false'
              className='text-text_prymery_color placeholder-text_prymery_color p-4 pr-10 h-full w-full bg-white dark:bg-dark_mode_main1 rounded-lg border-[1px] border-black_2_for_text focus:border-primary_1 outline-primary_1 placeholder:italic'
            />
            <ClearButton handleClear={handleClearMobileInput} />
          </div>
        </div>
        <div id='list-container' className='mt-11'>
          {list}
        </div>
      </ScrollArea>
    </CustomDarwer>
  );
});

MobCitySeacrh.displayName = "MobCitySeacrh";
