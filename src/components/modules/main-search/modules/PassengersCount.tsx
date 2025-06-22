import { useShallow } from 'zustand/react/shallow';
import { useSearchStore } from '@/store/useSearch';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { useTranslations } from 'next-intl';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { IconPass } from '@/components/icons/IconPass';
import { Button } from '@/components/ui/button';
import { PassengersButton } from '../components/PassengersButton';
import { ChevronLeft } from 'lucide-react';
import { MainSearchInput } from '../components/MainSearchInput';
import { MESSAGE_FILES } from '@/constans/message.file.constans';
import { useCallback, useState } from 'react';
import { useUpdateSearchParams } from '@/hooks/useUpdateSearchParams';

type Props = {
  variant: 'mobile' | 'desktop';
};

export default function PassengersCount({ variant }: Props) {
  const adult = useSearchStore(useShallow((state) => state.adult));
  const children = useSearchStore(useShallow((state) => state.children));
  const setPassenger = useSearchStore((state) => state.setPassenger);
  const { setManyParams } = useUpdateSearchParams();

  const [a, setA] = useState(() => adult);
  const [c, setC] = useState(() => children);

  const [open, setOpen] = useState<boolean>(false);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setPassenger('adult', a);
      setPassenger('children', c);
      setManyParams({ adult: `${a}`, children: `${c}` });
    }
  };

  const handleIncrement = ({ type }: { type: 'adult' | 'children' }) => {
    switch (type) {
      case 'adult':
        return setA((p) => p + 1);

      case 'children':
        return setC((p) => p + 1);

      default:
        return;
    }
  };

  const handleDecrement = ({ type }: { type: 'adult' | 'children' }) => {
    switch (type) {
      case 'adult':
        return setA((p) => p - 1);

      case 'children':
        return setC((p) => p - 1);

      default:
        return;
    }
  };

  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLDivElement>) => {
      if (!event.currentTarget.contains(event.relatedTarget)) {
        setOpen(false);
        setPassenger('adult', a);
        setPassenger('children', c);
        setManyParams({ adult: `${a}`, children: `${c}` });
      }
    },
    [a, c, setManyParams, setPassenger],
  );

  const t = useTranslations(MESSAGE_FILES.COMMON);

  const passCount = a + c;
  const value =
    passCount === 1
      ? `${passCount} ${t('placeholderPassenger')}`
      : passCount > 4
        ? `${passCount} ${t('placeholderPassengersGenitive')}`
        : `${passCount} ${t('placeholderPassengers')}`;

  switch (variant) {
    case 'mobile':
      return (
        <Sheet open={open} onOpenChange={handleOpenChange}>
          <SheetTrigger asChild>
            <MainSearchInput name="date" startIcon={<IconPass />} type="button" value={value} />
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
              <div className="my-5">
                <h3 className="mb-6 text-base font-bold leading-6 tracking-normal text-slate-700 dark:text-slate-50">
                  {t('placeholderPassengers')}
                </h3>
                <div>
                  <PassengersButton
                    handleIcrement={() => handleIncrement({ type: 'adult' })}
                    handleDecrement={() => handleDecrement({ type: 'adult' })}
                    type="adult"
                    value={a}
                  />
                  <Separator className="h-[1px] my-4 rounded-lg bg-[#e6e6e6] dark:bg-slate-700" />
                  <PassengersButton
                    handleIcrement={() => handleIncrement({ type: 'children' })}
                    handleDecrement={() => handleDecrement({ type: 'children' })}
                    type="children"
                    value={c}
                  />
                </div>
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button
                  variant={'default'}
                  className="w-full py-2 text-base font-bold leading-6 tracking-normal rounded-full"
                >
                  {t('continue')}
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      );

    case 'desktop':
      return (
        <div role="dropdown-warapp" className="relative" onBlur={handleBlur}>
          <MainSearchInput
            name="date"
            startIcon={<IconPass />}
            type="button"
            value={
              passCount === 1
                ? `${passCount} ${t('placeholderPassenger')}`
                : passCount > 4
                  ? `${passCount} ${t('placeholderPassengersGenitive')}`
                  : `${passCount} ${t('placeholderPassengers')}`
            }
            onClick={() => {
              setOpen((p) => !p);
            }}
          />

          {open ? (
            <div
              className="absolute right-0 z-50 p-4 mt-5 space-y-2 duration-200 bg-white shadow-xs top-full w-fit rounded-2xl dark:bg-slate-800 dark:border dark:border-slate-900 animate-in fade-in zoom-in tablet:min-w-[397px]"
              onMouseDown={(event) => {
                event.preventDefault();
                event.stopPropagation();
              }}
            >
              <PassengersButton
                type="adult"
                value={a}
                handleIcrement={() => handleIncrement({ type: 'adult' })}
                handleDecrement={() => handleDecrement({ type: 'adult' })}
              />
              <Separator className="h-[1px] my-4 rounded-lg bg-[#e6e6e6] dark:bg-slate-700" />
              <PassengersButton
                type="children"
                value={c}
                handleIcrement={() => handleIncrement({ type: 'children' })}
                handleDecrement={() => handleDecrement({ type: 'children' })}
              />
            </div>
          ) : null}
        </div>
      );

    default:
      return null;
  }
}
