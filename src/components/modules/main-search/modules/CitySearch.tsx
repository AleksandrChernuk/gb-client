'use client';

import { useSearchStore } from '@/store/useSearch';
import { useLocale, useTranslations } from 'next-intl';
import { useCitySearch } from '../hooks/useCitySearch';
import { IconFrom } from '@/components/icons/IconFrom';
import { IconTo } from '@/components/icons/IconTo';
import { IconSwap } from '@/components/icons/IconSwap';
import { CityItem } from '../components/CityItem';
import { extractLocationDetails } from '@/lib/extractLocationDetails';
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
import { MainSearchInput } from '../components/MainSearchInput';

type Props = {
  name: 'from' | 'to';
  variant: 'mobile' | 'desktop';
};

export default function CitySearch({ name, variant }: Props) {
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

  switch (variant) {
    case 'desktop':
      return (
        <div role="dropdown-warapp" className="relative" onKeyDown={onKeyDown}>
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
            onBlur={handleBlur}
            aria-invalid={Boolean(city)}
            spellCheck="false"
            endIcon={name === 'from' && <IconSwap />}
            swap={swap}
          />
          {open ? (
            <div
              className="absolute left-0 z-50 p-4 mt-5 space-y-2 duration-200 bg-white shadow-xs top-full w-fit rounded-2xl dark:bg-slate-800 dark:border dark:border-slate-900 animate-in fade-in zoom-in tablet:min-w-[397px]"
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
              value={placeholder}
              name={name}
              open={open}
              onFocus={() => {
                if (errors) {
                  setErrors(name, null);
                }
              }}
              endIcon={name === 'from' && <IconSwap />}
              swap={swap}
            />
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
                      <CityItem
                        key={el.id}
                        el={element}
                        isSelected={city?.id === el.id}
                        isHighlighted={highlightedIndex === index}
                        handleSelectCity={() => onSelectCity(el)}
                      />
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
