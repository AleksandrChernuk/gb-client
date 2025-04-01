'use client';

import { useState } from 'react';
import { IRouteResponse } from '@/types/route.types';
import { useTranslations } from 'next-intl';
import { useCurrentTicketStore } from '@/store/useCurrentTicket';
import { motion } from 'motion/react';
import useTicketCard from './hooks/useTicketCard';
import MobileDetails from './modules/MobileDetails';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { IconCarriersBus } from '@/public/icons/IconCarriersBus';
import Details from './modules/Details';
import { useShallow } from 'zustand/react/shallow';
import { useSearchStore } from '@/store/useSearch';
import SelectButton from './components/SelectButton';
import TicketRoute from './components/TicketRoute';

type Props = {
  element: IRouteResponse;
  disabled?: boolean;
};

export const TicketCard = ({ element }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const t = useTranslations('search');
  const { handleGetDetails, handleSetTicket, loading } = useTicketCard();
  const [tickets, isButtonDisabled] = useCurrentTicketStore(
    useShallow((state) => [state.tickets, state.isButtonDisabled]),
  );

  const [adult, children] = useSearchStore(useShallow((state) => [state.adult, state.children]));

  const hasDetails = tickets[element.ticket_id]?.details != null;

  return (
    <div className="relative shadow tablet:shadow-none rounded-t-2xl tablet:rounded-none">
      <div className="p-4 shadow-none tablet:p-6 bg-card_bg_primery rounded-t-2xl tablet:rounded-2xl tablet:shadow">
        <div className="flex flex-row items-center justify-between gap-1 tablet:gap-2">
          <TicketRoute route={element} />

          <div className="flex-col items-center hidden gap-2 tablet:flex tablet:gap-4">
            <div className="h4 laptop:h2 text-text_prymery">
              {`${Math.floor(element.ticket_pricing.base_price || 0)}`}
              <span className="text-xs ml-[2px]">UAH</span>
            </div>

            <SelectButton
              variant="desctop"
              loading={loading}
              buttonText={t('selectButton')}
              disabled={isButtonDisabled}
              onClick={async () => {
                if (!element.ticket_pricing.base_price) {
                  return;
                }
                await handleSetTicket(element.ticket_id, element);
              }}
            />
          </div>
        </div>

        <div className="w-full h-[1px] bg-gray_0 dark:bg-black_2_for_text rounded-2xl relative my-4" />

        <div className="relative grid grid-cols-2 tablet:grid-cols-[1fr_1fr_1fr] items-center gap-2">
          <div className="flex items-center gap-2 small_text text-text_prymery shrink grow-0 text-nowrap truncate ...">
            <div className="w-[45px] h-[16px] tablet:w-[70px] tablet:h-[24px] grow-0">
              <IconCarriersBus />
            </div>

            <span className="block text-[10px] tablet:small_text break-all text-text_prymery">
              {element.carrier.name || ''}
            </span>
          </div>

          <div className="hidden justify-self-center tablet:flex items-start gap-0.5 tablet:order-3 tablet:justify-self-end">
            <span className="break-all small_text text-text_prymery">
              <span className="text-text_secondary">{t('places')}:</span>
              {element.seats.free_seats || 0}
            </span>
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
              className="flex items-center self-end gap-px p-2 underline cursor-pointer text-primary_1 samll_button text-nowrap"
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
                (element.ticket_pricing.base_price && Number(element.ticket_pricing.base_price) * (adult + children)) ||
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
                  variant="desctop"
                  loading={loading}
                  buttonText={t('selectButton')}
                  disabled={isButtonDisabled}
                  onClick={async () => {
                    await handleSetTicket(element.ticket_id, element);
                  }}
                />
              }
            >
              <div className="my-6">
                <Details id={element.ticket_id} />
              </div>
            </MobileDetails>
          </div>
        </div>
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: isOpen ? 'auto' : 0 }}
          transition={{ duration: 0.1 }}
          style={{ overflow: 'hidden' }}
          className={'hidden tablet:block'}
        >
          {isOpen && <Details id={element.ticket_id} />}
        </motion.div>
      </div>

      <div className="tablet:hidden">
        <SelectButton
          price={element.ticket_pricing.base_price || 0}
          variant="mobile"
          loading={loading}
          buttonText={t('selectButton')}
          disabled={isButtonDisabled}
          onClick={async () => {
            if (!element.ticket_pricing.base_price) {
              return;
            }
            await handleSetTicket(element.ticket_id, element);
          }}
        />
      </div>
    </div>
  );
};
