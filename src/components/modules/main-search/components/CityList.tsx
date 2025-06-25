import { extractLocationDetails } from '@/lib/extractLocationDetails';
import { CityItem } from './CityItem';
import { ILocation } from '@/types/location.types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface CityListProps {
  cities: ILocation[] | undefined;
  city: ILocation | null;
  highlightedIndex: number | null;
  onSelectCity: (city: ILocation) => void;
  isFetchingLocations: boolean;
  NotFoundCity: React.ComponentType;
  LoaderCity: React.ComponentType;
  locale: string;
  className?: string;
  hasBorder?: boolean;
}
export default function CityList({
  cities,
  city,
  highlightedIndex,
  onSelectCity,
  isFetchingLocations,
  NotFoundCity,
  LoaderCity,
  locale,
  className,
}: CityListProps) {
  if (isFetchingLocations) return <LoaderCity />;
  if (!cities) return <NotFoundCity />;
  if (cities.length === 0) return <NotFoundCity />;
  return (
    <ScrollArea>
      <div className={cn('max-h-[334px]', className)}>
        {cities.map((el, index) => {
          const element = extractLocationDetails(el, locale);
          return (
            <CityItem
              key={el.id}
              el={element}
              isSelected={city?.id === el.id}
              isHighlighted={highlightedIndex === index}
              handleSelectCity={() => onSelectCity(el)}
            />
          );
        })}
      </div>
    </ScrollArea>
  );
}
