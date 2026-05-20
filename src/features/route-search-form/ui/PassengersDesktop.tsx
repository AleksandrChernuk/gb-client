import { MainSearchInput } from './MainSearchInput';
import { IconPass } from '@/assets/icons/IconPass';
import { useTranslations } from 'next-intl';
import { Dispatch, SetStateAction } from 'react';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { Button } from '@/shared/ui/button';

type Props = {
  v: number;
  open: boolean;
  value: string;
  handleIncrement: () => void;
  handleDecrement: () => void;
  handleOpenChange: (isOpen: boolean) => void;
  passCount: number;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function PassengersDesktop({
  v,
  open,
  value,
  handleIncrement,
  handleDecrement,
  setOpen,
}: Props) {
  const t = useTranslations(MESSAGE_FILES.COMMON);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <MainSearchInput
          classNames="w-full"
          name="date"
          startIcon={<IconPass />}
          type="button"
          value={value}
        />
      </PopoverTrigger>
      <PopoverContent
        className="p-4 w-64 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
        align="start"
      >
        <div className="p-2 space-y-4">
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            {t('passengers_count_title')}
          </p>
          <div className="flex items-center justify-between gap-3">
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 rounded-lg text-2xl font-bold border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              onClick={handleDecrement}
              disabled={v <= 1}
            >
              −
            </Button>

            <span className="text-2xl font-bold tabular-nums w-12 text-center text-slate-700 dark:text-slate-50">
              {v}
            </span>

            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 rounded-lg text-2xl font-bold border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              onClick={handleIncrement}
              disabled={v >= 10}
            >
              +
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
