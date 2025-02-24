'use client'

import { IRouteResponse } from '@/types/route.types'
import { IconLoader } from '@/components/icons/IconLoader'
import MobileDetails from '../MobileDetails'
import TicketDetails from './TicketDetails'
import { useLocale, useTranslations } from 'next-intl'
import TicketRouteMobile from '@/components/shared/TicketRouteMobile'
import TicketRouteDesctop from './TicketRouteDesctop'
import TicketPricingDesctop from './TicketPricingDesctop'
import TicketDivider from './TicketDivider'
import TicketPricingMobile from './TicketPricingMobile'
import useTicketCard from '../../hooks/useTicketCard'
import { TicketCarriers } from './TicketCarriers'
import TicketDetailsButton from '../TicketDetailsButton'
import { useCurrentTicketStore } from '@/store/useCurrentTicket'
import TicketPlaces from './TicketPlaces'

type Props = {
  element: IRouteResponse
}

export const TicketCard = ({ element }: Props) => {
  const { loading, handleSelect, handleBlur, handleOpenDetails, isOpen } = useTicketCard({
    element,
  })

  const loadingDetails = useCurrentTicketStore((state) => state.loadingDetails)

  const currentLocale = useLocale()
  const t = useTranslations('search')

  return (
    <div
      tabIndex={0}
      onBlur={handleBlur}
      className='relative shadow tablet:shadow-none rounded-t-2xl tablet:rounded-none'
    >
      <div className='p-4 tablet:p-6 bg-card_bg_primery rounded-t-2xl tablet:rounded-2xl shadow-none tablet:shadow'>
        <div className='flex flex-row items-center justify-between gap-1 tablet:gap-2'>
          <TicketRouteMobile locale={currentLocale} route={element} />
          <TicketRouteDesctop locale={currentLocale} route={element} />

          <TicketPricingDesctop
            loading={loading}
            handleSelect={handleSelect}
            price={`${Math.floor(element.ticket_pricing.base_price || 0)}`}
          />
        </div>

        <TicketDivider />

        <div className='relative grid grid-cols-2 tablet:grid-cols-[1fr_1fr_1fr] items-center gap-2'>
          <TicketCarriers name={element.carrier.name || ''} />

          <TicketPlaces count={element.seats.free_seats || 0} />

          <TicketDetailsButton
            isOpen={isOpen}
            onClick={handleOpenDetails}
            text={!isOpen ? t('details') : t('collapse_details')}
          />

          <div className='flex items-center justify-center ml-auto tablet:hidden'>
            <MobileDetails handleSetCurretRoute={handleOpenDetails} />
          </div>
        </div>

        {isOpen && (
          <div>
            {loadingDetails ? (
              <div className='flex items-center justify-center gap-1 body_medium text-text_prymery tablet:min-w-[397px] mt-8'>
                <IconLoader />
              </div>
            ) : (
              <TicketDetails />
            )}
          </div>
        )}
      </div>

      <TicketPricingMobile
        loading={loading}
        handleSelect={handleSelect}
        price={`${Math.floor(element.ticket_pricing.base_price || 0)}`}
      />
    </div>
  )
}
