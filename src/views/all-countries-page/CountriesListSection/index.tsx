import { Container } from '@/shared/ui/Container';
import { H1 } from '@/shared/ui/H1';
import { getTranslations } from 'next-intl/server';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { ICountry } from '@/shared/types/countries.types';
import CountriesList from '@/widgets/countries-list/CountriesList';

type Props = { countries: ICountry[]; locale: string };

export async function CountriesListSection({ countries, locale }: Props) {
  const t = await getTranslations(MESSAGE_FILES.ALL_COUNTRIES);

  return (
    <section>
      <Container size="m">
        <H1>{t('meet_buses_in_your_city')}</H1>
        <CountriesList countries={countries} locale={locale} />
      </Container>
    </section>
  );
}
