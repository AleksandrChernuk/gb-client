import { MainLoader } from '@/components/shared/MainLoader';
import { TcityKey } from '@/store/useSearch/types';
import { ILocation } from '@/types/location.types';
import { RefObject } from 'react';
import { NotFoundCity } from './NotFoundCity';
import CityList from './CityList';
import { ClearInputButton } from './ClearInputButton';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { IconSwap } from '@/assets/icons/IconSwap';
import { extractLocationDetails } from '@/lib/extractLocationDetails';
import { MainSearchInput } from './MainSearchInput';
import { IconFrom } from '@/assets/icons/IconFrom';
import { IconTo } from '@/assets/icons/IconTo';
import { useTranslations } from 'next-intl';
import { MESSAGE_FILES } from '@/constans/message.file.constans';

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
  handleClearMobileInput: () => void;
};

export default function CitySearchMobile({
  name,
  open,
  value,
  onInputChange,
  errors,
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
  handleClearMobileInput,
}: Props) {
  const t = useTranslations(MESSAGE_FILES.COMMON);

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
          errorMassage={t('required')}
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
                className="text-slate-700 dark:text-slate-50 placeholder:text-slate-300 dark:placeholder:text-slate-600 p-4 pr-10 h-full w-full bg-white dark:bg-slate-800 rounded-lg border-[1px] border-slate-700 focus:border-green-300 outline-green-300 placeholder:italic"
              />
              <ClearInputButton handleClear={handleClearMobileInput} />
            </div>
          </div>
          <div id="list-container" className="flex flex-col gap-2 mt-11">
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
              className="max-h-full"
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
