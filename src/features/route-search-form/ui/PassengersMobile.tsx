import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui/sheet';
import { Button } from '@/shared/ui/button';
import { PassengersButton } from './helpers/PassengersButton';
import { ChevronLeft } from 'lucide-react';
import { MainSearchInput } from './MainSearchInput';
import { useTranslations } from 'next-intl';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { IconPass } from '@/assets/icons/IconPass';

type Props = {
  v: number;
  open: boolean;
  value: string;
  setOpen: (v: boolean) => void;
  handleIncrement: () => void;
  handleDecrement: () => void;
  handleBlur: (event: React.FocusEvent<HTMLDivElement>) => void;
  handleOpenChange: (isOpen: boolean) => void;
};

export default function PassengersMobile({
  v,
  open,
  value,
  handleIncrement,
  handleDecrement,
  handleOpenChange,
}: Props) {
  const t = useTranslations(MESSAGE_FILES.COMMON);

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
            <PassengersButton handleIcrement={handleIncrement} handleDecrement={handleDecrement} value={v} />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button
              variant={'default'}
              size={'primary'}
              className="w-full text-base font-bold leading-6 tracking-normal rounded-full"
            >
              {t('continue')}
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
