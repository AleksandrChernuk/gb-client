import { Separator } from '@radix-ui/react-dropdown-menu';
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
import { useTranslations } from 'next-intl';
import { MESSAGE_FILES } from '@/constans/message.file.constans';

type Props = {
  a: number;
  c: number;
  open: boolean;
  value: string;
  setOpen: (v: boolean) => void;
  handleIncrement: ({ type }: { type: 'adult' | 'children' }) => void;
  handleDecrement: ({ type }: { type: 'adult' | 'children' }) => void;
  handleBlur: (event: React.FocusEvent<HTMLDivElement>) => void;
  handleOpenChange: (isOpen: boolean) => void;
};

export default function PassengersMobile({
  a,
  c,
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
}
