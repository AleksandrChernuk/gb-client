/* eslint-disable prefer-const */
'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from '@/i18n/routing';
import CustomDialog from '@/components/shared/CustomDialog';
import { useTranslations } from 'next-intl';
import { MESSAGE_FILES } from '@/constans/message.file.constans';
import { useTimerStore } from '@/store/useTimer';
import { useNewOrderResult } from '@/store/useOrderResult';

const WARNING_DELAY_MS = 10000;
const TIMEOUT_DIALOG_DELAY_MS = 15 * 60 * 1000;

function formatTime(ms: number) {
  const totalSeconds = Math.max(Math.floor(ms / 1000), 0);
  const min = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const sec = String(totalSeconds % 60).padStart(2, '0');
  return `${min}:${sec}`;
}

export default function Timer() {
  const [open, setOpen] = useState(false);
  const [openPriceChange, setOpenPriceChange] = useState(false);
  const { startedAt, priceDialogShown, setStartedAt, setPriceDialogShown, reset, hasHydrated } = useTimerStore();

  const [timeLeft, setTimeLeft] = useState(() => {
    if (startedAt) {
      return Math.max(TIMEOUT_DIALOG_DELAY_MS - (Date.now() - startedAt), 0);
    }
    return TIMEOUT_DIALOG_DELAY_MS;
  });
  const t = useTranslations(MESSAGE_FILES.CHECKOUT_PAGE);
  const router = useRouter();
  const initiateNewOrder = useNewOrderResult((state) => state.initiateNewOrder);
  const loadingResult = useNewOrderResult((state) => state.loadingResult);

  useEffect(() => {
    if (!hasHydrated) return;
    const start = startedAt || Date.now();
    if (!startedAt) {
      setStartedAt(start);
    }

    const updateTimer = () => {
      const now = Date.now();
      const elapsed = now - (start as number);
      setTimeLeft(Math.max(TIMEOUT_DIALOG_DELAY_MS - elapsed, 0));
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    let warningTimeout: ReturnType<typeof setTimeout>;
    let mainTimeout: ReturnType<typeof setTimeout>;

    if (!priceDialogShown) {
      const now = Date.now();
      const elapsed = now - (start as number);
      const leftForWarning = Math.max(WARNING_DELAY_MS - elapsed, 0);

      warningTimeout = setTimeout(() => {
        setOpenPriceChange(true);
      }, leftForWarning);
    }

    const now = Date.now();
    const elapsed = now - (start as number);
    const leftForDialog = Math.max(TIMEOUT_DIALOG_DELAY_MS - elapsed, 0);

    mainTimeout = setTimeout(() => {
      setOpen(true);
      setOpenPriceChange(false);
    }, leftForDialog);

    return () => {
      clearInterval(interval);
      clearTimeout(warningTimeout);
      clearTimeout(mainTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasHydrated]);

  const handleClosePriceChange = () => {
    setOpenPriceChange(false);
    setPriceDialogShown(true);
  };

  return (
    <>
      <CustomDialog
        isOpen={openPriceChange && !!initiateNewOrder && !!loadingResult}
        title={t('price_may_increase')}
        description={
          <p>
            {t('book_within_1')}

            <span className="text-green-300">
              {formatTime(timeLeft)} {t('book__min')}
            </span>
            {t('book_within_2')}
          </p>
        }
        footer={
          <Button size="secondary" variant="default" onClick={handleClosePriceChange}>
            OK
          </Button>
        }
      />

      <CustomDialog
        isOpen={open && !!initiateNewOrder && !!loadingResult}
        title={t('still_online_title')}
        description={<p>{t('still_online_description')}</p>}
        footer={
          <Button
            size={'secondary'}
            variant="default"
            onClick={() => {
              reset();
              router.back();
            }}
          >
            OK
          </Button>
        }
      />
    </>
  );
}
