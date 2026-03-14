'use client';

import { parseAsString, useQueryState } from 'nuqs';
import { Input } from '@/shared/ui/input';
import { useTranslations } from 'next-intl';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';

function CitySearch() {
  const t = useTranslations(MESSAGE_FILES.ALL_COUNTRIES);
  const [search, setSearch] = useQueryState('search', parseAsString.withDefault(''));

  return (
    <Input
      value={search}
      onChange={(e) => setSearch(e.target.value || null)}
      type="text"
      placeholder={t('find_your_city')}
      className="p-4 rounded-2xl laptop:p-6"
    />
  );
}

export default CitySearch;
