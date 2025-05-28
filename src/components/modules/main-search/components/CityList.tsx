import { extractLocationDetails } from '@/lib/extractLocationDetails';
import { CityItem } from './CityItem';
import { ILocation } from '@/types/location.types';

interface CityListProps {
  cities: ILocation[] | undefined;
  city: ILocation | null;
  highlightedIndex: number | null;
  onSelectCity: (city: ILocation) => void;
  isFetchingLocations: boolean;
  NotFoundCity: React.ComponentType;
  LoaderCity: React.ComponentType;
  locale: string;
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
}: CityListProps) {
  if (isFetchingLocations) return <LoaderCity />;
  if (!cities) return <NotFoundCity />;
  if (cities.length === 0) return <NotFoundCity />;

  return cities.map((el, index) => {
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
  });
}
