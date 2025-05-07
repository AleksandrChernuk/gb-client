'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from '@/i18n/routing';
import CustomDialog from '@/components/shared/CustomDialog';

export default function Timer() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setOpen(true);
    }, 600 * 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <CustomDialog
      isOpen={open}
      title="Ви ще онлайн?"
      description="Оскільки ви не оформили замовлення у відведений час, ми очистили вміст вашого кошика."
      footer={
        <Button variant="default" onClick={() => router.back()}>
          Повернутися до пошуку
        </Button>
      }
    />
  );
}
