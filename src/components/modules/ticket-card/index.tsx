'use client';

import { useState, useTransition } from 'react';
import { IRouteResponse } from '@/types/route.types';
import { useTranslations } from 'next-intl';
import useTicketCard from './hooks/useTicketCard';
import MobileDetails from './modules/MobileDetails';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import Details from './modules/Details';
import { useShallow } from 'zustand/react/shallow';
import { useSearchStore } from '@/store/useSearch';
import SelectButton from './components/SelectButton';
import TicketRoute from './components/TicketRoute';
import { IconCarriersBus } from '@/assets/icons/IconCarriersBus';
import { MESSAGE_FILES } from '@/constans/message.file.constans';
import TickedCard from './components/TickedCard';
import { useTicketsDetails } from '@/store/useTicketsDetails';
import { useSelectedTickets } from '@/store/useSelectedTickets';

type Props = {
  element: IRouteResponse;
  disabled?: boolean;
};

export const TicketCard = ({ element }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const t = useTranslations(MESSAGE_FILES.BUSES_PAGE);
  const { handleGetDetails, handleSetTicket } = useTicketCard();
  const [tickets] = useTicketsDetails(useShallow((state) => [state.ticketDetailsMap]));
  const loadingSelectTicket = useSelectedTickets(useShallow((state) => state.loadingSelectTicket));

  const [adult, children] = useSearchStore(useShallow((state) => [state.adult, state.children]));

  const hasDetails = tickets[element.ticketId]?.details != null;

  const [isPending, startTransition] = useTransition();
  const handleSelect = () => {
    if (loadingSelectTicket) return;
    if (!element.ticketPricing.basePrice) return;
    startTransition(async () => {
      try {
        await handleSetTicket(element.ticketId, element);
      } catch (error) {
        console.log(error);
      }
    });
  };

  return (
    <TickedCard
      selectButton={
        <SelectButton
          price={Math.floor(element.ticketPricing.basePrice || 0)}
          variant="mobile"
          loading={isPending}
          buttonText={t('selectButton')}
          disabled={isPending}
          onClick={handleSelect}
        />
      }
    >
      <div>
        <div>
          <div className="flex flex-row items-center justify-between gap-1 tablet:gap-2">
            <TicketRoute route={element} />

            <div className="flex-col items-center hidden gap-2 tablet:flex tablet:gap-4">
              <div className="text-2xl font-medium tracking-normal leading-[28.8px] laptop:text-[32px] laptop:leading-[38.4px] text-slate-700 dark:text-slate-50">
                {`${Math.floor(element.ticketPricing.basePrice || 0)}`}
                <span className="text-xs ml-[2px]">UAH</span>
              </div>

              <SelectButton
                variant="desktop"
                loading={isPending}
                buttonText={t('selectButton')}
                disabled={isPending}
                onClick={handleSelect}
              />
            </div>
          </div>
          <div className="w-full h-[1px] bg-[#e6e6e6] dark:bg-slate-700 rounded-2xl relative my-4" />
          <div className="relative grid grid-cols-2 tablet:grid-cols-[1fr_1fr_1fr] items-center gap-2">
            <div className="flex items-center gap-2 text-xs font-normal tracking-normal leading-[18px] text-slate-700 dark:text-slate-50 shrink grow-0 text-nowrap truncate ...">
              <div className="w-[45px] h-[16px] tablet:w-[70px] tablet:h-[24px] grow-0">
                <IconCarriersBus />
              </div>

              <span className="block text-[10px] tablet:text-xs font-normal tracking-normal leading-[18px] break-all text-slate-700 dark:text-slate-50">
                {element.carrier.name || ''}
              </span>
            </div>

            <div className="hidden justify-self-center tablet:flex items-center gap-0.5 tablet:order-3 tablet:justify-self-end">
              <span className="text-slate-400 dark:text-slate-200 text-xs font-normal tracking-normal leading-[18px]">
                {t('places')}:
              </span>
              <p className="break-all text-xs font-normal tracking-normal leading-[18px] text-slate-700 dark:text-slate-50">
                {element.seats.freeSeats || 0}
              </p>
            </div>

            <div className="items-center justify-center hidden tablet:flex tablet:order-2 tablet:justify-self-center">
              <Button
                variant={'link'}
                onClick={() => {
                  setIsOpen((p) => !p);
                  if (!hasDetails) {
                    handleGetDetails(element);
                  }
                }}
                className="flex items-center self-end gap-px p-2 text-green-300 underline cursor-pointer text-[12px] font-bold tracking-normal leading-[18px] text-nowrap"
              >
                <span>{!isOpen ? t('details') : t('collapse_details')}</span>
                <ChevronDown
                  size={16}
                  className={`rotate-0 stroke-primary ${isOpen && 'rotate-180'} transition-all data-state:[:open]`}
                />
              </Button>
            </div>

            <div className="flex items-center justify-center ml-auto tablet:hidden">
              <MobileDetails
                price={
                  (element.ticketPricing.basePrice &&
                    Math.floor(element.ticketPricing.basePrice || 0) * (adult + children)) ||
                  0
                }
                passengerCount={adult + children}
                onClickTrigger={() => {
                  if (!hasDetails) {
                    handleGetDetails(element);
                  }
                }}
                selectButton={
                  <SelectButton
                    variant="desktop"
                    loading={isPending}
                    buttonText={t('selectButton')}
                    disabled={isPending}
                    onClick={handleSelect}
                  />
                }
              >
                <div className="my-6">
                  <Details id={element.ticketId} />
                </div>
              </MobileDetails>
            </div>
          </div>
          <div
            className={`hidden tablet:block overflow-hidden transition-all duration-100 ${
              isOpen ? 'max-h-[4000px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            {isOpen && <Details id={element.ticketId} />}
          </div>
        </div>
      </div>
    </TickedCard>
  );
};
