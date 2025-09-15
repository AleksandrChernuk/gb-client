'use client';

import { useEffect, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import CustomDialog from '@/components/shared/CustomDialog';
import { useTranslations } from 'next-intl';
import { MESSAGE_FILES } from '@/config/message.file.constans';
import { useTimerStore } from '@/store/useTimer';
import { useNewOrderResult } from '@/store/useOrderResult';
import { useRouter } from 'next/navigation';

const WARNING_DELAY_MS = 10000; // 10 секунд
const TIMEOUT_DIALOG_DELAY_MS = 15 * 60 * 1000; // 15 минут

function formatTime(ms: number): string {
  const totalSeconds = Math.max(Math.floor(ms / 1000), 0);
  const min = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const sec = String(totalSeconds % 60).padStart(2, '0');
  return `${min}:${sec}`;
}

export default function Timer() {
  const [open, setOpen] = useState(false);
  const [openPriceChange, setOpenPriceChange] = useState(false);

  const { startedAt, priceDialogShown, setStartedAt, setPriceDialogShown, reset, hasHydrated } = useTimerStore();

  // Инициализация timeLeft с проверкой на клиентской стороне
  const [timeLeft, setTimeLeft] = useState(TIMEOUT_DIALOG_DELAY_MS);

  const t = useTranslations(MESSAGE_FILES.CHECKOUT_PAGE);
  const router = useRouter();
  const initiateNewOrder = useNewOrderResult((state) => state.initiateNewOrder);
  const loadingResult = useNewOrderResult((state) => state.loadingResult);

  // Вынесем логику обновления времени в отдельный callback
  const updateTimer = useCallback((startTime: number) => {
    const now = Date.now();
    const elapsed = now - startTime;
    const remaining = Math.max(TIMEOUT_DIALOG_DELAY_MS - elapsed, 0);
    setTimeLeft(remaining);
    return { elapsed, remaining };
  }, []);

  const handleClosePriceChange = useCallback(() => {
    setOpenPriceChange(false);
    setPriceDialogShown(true);
  }, [setPriceDialogShown]);

  const handleTimeout = useCallback(() => {
    reset();
    router.back();
  }, [reset, router]);

  useEffect(() => {
    if (!hasHydrated) return;

    const start = startedAt || Date.now();

    // Устанавливаем startedAt только если его еще нет
    if (!startedAt) {
      setStartedAt(start);
    }

    // Инициализируем timeLeft правильно после гидратации
    const { elapsed, remaining } = updateTimer(start);

    // Если время уже истекло, сразу показываем диалог
    if (remaining <= 0) {
      setOpen(true);
      setOpenPriceChange(false);
      return;
    }

    // Устанавливаем интервал для обновления таймера
    const interval = setInterval(() => {
      const { remaining: newRemaining } = updateTimer(start);

      // Если время истекло, показываем основной диалог
      if (newRemaining <= 0) {
        setOpen(true);
        setOpenPriceChange(false);
        clearInterval(interval);
      }
    }, 1000);

    // Показываем предупреждение о возможном изменении цены
    let warningTimeout: NodeJS.Timeout | null = null;

    if (!priceDialogShown && elapsed < WARNING_DELAY_MS) {
      const leftForWarning = WARNING_DELAY_MS - elapsed;

      warningTimeout = setTimeout(() => {
        // Проверяем, что диалог еще не был показан и время не истекло
        const currentRemaining = TIMEOUT_DIALOG_DELAY_MS - (Date.now() - start);
        if (currentRemaining > 0) {
          setOpenPriceChange(true);
        }
      }, leftForWarning);
    }

    return () => {
      clearInterval(interval);
      if (warningTimeout) {
        clearTimeout(warningTimeout);
      }
    };
  }, [hasHydrated, startedAt, setStartedAt, priceDialogShown, updateTimer]);

  // Условие для показа диалогов
  const shouldShowDialogs = initiateNewOrder && loadingResult;

  return (
    <>
      <CustomDialog
        isOpen={openPriceChange && !!shouldShowDialogs}
        title={t('price_may_increase')}
        description={
          <p>
            {t('book_within_1')}{' '}
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
        isOpen={open && !!shouldShowDialogs}
        title={t('still_online_title')}
        description={<p>{t('still_online_description')}</p>}
        footer={
          <Button size="secondary" variant="default" onClick={handleTimeout}>
            OK
          </Button>
        }
      />
    </>
  );
}
