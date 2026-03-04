// features/trip-search/ui/CityInput.tsx
'use client';

import { RefObject } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { ILocation } from '@/shared/types/location.types';
import { IconFrom } from '@/assets/icons/IconFrom';
import { IconTo } from '@/assets/icons/IconTo';
import { IconSwap } from '@/assets/icons/IconSwap';
import { ScrollArea } from '@/shared/ui/scroll-area';
import { CityItem } from '@/features/route-search-form/ui/helpers/CityItem';
import { NotFoundCity } from '@/features/route-search-form/ui/helpers/NotFoundCity';
import { extractLocationDetails } from '@/shared/lib/extractLocationDetails';
import MainLoader from '@/shared/ui/MainLoader';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { MainSearchInput } from '@/features/route-search-form/ui/MainSearchInput';

type Props = {
  name: 'from' | 'to';
  open: boolean;
  value: string;
  inputRef: RefObject<HTMLInputElement | null>;
  cities: ILocation[];
  city: ILocation | null;
  highlightedIndex: number;
  isFetching: boolean;
  isSearching: boolean;
  error?: string | null;
  placeholder: string;
  swap: () => void;
  onInputChange: (v: string) => void;
  onSelectCity: (city: ILocation) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLDivElement>) => void;
  handleToggleOpen: () => void;
  resetError: () => void;
};

export function CityInput({
  name,
  open,
  value,
  inputRef,
  cities,
  city,
  highlightedIndex,
  isFetching,
  isSearching,
  error,
  placeholder,
  swap,
  onInputChange,
  onSelectCity,
  onKeyDown,
  handleBlur,
  handleToggleOpen,
  resetError,
}: Props) {
  const locale = useLocale();
  const t = useTranslations(MESSAGE_FILES.FORM);

  return (
    <div className="relative" onBlur={handleBlur}>
      <MainSearchInput
        name={name}
        value={value}
        ref={inputRef}
        placeholder={placeholder}
        error={error}
        errorMassage={t('required')}
        startIcon={name === 'from' ? <IconFrom /> : <IconTo />}
        endIcon={name === 'from' ? <IconSwap /> : undefined}
        swap={swap}
        spellCheck={false}
        classNames={`border-r border-r-slate-200 dark:border-r-slate-700
          ${open ? 'border-r-transparent dark:border-r-transparent' : ''}
          ${error ? 'border-r-transparent dark:border-r-transparent' : ''}
        `}
        onChange={(e) => onInputChange(e.target.value)}
        onFocus={() => {
          resetError();
          handleToggleOpen();
          onInputChange('');
        }}
        onKeyDown={onKeyDown}
      />

      {open && (
        <div
          className="absolute left-0 z-50 mt-5 top-full w-[400px] bg-white dark:bg-slate-800 dark:border dark:border-slate-900 rounded-2xl shadow-sm p-4 animate-in fade-in zoom-in duration-200"
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          {!isSearching && (
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Популярні міста</p>
          )}

          {isFetching ? (
            <MainLoader size={24} />
          ) : cities.length === 0 ? (
            <NotFoundCity />
          ) : (
            <ScrollArea>
              <div className="max-h-[334px]">
                {cities.map((el, idx) => {
                  const details = extractLocationDetails(el, locale);
                  return (
                    <CityItem
                      key={el.id}
                      el={details}
                      isSelected={city?.id === el.id}
                      isHighlighted={highlightedIndex === idx}
                      handleSelectCity={() => onSelectCity(el)}
                    />
                  );
                })}
              </div>
            </ScrollArea>
          )}
        </div>
      )}
    </div>
  );
}
