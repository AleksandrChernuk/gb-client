import { useQueryStates, parseAsInteger } from 'nuqs';
import { format } from 'date-fns';
import { useMemo } from 'react';

import { createParser } from 'nuqs';
import { isValid, parseISO, isBefore, startOfDay } from 'date-fns';

export const parseAsSearchDate = createParser({
  parse(value: string) {
    if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return null;
    }

    const date = parseISO(value);
    if (!isValid(date)) {
      return null;
    }

    const today = startOfDay(new Date());
    if (isBefore(date, today)) {
      return null;
    }

    return value;
  },
  serialize(value: string) {
    return value;
  },
});

export const parseAsNullableString = createParser({
  parse(value: string) {
    return value || null;
  },
  serialize(value: string | null) {
    return value || '';
  },
});

export type CityKey = 'from' | 'to';

export type SearchParams = {
  from: string | null;
  to: string | null;
  date: string;
  voyagers: number;
};

export type SearchParamsActions = {
  setDate: (date: string) => void;
  setCityId: (cityKey: CityKey, cityId: string | null) => void;
  setPassenger: (value: number) => void;
  swap: () => void;
  reset: () => void;
};

export type UseRouterSearchReturn = [SearchParams, SearchParamsActions];

export function useRouterSearch(): UseRouterSearchReturn {
  const [rawParams, setRawParams] = useQueryStates(
    {
      from: parseAsNullableString,
      to: parseAsNullableString,
      date: parseAsSearchDate,
      voyagers: parseAsInteger.withDefault(1),
    },
    {
      history: 'push',
      shallow: true,
      scroll: false,
    },
  );

  const params: SearchParams = useMemo(
    () => ({
      from: rawParams.from,
      to: rawParams.to,
      date: rawParams.date || format(new Date(), 'yyyy-MM-dd'),
      voyagers: rawParams.voyagers,
    }),
    [rawParams],
  );

  const actions: SearchParamsActions = useMemo(
    () => ({
      setDate: (date: string) => {
        setRawParams({ date });
      },

      setCityId: (cityKey: CityKey, cityId: string | null) => {
        setRawParams({ [cityKey]: cityId });
      },

      setPassenger: (value: number) => {
        const clampedValue = Math.max(0, Math.min(value, 20));
        setRawParams({ voyagers: clampedValue });
      },

      swap: () => {
        setRawParams({
          from: params.to,
          to: params.from,
        });
      },

      reset: () => {
        setRawParams({
          from: null,
          to: null,
          date: format(new Date(), 'yyyy-MM-dd'),
          voyagers: 1,
        });
      },
    }),
    [setRawParams, params.from, params.to],
  );

  return [params, actions];
}
