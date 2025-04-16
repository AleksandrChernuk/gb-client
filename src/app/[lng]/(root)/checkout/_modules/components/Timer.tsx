'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from '@/i18n/routing';
import CustomDialog from '@/components/shared/CustomDialog';

export default function Timer() {
  const [timer, setTimer] = useState<number>(600);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const intervalId = useRef<number | null>(null);
  const router = useRouter();

  const radius = 10;
  const circumference = 2 * Math.PI * radius;

  const offset = (timer: number) => circumference - (timer / 600) * circumference;

  useEffect(() => {
    setIsClient(true);

    const savedTime = Number(localStorage.getItem('timer'));
    if (savedTime) {
      setTimer(savedTime);
    }

    intervalId.current = window.setInterval(() => {
      setTimer((prev) => {
        if (prev > 0) {
          localStorage.setItem('timer', String(prev - 1));
          return prev - 1;
        } else {
          setOpen(true);
          clearInterval(intervalId.current!);
          localStorage.removeItem('timer');
          return 0;
        }
      });
    }, 1000);

    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    };
  }, []);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="flex items-center gap-1 p-1 ">
      <div className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-circle stroke-slate-200 dark:stroke-slate-700"
        >
          <circle cx="12" cy="12" r="10" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={offset(timer)}
          className="absolute top-0 left-0 origin-center transform rotate-90 stroke-primary animate-rotate"
        >
          <circle cx="12" cy="12" r={radius} />
        </svg>
      </div>

      <div className="text-sm font-bold tracking-normal leading-[16.8px] text-primary">{formatTime(timer)}</div>
      <CustomDialog
        isOpen={open}
        title="Ви ще онлайн?"
        description="Ви ще онлайн?"
        footer={
          <Button
            variant={'default'}
            className="px-3 py-2 text-white border border-primary text-sm font-bold tracking-normal leading-[16.8px] tablet:text-base tablet:leading-6"
            onClick={() => {
              router.back();
            }}
          >
            Повернутися до пошуку
          </Button>
        }
      >
        <p className="mb-2 text-base font-normal leading-6 tracking-normal text-center text-slate-700 dark:text-slate-50">
          Оскільки ви не оформили замовлення у відведений час, ми очистили вміст вашого кошика. Але ви завжди можете
          спробувати знову забронювати ті ж квитки!
        </p>
      </CustomDialog>
    </div>
  );
}
