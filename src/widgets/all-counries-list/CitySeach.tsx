'use client';

// import { useTranslations } from 'next-intl';
import { parseAsString, useQueryState } from 'nuqs';
import { Input } from '@/shared/ui/input';
// import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';

export default function CitySearch() {
  // const t = useTranslations(MESSAGE_FILES.QUESTIONS_PAGE);

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
        placeholder={'Шукайте свое місто'}
        className="p-4 rounded-2xl laptop:p-6"
      />
    </section>
  );
}
