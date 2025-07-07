import { cn } from '@/lib/utils';
import { LoaderIcon, X } from 'lucide-react';
import IconSeat from '../icons/IconSeat';

type Props = {
  seat_number: string | null;
  className?: string;
  isFree?: boolean;
  available?: boolean;
  isSelected?: boolean;
  onClick: () => void;
  loading?: boolean;
};

export default function Seat({ seat_number, className, isSelected, isFree, available, onClick, loading }: Props) {
  return (
    <div
      role="button"
      aria-pressed={isSelected}
      tabIndex={available ? 0 : -1}
      onClick={() => available && onClick()}
      className={cn(
        'relative flex flex-col items-center dap-0.5 w-[45px] h-[55px] tablet:w-[55px] tablet:h-[65px] cursor-pointer',
        '[&_svg]:fill-[#6f8b90] dark:[&_svg]:fill-slate-50',
        !isFree && '[&_svg]:fill-slate-200 dark:[&_svg]:fill-slate-700',
        isSelected && '[&_svg]:fill-green-100 dark:[&_svg]:fill-green-100',
        !available && 'cursor-default',
        className,
      )}
    >
      <IconSeat />
      <div
        className={cn(
          '-mt-10 text-base font-medium leading-4 tracking-normal text-[#6f8b90] dark:text-slate-50',
          isSelected && 'text-green-100 dark:text-green-100',
        )}
      >
        {isFree ? (
          loading ? (
            <LoaderIcon className=" animate-spin" />
          ) : (
            seat_number
          )
        ) : (
          <X className="stroke-slate-200 dark:stroke-slate-700" />
        )}
      </div>
    </div>
  );
}
