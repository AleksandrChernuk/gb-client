import { z } from 'zod';
import { ProviderConfig } from '../types';
import { IRouteResponse } from '@/types/route.types';
import { bdaySchema } from '../schemas';

const octobusConfig = (currentTicket: IRouteResponse | null): ProviderConfig => {
  const hasDiscounts = !!currentTicket?.details?.discounts?.length;

  return {
    required: ['first_name', 'last_name', ...(hasDiscounts ? ['discount', 'bday'] : [])],
    fields: {
      first_name: {
        label: 'first_name',
        type: 'text',
        placeholder: 'first_name_placeholder',
        schema: z.string().min(1, { message: 'required' }),
      },
      last_name: {
        label: 'last_name',
        type: 'text',
        placeholder: 'last_name_placeholder',
        schema: z.string().min(1, { message: 'required' }),
      },
      ...(hasDiscounts
        ? {
            discount: {
              label: 'discounts',
              type: 'select',
              placeholder: 'discounts_placeholder',
              options: (currentTicket?.details?.discounts || []).map((d) => ({
                value: String(d.id ?? ''),
                label: `${d.percent} ${d.description || d.name}`,
              })),
              schema: z.string().optional(),
            },
            bday: {
              label: 'bday',
              type: 'bday',
              placeholder: 'bday_placeholder',
              schema: bdaySchema.optional(),
            },
          }
        : {}),
    },
  };
};

export default octobusConfig;
