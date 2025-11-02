import { ILocation } from '@/shared/types/location.types';
import { extractLocationDetails } from '@/shared/lib/extractLocationDetails';
import CustomCard from '@/shared/ui/CustomCard';
import { Button } from '@/shared/ui/button';
import Link from 'next/link';

type GroupedItem = {
  letter: string;
  items: ILocation[];
};

type Props = {
  groups: GroupedItem[];
  locale: string;
};

export function GroupedCitiesList({ groups, locale }: Props) {
  return (
    <>
      {groups.map(({ letter, items }) => (
        <div key={letter} className="mb-8">
          <div className="text-lg font-bold text-slate-50 px-2 bg-green-300 rounded-sm w-fit mb-4">{letter}</div>
          <CustomCard>
            <ul className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {items.map((city) => {
                const county = extractLocationDetails(city, 'en').countryName.toLocaleLowerCase();

                const name = extractLocationDetails(city, 'en').locationName.toLocaleLowerCase();
                const dispalyName = extractLocationDetails(city, locale).locationName;

                const citySlug = `${name}?lid=${city.id}`;

                return (
                  <li key={city.id}>
                    <Button variant="link" asChild>
                      <Link href={`/${locale}/all-countries/${county}/${citySlug}`}>{dispalyName}</Link>
                    </Button>
                  </li>
                );
              })}
            </ul>
          </CustomCard>
        </div>
      ))}
    </>
  );
}
