'use client';

import { parseAsString, useQueryState } from 'nuqs';
import { Input } from '@/shared/ui/input';
import { useTranslations } from 'next-intl';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';

function CitySearch() {
  const t = useTranslations(MESSAGE_FILES.ALL_COUNTRIES);

  const [search, setSearch] = useQueryState('search', parseAsString.withDefault(''));

  const handleChange = (value: string) => {
    setSearch(value || null);
  };

  return (
    <section role="search">
      <Input
        value={search}
        onChange={(e) => handleChange(e.target.value)}
        type="text"
        placeholder={t('find_your_city')}
        className="p-4 rounded-2xl laptop:p-6"
      />
    </section>
  );
}

export default CitySearch;
