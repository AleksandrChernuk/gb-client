import { CustomCard } from '@/components/shared/CustomCard';
import { memo } from 'react';
import UniversalField from './UniversalField';
import { ProviderConfig } from '../helpers/providerConfig/types';
import { useTranslations } from 'next-intl';
import { MESSAGE_FILES } from '@/constans/message.file.constans';

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
        <h3 className="text-sm tablet:text-xl text-green-300">
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

export default PassengerCard;
