import { IconCarriersBus } from '@/assets/icons/IconCarriersBus';
import { cn } from '@/shared/lib/utils';
import { Badge } from '@/shared/ui/badge';

const CarrierLabel = ({ carrierName, className }: { carrierName: string; className?: string }) => {
  return (
    <div
      className={cn(
        'flex items-center gap-2 text-xs font-normal tracking-normal leading-[18px] text-slate-700 dark:text-slate-50 shrink grow-0 text-nowrap truncate ...',
        className,
      )}
    >
      <div className="w-[45px] h-[16px] tablet:w-[70px] tablet:h-[24px] grow-0">
        <IconCarriersBus />
      </div>

      <Badge
        variant={'outline'}
        className="transition-none font-medium truncate block text-[10px] tablet:text-xs tracking-normal leading-[18px] break-all text-slate-700 dark:text-slate-50 "
      >
        {carrierName}
      </Badge>
    </div>
  );
};

export default CarrierLabel;
