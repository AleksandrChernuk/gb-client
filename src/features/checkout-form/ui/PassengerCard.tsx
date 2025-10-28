'use client';

import { ProviderConfig } from '@/shared/types/checkot.types';
import CustomCard from '@/shared/ui/CustomCard';
import UniversalField from '@/features/checkout-form/ui/UniversalField';
import { IBaggagePrice } from '@/shared/types/route.types';

type Props = {
  providerConfig: ProviderConfig;
  index: number;
  paidBaggage?: IBaggagePrice[] | null;
};

function PassengerCard({ index, providerConfig }: Props) {
  return (
    <li>
      <CustomCard className="dark:bg-slate-800 space-y-4 shadow-sm">
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
          {providerConfig.required.map((fieldName) => {
            return (
              <UniversalField
                i={index}
                key={`${fieldName}-${index + 1}`}
                name={`passengers.${index}.${fieldName}`}
                config={providerConfig.fields[fieldName]}
              />
            );
          })}
        </div>

        {/* {paidBaggage && paidBaggage.length > 1 && (
          <>
            <h4 className="text-base tablet:text-lg text-green-300 font-medium mb-2">Багаж</h4>
            <Baggage index={index} baggage={paidBaggage} />
          </>
        )} */}
      </CustomCard>
    </li>
  );
}

export default PassengerCard;
