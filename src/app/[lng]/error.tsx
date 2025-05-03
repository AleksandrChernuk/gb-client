'use client';

import { MESSAGE_FILES } from '@/constans/message.file.constans';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

type Props = {
  error: Error;
  reset(): void;
};

export default function Error({ error, reset }: Props) {
  const t = useTranslations(MESSAGE_FILES.COMMON);

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      {t.rich('error', {
        p: (chunks) => <p className="mt-4">{chunks}</p>,
        retry: (chunks) => (
          <button className="text-white underline underline-offset-2" onClick={reset} type="button">
            {chunks}
          </button>
        ),
      })}
    </div>
  );
}
