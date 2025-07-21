import { ProviderConfig } from '../types';
import { IRouteResponse } from '@/types/route.types';
import { FIELDS } from '../constans';
import { bday, discount, first_name, last_name } from './config.list';

const defaultConfig = (currentTicket: IRouteResponse | null): ProviderConfig => {
  const discounts = currentTicket?.details?.discounts ?? [];
  const isTranstempoWithSingleDiscount = currentTicket?.providerName === 'TRANSTEMPO' && discounts.length === 1;

  const showBlock = !isTranstempoWithSingleDiscount;

  return {
    required: [FIELDS.first_name, FIELDS.last_name, ...(showBlock ? ['discount', 'bday'] : [])],
    fields: {
      first_name,
      last_name,
      ...(showBlock
        ? {
            discount: discount(currentTicket),
            bday,
          }
        : {}),
    },
  };
};

export default defaultConfig;
