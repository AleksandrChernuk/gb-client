import { IconCarriersBus } from '@/assets/icons/IconCarriersBus';
import { getCarrierLogo } from '@/features/router-carier-label/carrier.helpers';
import { cn } from '@/shared/lib/utils';
import { Badge } from '@/shared/ui/badge';

const CarrierLabel = ({
  carrierName,
  className,
  providerName,
}: {
  carrierName: string;
  className?: string;
  providerName?: string;
}) => {
  const Logo = getCarrierLogo(carrierName);
  return (
    <div
      className={cn(
        'flex items-center gap-2 text-xs leading-[18px] truncate text-slate-700 dark:text-slate-50',
        className,
      )}
    >
      {Logo ? (
        <div className="w-[45px] h-[16px] tablet:w-[70px] tablet:h-[24px] shrink-0">
          <Logo />
        </div>
      ) : (
        <>
          <div className="w-[45px] h-[16px] tablet:w-[70px] tablet:h-[24px] shrink-0">
            <IconCarriersBus />
          </div>

          <Badge variant="outline" className="font-medium truncate block text-[10px] tablet:text-xs">
            {carrierName}
          </Badge>
        </>
      )}

      {!!providerName && <div className="text-green-300">{providerName[0]}</div>}
    </div>
  );
};

export default CarrierLabel;
