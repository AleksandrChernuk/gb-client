import { Container } from '@/components/shared/Container';
import { Button } from '@/components/ui/button';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import pointOnCurtfrom from '../images/point-on-curt.avif';

export default async function GetStarted() {
  const t = await getTranslations('main');

  return (
    <section className="pt-12 pb-6">
      <Container size="m">
        <ul className="items-start justify-between space-y-8 tablet:flex tablet:gap-5 laptop:gap-40">
          <li>
            <Image
              alt="people and bus"
              src={pointOnCurtfrom}
              placeholder="blur"
              width={350}
              height={353}
              className="overflow-hidden rounded-3xl mx-auto"
            />
          </li>
          <li className="tablet:order-2 tablet:w-1/2">
            <h3 className="mb-4 h3 laptop:h1 laptop:mb-8 text-text_prymery">{t('get_started_title')}</h3>
            <p className="mb-4 body_text text-text_secondary">{t('get_started_description')}</p>
            <div className="">
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
