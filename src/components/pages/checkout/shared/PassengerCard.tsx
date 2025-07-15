import { CustomCard } from '@/components/shared/CustomCard';
import { memo } from 'react';
import UniversalField from './UniversalField';
import { ProviderConfig } from '../helpers/providerConfig/types';

type Props = {
  providerConfig: ProviderConfig;
  i: number;
};

const PassengerCard = memo(function PassengerCard({ i, providerConfig }: Props) {
  return (
    <li>
      <CustomCard className="dark:bg-slate-800 space-y-2">
        <h3 className="text-sm tablet:text-xl text-green-300">{`Пасажир №${i + 1}`}</h3>
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
