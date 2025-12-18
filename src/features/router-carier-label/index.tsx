import { getCarrierLogo } from '@/features/router-carier-label/carrier.helpers';
import { ProviderName } from '@/features/router-carier-label/providers.constants';
import { cn } from '@/shared/lib/utils';
import { Badge } from '@/shared/ui/badge';
import Image from 'next/image';

const CarrierLabel = ({
  carrierName,
  className,
  providerName,
}: {
  carrierName: string;
  className?: string;
  providerName?: string;
}) => {
  const logo = getCarrierLogo(carrierName, providerName as ProviderName);

  return (
    <div
      className={cn(
        'flex items-center gap-2 text-xs leading-[18px] truncate text-slate-700 dark:text-slate-50',
        className,
      )}
    >
      {logo ? (
        <div className="w-full h-10 tablet:h-12 relative">
          <Image src={logo.src} alt={logo.alt} fill className="object-contain object-left" />
        </div>
      ) : (
        <Badge variant="outline" className="font-medium truncate block text-[10px] tablet:text-xs">
          {carrierName}
        </Badge>
      )}

      {!!providerName && <div className="text-green-300">{providerName[0]}</div>}
    </div>
  );
};

export default CarrierLabel;
