'use client';

import { useSearchStore } from '@/store/useSearch';
import { useLocale, useTranslations } from 'next-intl';
import { useCitySearch } from '../hooks/useCitySearch';
import { StartIcon } from '../components/StartIcon';
import { IconFrom } from '@/components/icons/IconFrom';
import { IconTo } from '@/components/icons/IconTo';
import { IconSwap } from '@/components/icons/IconSwap';
import { EndIcon } from '../components/EndIcon';
import { InputError } from '../components/InputError';
import { AnimatePresence } from 'motion/react';
import { CityItem } from '../components/CityItem';
import { extractLocationDetails } from '@/lib/extractLocationDetails';
import { motion } from 'motion/react';
import { LoaderCity } from '../components/LoaderCity';
import { NotFoundCity } from '../components/NotFoundCity';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { ClearInputButton } from '../components/ClearInputButton';

type Props = {
  name: 'from' | 'to';
  type: 'mobile' | 'desktop';
};

export default function CitySearch({ name, type }: Props) {
  const t = useTranslations('common');
  const city = useSearchStore((state) => state[name]);
  const swap = useSearchStore((state) => state.swap);
  const errors = useSearchStore((state) => state.errors[name]);
  const setErrors = useSearchStore((state) => state.setErrors);
  const locale = useLocale();

  const {
    open,
    value,
    onInputChange,
    cities,
    loading,
    placeholder,
    onSelectCity,
    highlightedIndex,
    handleToggleOpen,
    onKeyDown,
    handleBlur,
    inputRef,
    handleClearMobileInput,
  } = useCitySearch({
    name,
  });

  switch (type) {
    case 'desktop':
      return (
        <div role="dropdown-warapp" className="relative" onKeyDown={onKeyDown}>
          <div
            className={`relative border-r border-slate-200 dark:border-slate-700 ${
              open && 'dark:border-r-transparent border-r-transparent'
            }`}
            role="input-wrapp"
          >
            <StartIcon icon={name === 'from' ? <IconFrom /> : <IconTo />} />
            <input
              ref={inputRef}
              type="text"
              value={value}
              name={name}
              placeholder={placeholder}
              onChange={(e) => {
                onInputChange(e.target.value);
              }}
              autoComplete="off"
              autoCapitalize="off"
              className={`${
                errors && 'border-red-50!'
              } z-0 min-h-10 rounded-md size-full h-auto px-4 py-2 pl-8 tablet:px-9 laptop:px-12 tablet:py-4 outline-hidden bg-transparent focus:bg-slate-200 active:bg-slate-200 dark:focus:bg-slate-700 dark:active:bg-slate-700 placeholder:text-slate-700 dark:placeholder:text-slate-50 text-base laptop:leading-[24px] laptop:text-lg font-medium tracking-tighter leading-[21.6px] text-black dark:text-slate-50 text-left text-nowrap truncate border-[1px] border-transparent`}
              spellCheck="false"
              onBlur={handleBlur}
              onFocus={() => {
                if (errors) {
                  setErrors(name, null);
                }
                handleToggleOpen();
              }}
            />
            <EndIcon icon={name === 'from' && <IconSwap />} onClick={swap} />
            <InputError inputError={errors && t(`${errors}`)} />
          </div>

          <AnimatePresence initial={false}>
            {open ? (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="absolute left-0 z-50 p-4 mt-5 space-y-2 bg-white shadow-xs top-full w-fit rounded-2xl dark:bg-slate-800 dark:border dark:border-slate-900"
                key="box"
                onMouseDown={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                }}
              >
                {!loading &&
                  cities &&
                  cities.map((el, index) => {
                    const element = extractLocationDetails(el, locale);
                    return (
                      <div key={el.id}>
                        <CityItem
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
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      );

    case 'mobile':
      return (
        <Sheet open={open} onOpenChange={handleToggleOpen}>
          <SheetTrigger asChild>
            <div className="relative">
              <StartIcon icon={name === 'from' ? <IconFrom /> : <IconTo />} />
              <input
                type="button"
                value={placeholder}
                className={`${
                  errors && 'border-red-50!'
                } text-slate-700 dark:text-slate-50 z-0 min-h-10 rounded-md size-full h-auto px-4 py-2 pl-8 tablet:px-9 laptop:px-12 tablet:py-4 outline-hidden bg-transparent focus:bg-slate-200 active:bg-slate-200 dark:focus:bg-slate-700 dark:active:bg-slate-700 placeholder:text-slate-700 dark:placeholder:text-slate-50 text-base font-medium tracking-normal leading-[24px] laptop:text-lg laptop:font-medium  laptop:leading-[21.6px]  text-left text-nowrap truncate border-[1px] border-transparent `}
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
                <Button
                  variant={'link'}
                  className="flex items-center gap-1 text-base font-bold leading-6 tracking-normal text-slate-700 dark:text-slate-50"
                >
                  <ChevronLeft size={24} className="stroke-slate-700 dark:stroke-slate-50" />
                  {t('backBtn')}
                </Button>
              </SheetClose>
            </SheetHeader>
            <ScrollArea className="relative px-5 overflow-y-scroll grow bg-slate-50 dark:bg-slate-900">
              <div className="sticky top-0 left-0 right-0 h-12 ">
                <div className="relative py-4 bg-slate-50 dark:bg-slate-900">
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
                    className="text-slate-700 dark:text-slate-50 placeholder:text-slate-700 dark:placeholder:text-slate-50 p-4 pr-10 h-full w-full bg-white dark:bg-slate-800 rounded-lg border-[1px] border-slate-700 focus:border-green-300 outline-green-300 placeholder:italic"
                  />
                  <ClearInputButton handleClear={handleClearMobileInput} />
                </div>
              </div>
              <div id="list-container" className="space-y-2 mt-11">
                {!loading &&
                  cities &&
                  cities.map((el, index) => {
                    const element = extractLocationDetails(el, locale);
                    return (
                      <div
                        key={el.id}
                        className="border border-b-[#e6e6e6] dark:border-b-slate-700  last:border-b-none pb-1"
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

    default:
      return null;
  }
}
