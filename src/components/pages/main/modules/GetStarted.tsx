import { Container } from '@/components/shared/Container';
import { Button } from '@/components/ui/button';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import pointOnCurtfrom from '@/public/images/point-on-curt.avif';

export default async function GetStarted() {
  const t = await getTranslations('main');

  return (
    <section className="py-8 tablet:py-16">
      <Container size="m">
        <ul className="justify-between tablet:flex tablet:gap-5 laptop:gap-40 min-h-full">
          <li className="flex items-center justify-center tablet:order-2 mb-8 tablet:mb-0  ">
            <Image
              alt="people and bus"
              src={pointOnCurtfrom}
              placeholder="blur"
              width={350}
              height={353}
              style={{ width: 'auto', height: 'auto' }}
              className="overflow-hidden rounded-3xl"
            />
          </li>
          <li className="tablet:order-2 tablet:w-1/2 flex flex-col">
            <h3 className="mb-4 h3 laptop:h1 laptop:mb-8 text-text_prymery">{t('get_started_title')}</h3>
            <p className="mb-4 body_text text-text_secondary">{t('get_started_description')}</p>
            <div className="ml-auto tablet:ml-0 mt-auto">
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
