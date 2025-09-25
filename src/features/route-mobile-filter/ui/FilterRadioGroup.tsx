'use client';

import { Label } from '@/shared/ui/label';
import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group';

import { useFilterTickets } from '@/shared/store/useFilterTickets';
import { TsortBy } from '@/shared/types/sortfilter.types';
import { useTranslations } from 'next-intl';
import { sortBuyItems } from '@/shared/constans/sortbuylist.constans';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';

export default function FilterSortByList() {
  const setSortByTickets = useFilterTickets((state) => state.setSortByTickets);
  const sortBy = useFilterTickets((state) => state.sortBy);
  const t = useTranslations(MESSAGE_FILES.BUSES_PAGE);

  return (
    <RadioGroup
      className="space-y-4"
      value={sortBy}
      onValueChange={(value) => {
        setSortByTickets(value as TsortBy);
      }}
    >
      {sortBuyItems.map((el) => (
        <div className="flex items-center space-x-2" key={el.value}>
          <RadioGroupItem value={el.type} id={el.type} />
          <Label
            htmlFor={el.type}
            className="w-full font-normal leading-6 main_tetext-base tracking-normalxt_body text-slate-700 dark:text-slate-200"
          >
            <ul className="flex items-center justify-between">
              <li>{t(`${el.type}`)}</li>
              <li className="w-6 h-6">{el.icon}</li>
            </ul>
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}
