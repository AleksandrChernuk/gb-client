import { Separator } from '@/components/ui/separator';
import { PassengersButton } from './PassengersButton';
import { MainSearchInput } from './MainSearchInput';
import { IconPass } from '@/assets/icons/IconPass';
import { useTranslations } from 'next-intl';
import { MESSAGE_FILES } from '@/constans/message.file.constans';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  a: number;
  c: number;
  open: boolean;
  value: string;
  handleIncrement: ({ type }: { type: 'adult' | 'children' }) => void;
  handleDecrement: ({ type }: { type: 'adult' | 'children' }) => void;
  handleOpenChange: (isOpen: boolean) => void;
  handleBlur: (event: React.FocusEvent<HTMLDivElement>) => void;
  passCount: number;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function PassengersDesktop({
  a,
  c,
  open,
  handleIncrement,
  handleDecrement,
  handleBlur,
  passCount,
  setOpen,
}: Props) {
  const t = useTranslations(MESSAGE_FILES.COMMON);

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
}
