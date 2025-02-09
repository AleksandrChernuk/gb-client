import LocationDisplay from '@/components/pages/SearchPage/components/LocationDisplay';
import IconArrowRoteMobile from '@/components/pages/SearchPage/images/IconArrowRoteMobile';
import { IconRouteLeft } from '@/components/pages/SearchPage/images/IconRouteLeft';
import { IconRouteRigth } from '@/components/pages/SearchPage/images/IconRouteRigth';
import { extractLocationDetails } from '@/lib/extractLocationDetails';
import { IRouteResponse } from '@/types/route.types';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';

type Props = {
  route: IRouteResponse;
};
export const Route = ({ route }: Props) => {
  const { t, i18n } = useTranslation();

  const durationArr = route?.duration ? route?.duration.split(':') : '';
  return (
    <>
      <div className='flex flex-row items-center gap-2 tablet:hidden'>
        <div className='flex flex-col items-center gap-4'>
          <div className='button_mobile text-text_prymery_color'>
            {format(route.departure.date_time || new Date(), 'HH:mm')}
          </div>

          <div className='small_text text-black.2.for.text  dark:text-gray_1'>{`${durationArr[0]}${t('shortHours')},${durationArr[1]}${t('shortMinutes')}`}</div>
          <div className='button_mobile text-text_prymery_color'>
            {format(route.arrival.date_time || new Date(), 'HH:mm')}
          </div>
        </div>

        <div className='w-3 h-full'>
          <IconArrowRoteMobile />
        </div>

        <div className='space-y-2'>
          <LocationDisplay
            location={
              extractLocationDetails(route.departure.fromLocation, i18n.language).locationName
            }
            address={route.departure.station_address || ''}
            variant='mobile'
          />

          <LocationDisplay
            location={extractLocationDetails(route.arrival.toLocation, i18n.language).locationName}
            address={route.arrival.station_address || ''}
            variant='mobile'
          />
        </div>
      </div>

      <div className='justify-between hidden w-full grid-cols-3 gap-2 tablet:grid'>
        <LocationDisplay
          location={
            extractLocationDetails(route.departure.fromLocation, i18n.language).locationName
          }
          address={route.departure.station_address || ''}
          time={format(route.departure.date_time || new Date(), 'HH:mm')}
          variant='desctop'
        />

        <div className='flex items-center justify-center w-full gap-2'>
          <div className='w-[49px] h-[17px]'>
            <IconRouteLeft />
          </div>
          <div className='small_text text-black.2.for.text  dark:text-gray_1'>{`${durationArr[0]}${t('shortHours')},${durationArr[1]}${t('shortMinutes')}`}</div>
          <div className='w-[49px] h-[17px]'>
            <IconRouteRigth />
          </div>
        </div>

        <LocationDisplay
          location={extractLocationDetails(route.arrival.toLocation, i18n.language).locationName}
          address={route.arrival.station_address || ''}
          variant='desctop'
          time={format(route.arrival.date_time || new Date(), 'HH:mm')}
        />
      </div>
    </>
  );
};
