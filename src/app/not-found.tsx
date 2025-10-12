'use client';

import { Container } from '@/shared/ui/Container';
import CustomCard from '@/shared/ui/CustomCard';
import errorImg from '@/assets/images/something-happened-on-the-site.avif';
import Image from 'next/image';
import { Button } from '@/shared/ui/button';
import { Link } from '@/shared/i18n/routing';

export default function NotFound() {
  return (
    <main className="grow flex flex-col items-center justify-center">
      <section className="py-5">
        <Container size="l" className="w-full">
          <CustomCard className="shadow-xs flex flex-col items-center self-center gap-4 p-5 mx-auto text-center w-fit dark:bg-slate-700">
            <div className="relative w-[313px] h-[313px] mx-auto overflow-hidden rounded-3xl">
              <Image src={errorImg} draggable={false} placeholder="blur" alt="people waiting for bus" />
            </div>
            <h1 className="text-2xl laptop:text-[32px] font-bold leading-[28.8px] laptop:leading-[38.4px] text-slate-700 dark:text-slate-50">
              Сторінку не знайдено
            </h1>
            <Button variant="secondary" size="primary" className="text-black">
              <Link href="/">На головну</Link>
            </Button>
          </CustomCard>
        </Container>
      </section>
    </main>
  );
}
