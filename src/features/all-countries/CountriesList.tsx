'use client';

import { ICountryListItem } from '@/app/[lng]/(root)/all-countries/page';
import { Button } from '@/shared/ui/button';
import CustomCard from '@/shared/ui/CustomCard';
import Link from 'next/link';

function CountriesList({ countries, locale }: { countries: ICountryListItem[]; locale: string }) {
  return (
    <CustomCard className="shadow-sm">
      <ul className="flex flex-row flex-wrap gap-2 items-center">
        {countries.map((c) => (
          <li key={c.slug}>
            <Button variant={'link'} asChild className="dark:text-green-200">
              <Link
                prefetch={false}
                rel="nofollow noopener noreferrer"
                href={`/${locale}/all-countries/${c.slug}?cid=${c.countryId}`}
              >
                {c.name}
              </Link>
            </Button>
          </li>
        ))}
      </ul>
    </CustomCard>
  );
}

export default CountriesList;
