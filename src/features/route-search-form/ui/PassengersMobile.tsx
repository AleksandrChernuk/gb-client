import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/shared/ui/drawer';
import { Button } from '@/shared/ui/button';
import { ChevronLeft, X } from 'lucide-react';
import { MainSearchInput } from './MainSearchInput';
import { useTranslations } from 'next-intl';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { IconPass } from '@/assets/icons/IconPass';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  v: number;
  open: boolean;
  value: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleIncrement: () => void;
  handleDecrement: () => void;
  handleBlur: (event: React.FocusEvent<HTMLDivElement>) => void;
  handleOpenChange: (isOpen: boolean) => void;
};

export default function PassengersMobile({
  v,
  open,
  value,
  setOpen,
  handleIncrement,
  handleDecrement,
  handleOpenChange,
}: Props) {
  const t = useTranslations(MESSAGE_FILES.COMMON);

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerTrigger asChild>
        <MainSearchInput name="date" startIcon={<IconPass />} type="button" value={value} />
      </DrawerTrigger>
      <DrawerContent className="rounded-t-3xl p-0 h-auto overflow-hidden border-t shadow-2xl">
        <DrawerDescription className="sr-only"></DrawerDescription>

        <DrawerHeader className="p-4 border-b text-left flex flex-row items-center justify-between border-none">
          <DrawerTitle className="text-lg font-bold flex items-center gap-2 text-slate-700 dark:text-slate-50">
            <IconPass />
            {t('placeholderPassengers')}
          </DrawerTitle>
        </DrawerHeader>
        <div className="p-6 pb-8 bg-background">
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-4 text-center">
            {t('passengers_count_title')}
          </p>
          <div className="flex items-center justify-center gap-6">
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 rounded-lg text-lg font-bold border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              onClick={handleDecrement}
              disabled={v <= 1}
            >
              −
            </Button>

            <span className="text-2xl font-bold tabular-nums w-10 text-center text-slate-700 dark:text-slate-50">
              {v}
            </span>

            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 rounded-lg text-lg font-bold border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              onClick={handleIncrement}
              disabled={v >= 10}
            >
              +
            </Button>
          </div>
          <DrawerClose asChild>
            <Button className="w-full mt-8 h-10 rounded-xl font-black text-sm">
              {t('done')}
            </Button>
          </DrawerClose>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
