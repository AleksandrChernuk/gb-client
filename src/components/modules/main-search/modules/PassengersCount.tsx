import { usePassengers } from '../hooks/usePassengers';
import { useShallow } from 'zustand/react/shallow';
import { useSearchStore } from '@/store/useSearch';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { useTranslations } from 'next-intl';
import { AnimatePresence } from 'motion/react';
import { motion } from 'motion/react';
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
                className="z-0 min-h-10 rounded-md size-full h-auto px-4 py-2 pl-8 tablet:px-9 laptop:px-12 tablet:py-4 outline-hidden bg-transparent focus:bg-gray_1 active:bg-gray_1 dark:focus:bg-black_2_for_text dark:active:bg-black_2_for_text placeholder-black dark:placeholder-gray_0 body_medium laptop:filter_input_medium_text text-black dark:text-grayy text-left text-nowrap truncate border-[1px] border-transparent"
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
                <Button variant={'link'} className="flex items-center gap-1 h5 text-text_prymery">
                  <ChevronLeft size={24} className="stroke-black_2_for_text dark:stroke-grayy" />
                  {t('backBtn')}
                </Button>
              </SheetClose>
            </SheetHeader>
            <ScrollArea className="relative px-5 overflow-y-scroll grow bg-grayy dark:bg-dark_bg">
              <div className="my-5">
                <h3 className="mb-6 h5 text-text_prymery"> {t('placeholderPassengers')}</h3>
                <div>
                  <PassengersButton type="adult" value={adult} />
                  <Separator className="h-[1px] my-4 rounded-lg bg-gray_0 dark:bg-black_2_for_text" />
                  <PassengersButton type="children" value={children} />
                </div>
              </div>
            </ScrollArea>
            <SheetFooter>
              <SheetClose asChild>
                <Button variant={'default'} className="w-full py-2  rounded-full h5">
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
              className="z-0 min-h-10 rounded-md size-full h-auto px-4 py-2 pl-8 tablet:px-9 laptop:px-12 tablet:py-4 outline-hidden bg-transparent focus:bg-gray_1 active:bg-gray_1 dark:focus:bg-black_2_for_text dark:active:bg-black_2_for_text placeholder-black dark:placeholder-gray_0 body_medium laptop:filter_input_medium_text text-black dark:text-grayy text-left text-nowrap truncate border-[1px] border-transparent"
              onClick={() => {
                handleToggleOpen();
              }}
            />
          </div>

          <AnimatePresence initial={false}>
            {open ? (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="absolute right-0 z-50 p-4 mt-5 space-y-2 bg-white shadow top-full w-fit rounded-2xl dark:bg-dark_main dark:border dark:border-dark_bg"
                key="box"
                onMouseDown={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                }}
              >
                <PassengersButton type="adult" value={adult} />
                <Separator className="h-[1px] my-4 rounded-lg bg-gray_0 dark:bg-black_2_for_text" />
                <PassengersButton type="children" value={children} />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      );

    default:
      return null;
  }
}
