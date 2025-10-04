import { memo } from 'react';
import { useTranslations } from 'next-intl';
import { ProviderConfig } from '@/shared/types/checkot.types';
import CustomCard from '@/shared/ui/CustomCard';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import UniversalField from '@/entities/checkout/UniversalField';

type Props = {
  providerConfig: ProviderConfig;
  isChild?: boolean;
  i: number;
};

const PassengerCard = memo(function PassengerCard({ i, providerConfig, isChild }: Props) {
  const t = useTranslations(MESSAGE_FILES.CHECKOUT_PAGE);

  return (
    <li>
      <CustomCard className="dark:bg-slate-800 space-y-2">
        <h3 className="text-sm tablet:text-xl text-green-200">
          {isChild
            ? `${t('child_passenger')} ${t('passenger_number', { number: i + 1 })}`
            : `${t('passenger')} ${t('passenger_number', { number: i + 1 })}`}
        </h3>
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
          {providerConfig.required.map((fieldName) => {
            return (
              <UniversalField
                i={i}
                key={`${fieldName}-${i + 1}`}
                name={`passengers.${i}.${fieldName}`}
                config={providerConfig.fields[fieldName]}
              />
            );
          })}
        </div>
      </CustomCard>
    </li>
  );
});

export default memo(PassengerCard, (prev, next) => {
  return prev.i === next.i && prev.isChild === next.isChild && prev.providerConfig === next.providerConfig;
});
