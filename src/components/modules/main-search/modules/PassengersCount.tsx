import { usePassengers } from '../hooks/usePassengers';
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
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { Button } from '@/components/ui/button';
import { StartIcon } from '../components/StartIcon';
import { PassengersButton } from '../components/PassengersButton';
import { ChevronLeft } from 'lucide-react';

type Props = {
  type: 'mobile' | 'desktop';
};

export default function PassengersCount({ type }: Props) {
  const { open, handleToggleOpen, handleBlur } = usePassengers();
  const adult = useSearchStore(useShallow((state) => state.adult));
  const children = useSearchStore(useShallow((state) => state.children));

  const t = useTranslations('common');

  const passCount = adult + children;
  const value =
    passCount === 1
      ? `${passCount} ${t('placeholderPassenger')}`
      : passCount > 4
        ? `${passCount} ${t('placeholderPassengersGenitive')}`
        : `${passCount} ${t('placeholderPassengers')}`;

  switch (type) {
    case 'mobile':
      return (
        <Sheet open={open} onOpenChange={handleToggleOpen}>
          <SheetTrigger asChild>
            <div className="relative">
              <StartIcon icon={<IconPass />} />
              <input
                type="button"
                value={value}
                className="z-0 min-h-10 rounded-md size-full h-auto px-4 py-2 pl-8 tablet:px-9 laptop:px-12 tablet:py-4 outline-hidden bg-transparent focus:bg-slate-200 active:bg-slate-200 dark:focus:bg-slate-700 dark:active:bg-slate-700 placeholder-black dark:placeholder-[#e6e6e6] text-base tracking-normal leading-[24px] laptop:text-lg laptop:font-medium laptop:tracking-tighter laptop:leading-[21.6px] text-black dark:text-slate-50 text-left text-nowrap truncate border-[1px] border-transparent"
              />
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
              <div className="my-5">
                <h3 className="mb-6 text-base font-bold leading-6 tracking-normal text-slate-700 dark:text-slate-50">
                  {t('placeholderPassengers')}
                </h3>
                <div>
                  <PassengersButton type="adult" value={adult} />
                  <Separator className="h-[1px] my-4 rounded-lg bg-[#e6e6e6] dark:bg-slate-700" />
                  <PassengersButton type="children" value={children} />
                </div>
              </div>
            </ScrollArea>
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
          <div className="relative">
            <StartIcon icon={<IconPass />} />
            <input
              type="button"
              value={
                passCount === 1
                  ? `${passCount} ${t('placeholderPassenger')}`
                  : passCount > 4
                    ? `${passCount} ${t('placeholderPassengersGenitive')}`
                    : `${passCount} ${t('placeholderPassengers')}`
              }
              className="z-0 min-h-10 rounded-md size-full h-auto px-4 py-2 pl-8 tablet:px-9 laptop:px-12 tablet:py-4 outline-hidden bg-transparent focus:bg-slate-200 active:bg-slate-200 dark:focus:bg-slate-700 dark:active:bg-slate-700 placeholder-black dark:placeholder-[#e6e6e6] text-base font-medium tracking-normal leading-[24px] laptop:text-lg  laptop:font-medium  laptop:tracking-tighter  laptop:leading-[21.6px] text-black dark:text-slate-50 text-left text-nowrap truncate border-[1px] border-transparent"
              onClick={() => {
                handleToggleOpen();
              }}
            />
          </div>

          {open ? (
            <div
              className="absolute right-0 z-50 p-4 mt-5 space-y-2 duration-200 bg-white shadow-xs top-full w-fit rounded-2xl dark:bg-slate-800 dark:border dark:border-slate-900 animate-in fade-in zoom-in tablet:min-w-[397px]"
              onMouseDown={(event) => {
                event.preventDefault();
                event.stopPropagation();
              }}
            >
              <PassengersButton type="adult" value={adult} />
              <Separator className="h-[1px] my-4 rounded-lg bg-[#e6e6e6] dark:bg-slate-700" />
              <PassengersButton type="children" value={children} />
            </div>
          ) : null}
        </div>
      );

    default:
      return null;
  }
}
