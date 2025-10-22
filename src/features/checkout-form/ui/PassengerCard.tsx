import { ProviderConfig } from '@/shared/types/checkot.types';
import CustomCard from '@/shared/ui/CustomCard';
import UniversalField from '@/features/checkout-form/ui/UniversalField';
import Baggage from '@/features/checkout-form/ui/Baggage';
import { IBaggagePrice } from '@/shared/types/route.types';

type Props = {
  providerConfig: ProviderConfig;
  i: number;
  paidBaggage?: IBaggagePrice[] | null;
};

function PassengerCard({ i, providerConfig, paidBaggage }: Props) {
  return (
    <li>
      <CustomCard className="dark:bg-slate-800 space-y-4 shadow-sm">
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
          {providerConfig.required.map((fieldName) => {
            return (
              <UniversalField
                i={i}
                key={`${fieldName}-${i + 1}`}
                name={`c${i}.${fieldName}`}
                config={providerConfig.fields[fieldName]}
              />
            );
          })}
        </div>

        {paidBaggage && paidBaggage.length > 1 && (
          <>
            <h4 className="text-base tablet:text-lg text-green-300 font-medium mb-2">Багаж</h4>
            <Baggage i={i} baggage={paidBaggage} />
          </>
        )}
      </CustomCard>
    </li>
  );
}

export default PassengerCard;
