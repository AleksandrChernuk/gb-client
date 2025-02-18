"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useRouter } from "@/i18n/routing";

export function DialogNewOrder({ open }: { open: boolean }) {
  const router = useRouter();
  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="text-center">
          <DialogTitle className="h5 text-text_prymery">Ви ще онлайн?</DialogTitle>
          <DialogDescription className="sr-only">Ви ще онлайн?</DialogDescription>
        </DialogHeader>
        <p className="text-text_prymery text-main_text_body">
          Оскільки ви не оформили замовлення у відведений час, ми очистили вміст вашого кошика. Але ви завжди можете
          спробувати знову забронювати ті ж квитки!
        </p>
        <DialogFooter className="gap-2 flex-wrap">
          <Button
            variant={"default"}
            className="py-2 px-3 border border-primary button_mobile target:h5 text-text_primary"
            onClick={() => {
              router.back();
            }}
          >
            Повернутися до пошуку
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function Timer() {
  const [timer, setTimer] = useState<number>(600);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const id = useRef<number | undefined>(undefined);

  const radius = 10;
  const circumference = 2 * Math.PI * radius;

  const offset = (timer: number) => {
    return circumference - (timer / 600) * circumference;
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("timer", String(timer));
  }, [timer]);

  useEffect(() => {
    id.current = window.setInterval(() => {
      setTimer((time) => time - 1);
    }, 1000);

    return () => {
      if (id.current) {
        window.clearInterval(id.current);
        localStorage.removeItem("timer");
      }
    };
  }, []);

  useEffect(() => {
    if (timer === 0 && id.current) {
      setOpen(true);
      window.clearInterval(id.current);
      localStorage.removeItem("timer");
    }
  }, [timer]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
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
          className="lucide lucide-circle stroke-gray_1 dark:stroke-black_2_for_text"
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
          className="absolute top-0 left-0 transform rotate-90 origin-center stroke-primary animate-rotate"
        >
          <circle cx="12" cy="12" r={radius} />
        </svg>
      </div>

      <div className="button_mobile text-primary">{formatTime(timer)}</div>
      <DialogNewOrder open={open} />
    </div>
  );
}
