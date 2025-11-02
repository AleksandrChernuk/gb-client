'use client';

import { ICountryListItem } from '@/app/[lng]/(root)/all-countries/page';
import { Button } from '@/shared/ui/button';
import CustomCard from '@/shared/ui/CustomCard';
import Link from 'next/link';

export function CountriesList({ countries, locale }: { countries: ICountryListItem[]; locale: string }) {
  return (
    <CustomCard>
      <ul className="grid gap-1 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {countries.map((c) => (
          <li key={c.slug}>
            <Button variant={'link'} asChild>
              <Link href={`/${locale}/all-countries/${c.slug}?cid=${c.countryId}`}>{c.name}</Link>
            </Button>
          </li>
        ))}
      </ul>
    </CustomCard>
  );
}
