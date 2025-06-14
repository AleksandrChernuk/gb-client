'use client';

import { Button } from '@/components/ui/button';
import { MESSAGE_FILES } from '@/constans/message.file.constans';
import { CircleX, LoaderCircle, Send, SquarePen } from 'lucide-react';
import { useTranslations } from 'next-intl';

type Props = {
  isInputEnabled: boolean;
  setIsInputEnabled: (v: boolean) => void;
  isSubmitting?: boolean;
};

export default function FormActions({ isInputEnabled, setIsInputEnabled, isSubmitting }: Props) {
  const t = useTranslations(MESSAGE_FILES.FORM);
  return (
    <div className="mt-4">
      {isInputEnabled ? (
        <>
          {isSubmitting ? (
            <LoaderCircle className="stroke-green-300 animate-spin" />
          ) : (
            <div className="flex items-center gap-2">
              <Button type="button" className="text-red-400" variant="link" onClick={() => setIsInputEnabled(false)}>
                <CircleX size={16} className="stroke-red-400" /> {t('close')}
              </Button>
              <Button type="submit" variant="link">
                <Send size={16} className="stroke-green-300" /> {t('change')}
              </Button>
            </div>
          )}
        </>
      ) : (
        <Button type="button" variant="link" onClick={() => setIsInputEnabled(true)}>
          <SquarePen size={16} className="stroke-green-300" /> {t('edit')}
        </Button>
      )}
    </div>
  );
}
