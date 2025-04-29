import { Container } from '@/components/shared/Container';
import { Button } from '@/components/ui/button';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import pointOnCurt from '@/assets/images/point-on-curt.avif';

export default async function GetStarted() {
  const t = await getTranslations('main');
  const t_img_alts = await getTranslations('img_alts');

  return (
    <section className="py-8 tablet:py-16">
      <Container size="m">
        <ul className="justify-between min-h-full tablet:flex tablet:gap-5 laptop:gap-40">
          <li className="relative overflow-hidden rounded-3xl w-[350px] h-[353px]  mb-8 tablet:order-2 tablet:mb-0 mx-auto">
            <Image
              alt={t_img_alts('map')}
              src={pointOnCurt}
              fill
              placeholder="blur"
              sizes="100vw"
              style={{
                objectFit: 'contain',
              }}
            />
          </li>
          <li className="flex flex-col tablet:order-2 tablet:w-1/2">
            <h3 className="mb-4 text-2xl leading-[28.8px] laptop:text-[32px] font-bold tracking-normal laptop:leading-[38.4px] laptop:mb-8 text-slate-700 dark:text-slate-50">
              {t('get_started_title')}
            </h3>
            <p className="mb-4 body_text text-slate-400 dark:text-slate-200">{t('get_started_description')}</p>
            <div className="mt-auto ml-auto tablet:ml-0">
              <Button variant={'default'} size={'secondary'}>
                {t('get_started_button')}
              </Button>
            </div>
          </li>
        </ul>
      </Container>
    </section>
  );
}
