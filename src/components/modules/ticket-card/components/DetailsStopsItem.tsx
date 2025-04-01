import { useTranslations } from 'next-intl';

type Props = {
  isFirst?: boolean;
  isLast?: boolean;
  bus_changes?: boolean;
  route: {
    departure_date_time: string | null | undefined;
    arrival_date_time: string | null | undefined;
    location_name: string | null | undefined;
    station_name: string | null | undefined;
    station_address: string | null | undefined;
  };
};

export default function DetailsStopsItem({ isFirst, isLast, bus_changes, route }: Props) {
  const t = useTranslations('search');
  const { departure_date_time, arrival_date_time, location_name, station_name, station_address } = route;

  return (
    <div
      className={`relative flex items-start justify-start ${isLast && 'overflow-hidden z-10 bg-grayy tablet:bg-white dark:bg-dark_bg'}`}
    >
      <div
        className={`${isFirst || isLast ? 'button_mobile' : 'small_2_bolt_text'} text-text_prymery mr-9 min-w-[40px] max-w-[40px]`}
      >
        {isFirst
          ? (departure_date_time && departure_date_time?.split(' ')[1].replace(':00', '')) ||
            (arrival_date_time && arrival_date_time?.split(' ')[1].replace(':00', ''))
          : (departure_date_time && departure_date_time?.split(' ')[1].replace(':00', '')) ||
            (arrival_date_time && arrival_date_time?.split(' ')[1].replace(':00', ''))}
      </div>

      <div
        className={`details_stops_item ${isLast ? 'before:border-primary_1' : 'before:border-blackmode before:bg-grayy dark:before:bg-dark_bg'} `}
      >
        {isLast && (
          <span className="absolute w-[8px] h-[8px] rounded-full bg-primary_1 top-[4px] -left-[19px] -translate-x-1/2" />
        )}
        <div className={`${isFirst || isLast ? 'button_mobile' : 'small_2_bolt_text'}  text-text_prymery`}>
          {location_name}
        </div>

        <div className="text-text_secondary  text-[10px] mobile:small_text">
          {station_name && `${station_name}, `}
          {station_address}
        </div>
        {!isLast && !isFirst && bus_changes && (
          <div className="p-1 my-0.5  text-white bg-red-500 text-xs  font-bold  rounded-lg text-center">
            {t('organized_transfer')}
          </div>
        )}
      </div>
    </div>
  );
}
