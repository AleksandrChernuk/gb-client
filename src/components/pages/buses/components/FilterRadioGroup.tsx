'use client';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { MESSAGE_FILES } from '@/constans/message.file.constans';
import { sortBuyItems } from '@/constans/sortbuylist.constans';
import { useFilterTickets } from '@/store/useFilterTickets';
import { TsortBy } from '@/types/sortfilter.types';
import { useTranslations } from 'next-intl';

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
            className="w-full font-normal leading-6 main_tetext-base tracking-normalxt_body text-slate-400 dark:text-slate-200"
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
