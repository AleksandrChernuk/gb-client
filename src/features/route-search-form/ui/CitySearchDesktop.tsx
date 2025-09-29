import React, { RefObject } from 'react';
import CityList from './helpers/CityList';
import { IconFrom } from '@/assets/icons/IconFrom';
import { IconTo } from '@/assets/icons/IconTo';
import { MainSearchInput } from './MainSearchInput';
import { ILocation } from '@/shared/types/location.types';
import { TcityKey } from '@/shared/store/useSearch/types';
import { IconSwap } from '@/assets/icons/IconSwap';
import { NotFoundCity } from './helpers/NotFoundCity';
import { useTranslations } from 'next-intl';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import MainLoader from '@/shared/ui/MainLoader';

type Props = {
  name: 'from' | 'to';
  open: boolean;
  value: string;
  inputRef: RefObject<HTMLInputElement | null>;
  onInputChange: (v: string) => void;
  handleBlur: (event: React.FocusEvent<HTMLDivElement>) => void;
  errors: string | null;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder: string;
  handleToggleOpen: () => void;
  setErrors: (cityKey: TcityKey, error: string | null) => void;
  swap: () => void;
  cities: ILocation[];
  highlightedIndex: number;
  locale: 'en' | 'ru' | 'uk';
  city: ILocation | null;
  onSelectCity: (newCity: ILocation) => void;
  isFetchingLocations: number;
};

export default function CitySearchDesktop({
  name,
  open,
  value,
  inputRef,
  onInputChange,
  handleBlur,
  errors,
  onKeyDown,
  placeholder,
  handleToggleOpen,
  setErrors,
  swap,
  cities,
  highlightedIndex,
  locale,
  city,
  onSelectCity,
  isFetchingLocations,
}: Props) {
  const t_form = useTranslations(MESSAGE_FILES.FORM);

  return (
    <div role="dropdown-warapp" className="relative">
      <MainSearchInput
        classNames={`border-r border-r-slate-200 dark:border-r-slate-700  ${
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
        errorMassage={t_form('required')}
        onBlur={handleBlur}
        aria-invalid={Boolean(city)}
        spellCheck="false"
        endIcon={name === 'from' && <IconSwap />}
        swap={swap}
      />
      {open ? (
        <div
          className="absolute left-0 z-50 mt-5 duration-200 bg-white shadow-xs top-full rounded-2xl dark:bg-slate-800 dark:border dark:border-slate-900 animate-in fade-in zoom-in p-4 w-[400px]"
          onMouseDown={(event) => {
            event.preventDefault();
            event.stopPropagation();
          }}
        >
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
        </div>
      ) : null}
    </div>
  );
}
