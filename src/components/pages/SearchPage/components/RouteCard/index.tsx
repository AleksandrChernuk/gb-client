'use client';

import { memo, useState } from 'react';
import { IRouteResponse } from '@/types/route.types';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { CustomCard } from '@/components/shared/CustomCard';
import { useCurrentRouteStore } from '@/store/useCurrentRoute';
import { LoaderCircle } from 'lucide-react';
import { useSearchStore } from '@/store/useSearch';
import { IconLoader } from '@/components/icons/IconLoader';
import { useRouter } from 'next/navigation';
import MobileDetails from '../../modules/MobileDetails';
import DetailsOpenButton from '../DetailsOpenButton';
import { Carriers } from './Carriers';
import CardDetails from './CardDetails';
import { Route } from './Route';

type Props = {
  element: IRouteResponse;
};

export const RouteCard = memo(({ element }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const adult = useSearchStore((state) => state.adult);
  const children = useSearchStore((state) => state.children);
  const from = useSearchStore((state) => state.from);
  const to = useSearchStore((state) => state.to);
  const date = useSearchStore((state) => state.date);

  const setCurrentRoute = useCurrentRouteStore((state) => state.setCurrentRoute);
  const loadingDetails = useCurrentRouteStore((state) => state.loadingDetails);

  const handleSelect = () => {
    setLoading(true);
    setCurrentRoute({
      route: element,
      toCityId: to?.id,
      fromCityId: from?.id,
      locale: i18n.language,
      passCount: adult + children,
      travelDate: date,
    });
    router.push(`/${i18n.language}/new-order`);
  };

  const { t, i18n } = useTranslation(['common', 'search']);

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsOpen(false);
    }
  };

  return (
    <div tabIndex={0} onBlur={handleBlur} className='relative'>
      <CustomCard className='shadow-[0_4px_10px_0_rgba(0,0,0,0.2)]'>
        <div className='flex flex-row items-center justify-between gap-1 tablet:gap-2'>
          <Route route={element} />

          <div className='flex flex-col items-center gap-4'>
            <p className='h4 laptop:h2 text-text_prymery_color'>
              {`${Math.floor(element.ticket_pricing.base_price || 0)}`}
              <span className='text-xs ml-[2px]'>UAH</span>
            </p>

            <Button
              variant={'default'}
              onClick={() => {
                handleSelect();
              }}
              className='px-3 py-2 tablet:py-3 tablet:px-4 laptop:py-[14px] laptop:px-[24px]  min-w-[108px] tablet:min-w-[205px] samll_button tablet:h5 max-h-[26.41px]  tablet:max-h-[44px]  laptop:max-h-[48px] rounded-full'
            >
              {loading ? <LoaderCircle className='animate-spin' /> : t('selectButton')}
            </Button>
          </div>
        </div>

        <div className='w-full h-[1px] bg-gray_0 dark:bg-black_2_for_text rounded-2xl relative my-4'></div>

        <div className='relative grid grid-cols-[1fr_auto_1fr] tablet:grid-cols-[1fr_1fr_1fr]  items-center gap-2'>
          <div className='flex items-center gap-2 truncate ...'>
            <Carriers>{element.carrier.name}</Carriers>
            <div>{element.provider_name}</div>
          </div>

          <div className='justify-self-center flex items-start gap-0.5 tablet:order-3 tablet:justify-self-end'>
            <span className='break-all small_text text-text_prymery_color'>
              <span className='text-text_secondary_color'>{t('places')}:</span>{' '}
              {element.seats.free_seats}
            </span>
          </div>

          <div className='items-center justify-center hidden tablet:flex tablet:order-2 tablet:justify-self-center'>
            <div>
              <DetailsOpenButton
                isOpen={isOpen}
                onClick={() => {
                  if (!isOpen) {
                    setCurrentRoute({
                      route: element,
                      toCityId: to?.id,
                      fromCityId: from?.id,
                      locale: i18n.language,
                      passCount: adult + children,
                      travelDate: date,
                    });
                  }

                  setIsOpen(!isOpen);
                }}
              >
                {!isOpen ? t('details') : t('collapse_details')}
              </DetailsOpenButton>
            </div>
          </div>

          <div className='flex items-center justify-center ml-auto tablet:hidden'>
            <MobileDetails
              handleSetCurretRoute={() => {
                setCurrentRoute({
                  route: element,
                  toCityId: to?.id,
                  fromCityId: from?.id,
                  locale: i18n.language,
                  passCount: adult + children,
                  travelDate: date,
                });
              }}
            />
          </div>
        </div>

        {isOpen && (
          <div>
            {loadingDetails ? (
              <div className='flex items-center justify-center gap-1 body_medium text-text_prymery_color tablet:min-w-[397px] mt-8'>
                <IconLoader />
              </div>
            ) : (
              <CardDetails />
            )}
          </div>
        )}
      </CustomCard>
    </div>
  );
});

RouteCard.displayName = 'RouteCard';
