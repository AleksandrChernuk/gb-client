'use client';

import { Dispatch, SetStateAction } from 'react';
import { useAutocomplete } from '../hooks/useAutocomplete';
import { useCityData } from '../hooks/useCityData';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose, DrawerDescription } from '@/shared/ui/drawer';
import { MapPin, X, Search } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { extractLocationDetails } from '@/shared/lib/extractLocationDetails';
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from '@/shared/ui/command';
import { CityItem } from '@/features/route-search-form/ui/helpers/CityItem';
import { MainSearchInput } from './MainSearchInput';
import { IconFrom } from '@/assets/icons/IconFrom';
import { IconTo } from '@/assets/icons/IconTo';
import { IconSwap } from '@/assets/icons/IconSwap';
import { useLocale, useTranslations } from 'next-intl';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { useRouterSearch } from '@/shared/hooks/useRouterSearch';

type Tname = 'from' | 'to';

type Props = {
  name: Tname;
  variant: 'mobile' | 'desktop';
  error?: string | null;
  resetError?: () => void;
  setErrorsRaw?: Dispatch<
    SetStateAction<{
      from?: string | null;
      to?: string | null;
    }>
  >;
};

export function AutocompleteV2({ name, variant, error, resetError }: Props) {
  const {
    cities,
    onSelectCity,
    onInputChange,
    value: inputValue,
    placeholder,
    isLoading,
    open,
    setOpen,
  } = useAutocomplete({ name });

  const { fromCity, toCity } = useCityData();
  const city = name === 'from' ? fromCity : toCity;

  const [, actions] = useRouterSearch();
  const swap = actions.swap;
  const t_form = useTranslations(MESSAGE_FILES.FORM);
  const t = useTranslations(MESSAGE_FILES.COMMON);
  const locale = useLocale();

  const displayLabel = city ? extractLocationDetails(city, locale).locationName : null;

  const handleSelect = (loc: (typeof cities)[number]) => {
    onSelectCity(loc);
    setOpen(false);
  };

  const commandContent = (
    <Command className="rounded-none border-none h-full bg-transparent" shouldFilter={false}>
      <div className="px-3 py-1.5 border-b bg-muted/10 dark:bg-transparent">
        <div className="relative flex items-center bg-muted/20 dark:bg-slate-800 rounded-xl px-2.5 border border-primary/50 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
          <Search className="w-4 h-4 text-muted-foreground shrink-0" />
          <input
            placeholder={t('enterCity')}
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
            onFocus={(e) => {
              const target = e.target;
              setTimeout(() => {
                const val = target.value;
                target.setSelectionRange(val.length, val.length);
              }, 10);
            }}
            className="flex h-12 w-full bg-transparent py-2 text-[15px] outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 px-2"
          />
          {inputValue && (
            <button
              onClick={() => onInputChange('')}
              className="p-1.5 hover:bg-primary/25 rounded-full transition-colors flex items-center justify-center bg-primary/15 text-primary shrink-0"
              aria-label="Clear"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>
          )}
        </div>
      </div>
      <CommandList
        className={cn(
          "overflow-y-auto px-2 pt-2 pb-2 scrollbar-thin scrollbar-thumb-primary/10 hover:scrollbar-thumb-primary/20",
          variant === 'mobile' ? "max-h-none h-full flex-1" : "max-h-[340px]"
        )}
      >
        <CommandEmpty className="py-12 text-center">
          {isLoading ? (
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="w-8 h-8 border-4 border-muted-foreground/20 border-t-muted-foreground rounded-full animate-spin" />
            </div>
          ) : (
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4 opacity-50">
              <MapPin className="w-8 h-8 text-muted-foreground" />
            </div>
          )}
          <p className="text-muted-foreground text-sm font-medium">
            {isLoading ? t('searching') : inputValue.trim().length === 0 ? t('startTypingCity') : t('cityNotFound')}
          </p>
        </CommandEmpty>
        <CommandGroup>
          {cities.map((loc) => {
            const details = extractLocationDetails(loc, locale);
            const isSelected = city?.id === loc.id;
            return (
              <CommandItem
                key={loc.id}
                value={`${details.locationName}-${loc.id}`}
                onSelect={() => handleSelect(loc)}
                className="p-0 rounded-xl mb-1.5 overflow-hidden border-none"
              >
                <div className={cn('w-full transition-all duration-200', isSelected ? 'bg-primary p-0.5' : 'p-0')}>
                  <CityItem
                    el={details}
                    isSelected={isSelected}
                    handleSelectCity={() => handleSelect(loc)}
                    isHighlighted={false}
                  />
                </div>
              </CommandItem>
            );
          })}
        </CommandGroup>
      </CommandList>
    </Command>
  );

  const trigger = (
    <MainSearchInput
      classNames={cn(
        'w-full',
        variant === 'desktop'
          ? `border-r border-r-slate-200 dark:border-r-slate-700 ${open && 'dark:border-r-transparent border-r-transparent'
          } ${Boolean(error) && 'dark:border-r-transparent border-r-transparent'}`
          : '',
      )}
      startIcon={name === 'from' ? <IconFrom /> : <IconTo />}
      name={name}
      open={open}
      placeholder={placeholder}
      readOnly={true}
      value={displayLabel || placeholder}
      error={error}
      errorMassage={t_form('required')}
      endIcon={name === 'from' ? <IconSwap /> : undefined}
      swap={swap}
      onClick={() => {
        if (error && resetError) {
          resetError();
        }
        setOpen(true);
      }}
    />
  );

  if (variant === 'mobile') {
    return (
      <div className="w-full">
        {trigger}
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent
            className="h-[92dvh] max-h-[92dvh] px-0 pb-0 rounded-t-[24px] overflow-hidden border-t shadow-2xl flex flex-col"
          >
            <div className="flex flex-col h-full bg-background">
              <DrawerHeader className="text-left border-none">
                <DrawerTitle className="sr-only"></DrawerTitle>
                <DrawerDescription className="sr-only"></DrawerDescription>

                <div className="flex items-center justify-between w-full">
                  <span className="text-base font-black tracking-tight text-slate-700 dark:text-slate-50">
                    {name === 'from' ? t('headerFrom') : t('headerTo')}
                  </span>
                </div>
              </DrawerHeader>
              <div className="flex-1 overflow-hidden pt-3">{commandContent}</div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Popover open={open} onOpenChange={setOpen} modal={false}>
        <PopoverTrigger asChild>{trigger}</PopoverTrigger>
        <PopoverContent
          className="p-2 w-[375px] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
          align="start"
          sideOffset={8}
        >
          {commandContent}
        </PopoverContent>
      </Popover>
    </div>
  );
}
