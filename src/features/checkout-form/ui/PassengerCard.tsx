'use client';

import { ProviderConfig } from '@/shared/types/checkot.types';
import CustomCard from '@/shared/ui/CustomCard';
import UniversalField from '@/features/checkout-form/ui/UniversalField';
import Baggage from '@/features/checkout-form/ui/Baggage';
import { IBaggagePrice } from '@/shared/types/route.types';

import { BaggageItem } from '@/features/checkout-form/ui/BaggageItem';
import { BaggageFree } from '@/assets/icons/baggageFree';

type Props = {
  providerConfig: ProviderConfig;
  index: number;
  paidBaggage?: IBaggagePrice[] | null;
  luggageRules?: string[] | null;
};

function PassengerCard({ index, providerConfig, paidBaggage, luggageRules }: Props) {
  console.log(luggageRules);
  return (
    <li>
      <CustomCard className="dark:bg-slate-800 space-y-4 shadow-sm">
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
          {providerConfig.required.map((fieldName) => {
            return (
              <UniversalField
                i={index}
                key={`${fieldName}-${index + 1}`}
                name={`c${index}.${fieldName}`}
                config={providerConfig.fields[fieldName]}
              />
            );
          })}
        </div>

        {luggageRules && (
          <>
            <h4 className="text-base tablet:text-lg text-green-300 font-medium mb-2">Багаж</h4>
            {luggageRules && (
              <BaggageItem
                icon={<BaggageFree />}
                title="В вартість входить"
                description={luggageRules?.join('. ') ?? ''}
              />
            )}
            {paidBaggage && paidBaggage.length > 1 && <Baggage index={index} baggage={paidBaggage} />}
          </>
        )}
      </CustomCard>
    </li>
  );
}

export default PassengerCard;
