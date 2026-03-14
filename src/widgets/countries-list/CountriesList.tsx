import { Button } from '@/shared/ui/button';
import CustomCard from '@/shared/ui/CustomCard';
import Link from 'next/link';
import { ICountry } from '@/shared/types/countries.types';

type Props = { countries: ICountry[]; locale: string };

export default function CountriesList({ countries, locale }: Props) {
  return (
    <CustomCard className="shadow-sm">
      <ul className="flex flex-row flex-wrap gap-2 items-center">
        {countries.map((c) => {
          const name = c.translations.find((e) => e.language === locale)?.countryName;
          if (!name) return null;
          return (
            <li key={c.id}>
              <Button variant="link" asChild className="dark:text-green-200">
                <Link prefetch={false} href={`/${locale}/all-countries/${c.id}/`}>
                  {name}
                </Link>
              </Button>
            </li>
          );
        })}
      </ul>
    </CustomCard>
  );
}
