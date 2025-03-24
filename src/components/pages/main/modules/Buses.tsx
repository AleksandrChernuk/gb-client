import { Container } from '@/components/shared/Container';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import travellerOnTheStreet from '@/public/images/a-traveller-on-the-street-with-a-suitcase-looking.avif';
import { getTranslations } from 'next-intl/server';

export default async function Buses() {
  const t = await getTranslations('main');

  return (
    <section className="py-6">
      <Container size="m">
        <ul className="items-start justify-between space-y-8 tablet:flex tablet:gap-5 laptop:gap-40">
          <li className="tablet:order-2">
            <Image
              alt="peaple wait buses"
              src={travellerOnTheStreet}
              placeholder="blur"
              width={350}
              height={353}
              className="overflow-hidden rounded-3xl mx-auto"
            />
          </li>
          <li className="tablet:w-1/2">
            <h3 className="mb-4 h3 laptop:h1 laptop:mb-8 text-text_prymery">{t('buses_title')}</h3>
            <p className="mb-4 body_text text-text_secondary">{t('buses_description')}</p>
            <Button variant={'default'} size={'secondary'}>
              {t('buses_button')}
            </Button>
          </li>
        </ul>
      </Container>
    </section>
  );
}
