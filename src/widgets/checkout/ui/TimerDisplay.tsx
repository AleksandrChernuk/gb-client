'use client';

import { useCountdownTimer } from '@/features/checkout-form';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { useTranslations } from 'next-intl';
import { memo } from 'react';

export const TimerDisplay = memo(function TimerDisplay() {
  const { formatted } = useCountdownTimer();
  const t_CHECKOUT = useTranslations(MESSAGE_FILES.CHECKOUT_PAGE);

  return (
    <p className="text-sm text-slate-700 dark:text-slate-50 flex flex-wrap items-center gap-1">
      {t_CHECKOUT('book_within_1')} <span className="text-green-300 font-bold text-base">⏱ {formatted}</span>
      {t_CHECKOUT('book__min')} {t_CHECKOUT('book_within_2')}
    </p>
  );
});

TimerDisplay.displayName = 'TimerDisplay';
