'use client';

import { useSearchStore } from '@/store/useSearch';
import { useLocale, useTranslations } from 'next-intl';
import { useCitySearch } from '../hooks/useCitySearch';
import { IconFrom } from '@/components/icons/IconFrom';
import { IconTo } from '@/components/icons/IconTo';
import { IconSwap } from '@/components/icons/IconSwap';
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
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { ClearInputButton } from '../components/ClearInputButton';
import { MainSearchInput } from '../components/MainSearchInput';
import { MESSAGE_FILES } from '@/constans/message.file.constans';
import { useIsFetching } from '@tanstack/react-query';
import CityList from '../components/CityList';
import { MainLoader } from '@/components/shared/MainLoader';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { extractLocationDetails } from '@/lib/extractLocationDetails';

type Props = {
  name: 'from' | 'to';
  variant: 'mobile' | 'desktop';
};

export default function CitySearch({ name, variant }: Props) {
  const t = useTranslations(MESSAGE_FILES.COMMON);
  const swap = useSearchStore((state) => state.swap);
  const isFetchingLocations = useIsFetching({ queryKey: ['locations'] });
  const city = useSearchStore((state) => state[name]);

  const errors = useSearchStore((state) => state.errors[name]);
  const setErrors = useSearchStore((state) => state.setErrors);
  const locale = useLocale();

  const {
    open,
    value,
    onInputChange,
    cities,
    onSelectCity,
    highlightedIndex,
    handleToggleOpen,
    onKeyDown,
    handleBlur,
    inputRef,
    handleClearMobileInput,
    placeholder,
  } = useCitySearch({
    name,
  });

  switch (variant) {
    case 'desktop':
      return (
        <div role="dropdown-warapp" className="relative">
          <MainSearchInput
            classNames={`border-r border-r-slate-200 dark:border-r-slate-700 ${
              open && 'dark:border-r-transparent border-r-transparent'
            } ${Boolean(errors) && 'dark:border-r-transparent border-r-transparent'}`}
            startIcon={name === 'from' ? <IconFrom /> : <IconTo />}
            ref={inputRef}
            type="text"
            value={value}
            name={name}
            open={open}
            placeholder={placeholder}
            onKeyDown={onKeyDown}
            onChange={(e) => {
              onInputChange(e.target.value);
            }}
            onFocus={() => {
              if (errors) {
                setErrors(name, null);
              }
              handleToggleOpen();
            }}
            error={errors}
            errorMassage="required"
            onBlur={handleBlur}
            aria-invalid={Boolean(city)}
            spellCheck="false"
            endIcon={name === 'from' && <IconSwap />}
            swap={swap}
          />
          {open ? (
            <div
              className="absolute left-0 z-50 mt-5 duration-200 bg-white shadow-xs top-full rounded-2xl dark:bg-slate-800 dark:border dark:border-slate-900 overflow-y-scroll animate-in fade-in zoom-in p-4 max-h-86 w-[400px]"
              onMouseDown={(event) => {
                event.preventDefault();
                event.stopPropagation();
              }}
            >
              <ScrollArea>
                <CityList
                  cities={cities}
                  city={city}
                  highlightedIndex={highlightedIndex}
                  onSelectCity={onSelectCity}
                  isFetchingLocations={!!isFetchingLocations}
                  NotFoundCity={NotFoundCity}
                  LoaderCity={() => <MainLoader size={24} />}
                  locale={locale}
                />
              </ScrollArea>
            </div>
          ) : null}
        </div>
      );

    case 'mobile':
      return (
        <Sheet open={open} onOpenChange={handleToggleOpen}>
          <SheetTrigger asChild>
            <MainSearchInput
              startIcon={name === 'from' ? <IconFrom /> : <IconTo />}
              type="button"
              value={
                !!city
                  ? extractLocationDetails(city, locale).locationName
                  : name === 'from'
                    ? t('placeholderFrom')
                    : t('placeholderTo')
              }
              name={name}
              open={open}
              onFocus={() => {
                if (errors) {
                  setErrors(name, null);
                }
              }}
              endIcon={name === 'from' && <IconSwap />}
              swap={swap}
              error={errors}
              errorMassage="required"
            />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="sr-only"></SheetTitle>
              <SheetDescription className="sr-only"></SheetDescription>

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
            <div className="relative px-5 overflow-y-scroll grow bg-slate-50 dark:bg-slate-900">
              <div className="sticky top-0 left-0 right-0 h-12 bg-slate-50 dark:bg-slate-900 z-50">
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
              <div id="list-container" className="flex flex-col gap-2 mt-11">
                <ScrollArea>
                  <CityList
                    cities={cities}
                    city={city}
                    highlightedIndex={highlightedIndex}
                    onSelectCity={onSelectCity}
                    isFetchingLocations={!!isFetchingLocations}
                    hasBorder
                    NotFoundCity={NotFoundCity}
                    LoaderCity={() => <MainLoader size={24} />}
                    locale={locale}
                  />
                </ScrollArea>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      );

    default:
      return null;
  }
}
