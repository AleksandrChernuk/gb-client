'use client';

import MainHeader from '@/widgets/header/MainHeader';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import errorImg from '@/assets/images/something-happened-on-the-site.webp';

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { Container } from '@/shared/ui/Container';
import { Button } from '@/shared/ui/button';
import CustomCard from '@/shared/ui/CustomCard';

export async function generateMetadata() {
  return {
    manifest: '/manifest.json',

    robots: {
      index: false,
      follow: false,
      nocache: false,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

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
    <>
      <Head>
        <title>{t('errorTitle')} | GreenBus</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="description" content={t('errorDescription') ?? 'Виникла помилка.'} />
      </Head>
      <div className="flex flex-col h-svh">
        <MainHeader />
        <main className="grow flex flex-col items-center justify-center">
          <section className="py-5">
            <Container size="l" className="w-full">
              <CustomCard className="shadow-xs flex flex-col items-center self-center gap-4 p-5 mx-auto text-center w-fit dark:bg-slate-700">
                <div className="relative w-[313px] h-[313px] mx-auto overflow-hidden rounded-3xl">
                  <Image src={errorImg} draggable={false} placeholder="blur" alt="peaple wait buses" />
                </div>
                <h1 className="text-2xl laptop:text-[32px] font-bold tracking-normal leading-[28.8px] laptop:leading-[38.4px] text-slate-700 dark:text-slate-50">
                  {t('errorTitle')}!
                </h1>
                <Button variant={'default'} size={'primary'} onClick={reset}>
                  {t('try_again')}
                </Button>
                <Button variant={'secondary'} size={'primary'} className="text-black">
                  <Link href={'/'}>{t('mainPageBtn')}</Link>
                </Button>
              </CustomCard>
            </Container>
          </section>
        </main>
      </div>
    </>
  );
}
