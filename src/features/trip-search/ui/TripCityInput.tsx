'use client';

import { useLocale, useTranslations } from 'next-intl';
import { ILocation } from '@/shared/types/location.types';
import { TripSearchInput } from './TripSearchInput';
import { IconFrom } from '@/assets/icons/IconFrom';
import { IconTo } from '@/assets/icons/IconTo';
import { IconSwap } from '@/assets/icons/IconSwap';
import { ScrollArea } from '@/shared/ui/scroll-area';
import { extractLocationDetails } from '@/shared/lib/extractLocationDetails';
import MainLoader from '@/shared/ui/MainLoader';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui/sheet';
import { Button } from '@/shared/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useRouterSearch } from '@/shared/hooks/useRouterSearch';
import { useCityInput } from '@/features/trip-search/hooks/useCityInput';
import { CityItem } from '@/features/trip-search/ui/CityItem';
import { NotFoundCity } from '@/features/trip-search/ui/NotFoundCity';
import { ClearInputButton } from '@/features/trip-search/ui/ClearInputButton';

type Props = {
  name: 'from' | 'to';
  variant: 'mobile' | 'desktop';
  initialFavorites: ILocation[];
  city: ILocation | null;
  error?: string | null;
  resetError: () => void;
};

export function TripCityInput({ name, variant, initialFavorites, city, error, resetError }: Props) {
  const locale = useLocale();
  const t = useTranslations(MESSAGE_FILES.COMMON);
  const t_form = useTranslations(MESSAGE_FILES.FORM);
  const [, actions] = useRouterSearch();

  const {
    open,
    cities,
    isFetching,
    isSearching,
    highlightedIndex,
    inputRef,
    inputValue,
    placeholder,
    onSelectCity,
    onInputChange,
    onKeyDown,
    handleBlurDesktop,
    handleFocusDesktop,
    handleOpenChangeMobile,
    handleClear,
  } = useCityInput({ name, initialFavorites, initialCity: city, resetError });

  const startIcon = name === 'from' ? <IconFrom /> : <IconTo />;
  const endIcon = name === 'from' ? <IconSwap /> : undefined;
  const mobilePlaceholder = city ? extractLocationDetails(city, locale).locationName : placeholder;

  const cityList = (
    <div className="flex flex-col">
      {!isSearching && (
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">{t('popularCities')}</p>
      )}
      {isFetching ? (
        <MainLoader size={24} />
      ) : !cities.length ? (
        <NotFoundCity />
      ) : (
        <ScrollArea>
          <div className="max-h-83.5">
            {cities.map((el, idx) => (
              <CityItem
                key={el.id}
                el={extractLocationDetails(el, locale)}
                isSelected={city?.id === el.id}
                isHighlighted={highlightedIndex === idx}
                onSelect={() => onSelectCity(el)}
              />
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );

  if (variant === 'mobile') {
    return (
      <Sheet open={open} onOpenChange={handleOpenChangeMobile}>
        <SheetTrigger asChild>
          <TripSearchInput
            name={name}
            startIcon={startIcon}
            endIcon={endIcon}
            swap={actions.swap}
            type="button"
            value={inputValue.length ? inputValue : placeholder}
            error={error}
            errorMessage={t_form('required')}
          />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="sr-only" />
            <SheetDescription className="sr-only" />
            <SheetClose asChild>
              <Button
                variant="link"
                className="flex items-center gap-1 text-base font-bold text-slate-700 dark:text-slate-50"
              >
                <ChevronLeft size={24} className="stroke-slate-700 dark:stroke-slate-50" />
                {t('backBtn')}
              </Button>
            </SheetClose>
          </SheetHeader>

          {/* sticky инпут поиска */}
          <div className="sticky top-0 z-10 px-5 py-3 bg-slate-50 dark:bg-slate-900">
            <div className="relative">
              <input
                type="text"
                value={inputValue}
                placeholder={mobilePlaceholder}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onInputChange(e.target.value)}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                className="text-slate-700 dark:text-slate-50 placeholder:text-slate-400 dark:placeholder:text-slate-500 p-4 pr-12 w-full bg-white dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-600 focus:border-green-400 focus:outline-none"
              />
              {inputValue.length > 0 && <ClearInputButton onClear={handleClear} />}
            </div>
          </div>

          {/* список городов */}
          <div className="flex-1 overflow-y-auto px-5 py-2 bg-slate-50 dark:bg-slate-900">{cityList}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div className="relative" onBlur={handleBlurDesktop}>
      <TripSearchInput
        name={name}
        ref={inputRef}
        type="text"
        value={inputValue}
        placeholder={placeholder}
        error={error}
        errorMessage={t_form('required')}
        startIcon={startIcon}
        endIcon={endIcon}
        swap={actions.swap}
        spellCheck={false}
        className={[
          'border-r border-r-slate-200 dark:border-r-slate-700',
          open ? 'border-r-transparent dark:border-r-transparent' : '',
          error ? 'border-r-transparent dark:border-r-transparent' : '',
        ].join(' ')}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onInputChange(e.target.value)}
        onFocus={handleFocusDesktop}
        onKeyDown={onKeyDown}
      />
      {open && (
        <div
          className="absolute left-0 z-50 mt-5 top-full w-[400px] bg-white dark:bg-slate-800 dark:border dark:border-slate-900 rounded-2xl shadow-sm p-4 animate-in fade-in zoom-in duration-200"
          onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          {cityList}
        </div>
      )}
    </div>
  );
}
