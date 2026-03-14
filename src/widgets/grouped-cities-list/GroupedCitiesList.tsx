import { ILocation } from '@/shared/types/location.types';
import { extractLocationDetails } from '@/shared/lib/extractLocationDetails';
import CustomCard from '@/shared/ui/CustomCard';
import { Button } from '@/shared/ui/button';
import Link from 'next/link';

type GroupedItem = { letter: string; items: ILocation[] };
type Props = { groups: GroupedItem[]; locale: string };

function GroupedCitiesList({ groups, locale }: Props) {
  return (
    <>
      {groups.map(({ letter, items }) => (
        <div key={letter} className="mb-8">
          <div className="text-lg font-bold text-slate-50 px-2 bg-green-300 rounded-sm w-fit mb-4">{letter}</div>
          <CustomCard className="shadow-sm">
            <ul className="flex flex-row flex-wrap gap-2 items-center">
              {items.map((city) => (
                <li key={city.id}>
                  <Button variant="link" asChild className="dark:text-green-200">
                    <Link
                      prefetch={false}
                      href={`/${locale}/all-countries/${city.countryId}/${city.id}/`}
                      rel="nofollow noopener noreferrer"
                    >
                      {extractLocationDetails(city, locale).locationName}
                    </Link>
                  </Button>
                </li>
              ))}
            </ul>
          </CustomCard>
        </div>
      ))}
    </>
  );
}

export default GroupedCitiesList;
