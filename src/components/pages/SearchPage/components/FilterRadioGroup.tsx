'use client';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { sortBuyItems } from '@/constans/sortbuylist.constans';
import { useRoutesStore } from '@/store/useRouter';
import { TsortBy } from '@/types/sortfilter.types';
import { useTranslations } from "next-intl";

export default function FilterSortByList() {
  const setSortBy = useRoutesStore((state) => state.setSortBy);
  const sortBy = useRoutesStore((state) => state.sortBy);

  const t = useTranslations("search");

  return (
    <RadioGroup
      className="space-y-4"
      value={sortBy}
      onValueChange={(value) => {
        setSortBy(value as TsortBy);
      }}
    >
      {sortBuyItems.map((el) => (
        <div className="flex items-center space-x-2" key={el.value}>
          <RadioGroupItem value={el.type} id={el.type} />
          <Label htmlFor={el.type} className="w-full main_text_body text-text_secondary_color">
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
