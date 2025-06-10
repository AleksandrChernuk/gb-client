'use client';

import MainHeader from '@/components/modules/header/MainHeader';
import { Container } from '@/components/shared/Container';
import { Button } from '@/components/ui/button';
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
    <div className="flex flex-col h-svh">
      <MainHeader />
      <main className="grow flex flex-col items-center justify-center">
        <section className="py-5">
          <Container size="l" className="w-full">
            <h1 className="text-[32px] font-bold tracking-normal leading-[38.4px] mb-4">{t('errorTitle')}</h1>
            <Button size={'primery'} onClick={reset}>
              {t('mainPageBtn')}
            </Button>
          </Container>
        </section>
      </main>
    </div>
  );
}
