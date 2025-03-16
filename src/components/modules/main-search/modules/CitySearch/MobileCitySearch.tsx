'use client';

import { IconFrom } from '@/components/icons/IconFrom';
import { IconTo } from '@/components/icons/IconTo';
import { IconSwap } from '@/components/icons/IconSwap';
import { useCitySearch } from '../../hooks/useCitySearch';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { useSearchStore } from '@/store/useSearch';
import { useTranslations } from 'next-intl';
import { extractLocationDetails } from '@/lib/extractLocationDetails';
import { useLocale } from 'next-intl';
import { LoaderCity } from '../../components/LoaderCity';
import { NotFoundCity } from '../../components/NotFoundCity';
import { CityItem } from '../../components/CityItem';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ClearInputButton } from '../../components/ClearInputButton';
import { StartIcon } from '../../components/StartIcon';
import { InputError } from '../../components/InputError';
import { EndIcon } from '../../components/EndIcon';
import { ChevronLeft } from 'lucide-react';

export const MobCitySeacrh = ({ name }: { name: 'from' | 'to' }) => {
  const {
    open,
    value,
    onInputChange,
    cities,
    loading,
    handleClearMobileInput,
    placeholder,
    onSelectCity,
    highlightedIndex,
    handleToggleOpen,
  } = useCitySearch({
    name,
  });
  const city = useSearchStore((state) => state[name]);
  const swap = useSearchStore((state) => state.swap);
  const errors = useSearchStore((state) => state.errors[name]);
  const setErrors = useSearchStore((state) => state.setErrors);
  const t = useTranslations('common');
  const locale = useLocale();

  return (
    <Sheet open={open} onOpenChange={handleToggleOpen}>
      <SheetTrigger asChild>
        <div className="relative">
          <StartIcon icon={name === 'from' ? <IconFrom /> : <IconTo />} />
          <input
            type="button"
            value={placeholder}
            className={`${
              errors && 'border-red!'
            } text-text_prymery z-0 min-h-10 rounded-md size-full h-auto px-4 py-2 pl-8 tablet:px-9 laptop:px-12 tablet:py-4 outline-hidden bg-transparent focus:bg-gray_1 active:bg-gray_1 dark:focus:bg-black_2_for_text dark:active:bg-black_2_for_text placeholder-text_prymery  body_medium laptop:filter_input_medium_text  text-left text-nowrap truncate border-[1px] border-transparent `}
            onFocus={() => {
              if (errors) {
                setErrors(name, null);
              }
            }}
          />
          <InputError inputError={errors && t(`${errors}`)} />
          <EndIcon icon={name === 'from' && <IconSwap />} onClick={swap} />
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="sr-only">Edit profile</SheetTitle>
          <SheetDescription className="sr-only">
            Make changes to your profile here. Click save when youre done.
          </SheetDescription>

          <SheetClose asChild>
            <Button variant={'link'} className="flex items-center gap-1 h5 text-text_prymery">
              <ChevronLeft size={24} className="stroke-black_2_for_text dark:stroke-grayy" />
              {t('backBtn')}
            </Button>
          </SheetClose>
        </SheetHeader>
        <ScrollArea className="relative px-5 overflow-y-scroll grow bg-grayy dark:bg-dark_bg">
          <div className="sticky top-0 left-0 right-0 h-12 ">
            <div className="relative py-4 bg-grayy dark:bg-dark_bg">
              <input
                id={name}
                type="text"
                value={value}
                placeholder={placeholder}
                name={name}
                onChange={(e) => onInputChange(e.target.value)}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck="false"
                className="text-text_prymery placeholder-text_prymery p-4 pr-10 h-full w-full bg-white dark:bg-dark_main rounded-lg border-[1px] border-black_2_for_text focus:border-primary_1 outline-primary_1 placeholder:italic"
              />
              <ClearInputButton handleClear={handleClearMobileInput} />
            </div>
          </div>
          <div id="list-container" className="mt-11 space-y-2">
            {!loading &&
              cities &&
              cities.map((el, index) => {
                const element = extractLocationDetails(el, locale);
                return (
                  <div
                    key={el.id}
                    className="border border-b-gray_0 dark:border-b-black_2_for_text  last:border-b-none pb-1"
                  >
                    <CityItem
                      key={el.id}
                      el={element}
                      isSelected={city?.id === el.id}
                      isHighlighted={highlightedIndex === index}
                      handleSelectCity={() => onSelectCity(el)}
                    />
                  </div>
                );
              })}
            {!loading && !cities.length && <NotFoundCity />}
            {loading && <LoaderCity />}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
