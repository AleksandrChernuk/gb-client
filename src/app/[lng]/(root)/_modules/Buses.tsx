import { Container } from '@/components/shared/Container';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import travellerOnTheStreet from '@/assets/images/a-traveller-on-the-street-with-a-suitcase-looking.avif';
import { getTranslations } from 'next-intl/server';

export default async function Buses() {
  const t = await getTranslations('main');

  return (
    <section className="pb-8 tablet:pb-16">
      <Container size="m">
        <ul className="justify-between min-h-full gap-5 tablet:flex laptop:gap-40">
          <li className="flex items-center justify-center mb-8 tablet:order-2 tablet:mb-0 ">
            <Image
              alt="peaple wait buses"
              src={travellerOnTheStreet}
              placeholder="blur"
              width={350}
              height={353}
              className="overflow-hidden rounded-3xl"
            />
          </li>
          <li className="flex flex-col tablet:w-1/2">
            <h3 className="mb-4 text-2xl font-bold tracking-normal leading-[28.8px] laptop:text-[32px] laptop:leading-[38.4px] laptop:mb-8 text-slate-700 dark:text-slate-50">
              {t('buses_title')}
            </h3>
            <p className="mb-4 text-base font-normal leading-6 tracking-normal text-slate-400 dark:text-slate-200">
              {t('buses_description')}
            </p>

            <div className="mt-auto ml-auto tablet:ml-0">
              <Button variant={'default'} size={'secondary'}>
                {t('buses_button')}
              </Button>
            </div>
          </li>
        </ul>
      </Container>
    </section>
  );
}
