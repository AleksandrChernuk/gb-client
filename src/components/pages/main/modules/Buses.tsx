import { Container } from '@/components/shared/Container';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import travellerOnTheStreet from '@/public/images/a-traveller-on-the-street-with-a-suitcase-looking.avif';
import { getTranslations } from 'next-intl/server';

export default async function Buses() {
  const t = await getTranslations('main');

  return (
    <section className="pb-8 tablet:pb-16">
      <Container size="m">
        <ul className="justify-between tablet:flex gap-5 laptop:gap-40 min-h-full">
          <li className="flex items-center justify-center tablet:order-2 mb-8 tablet:mb-0  ">
            <Image
              alt="peaple wait buses"
              src={travellerOnTheStreet}
              placeholder="blur"
              width={350}
              height={353}
              style={{ width: 'auto', height: 'auto' }}
              className="overflow-hidden rounded-3xl"
            />
          </li>
          <li className="tablet:w-1/2 flex flex-col">
            <h3 className="mb-4 h3 laptop:h1 laptop:mb-8 text-text_prymery">{t('buses_title')}</h3>
            <p className="mb-4 body_text text-text_secondary">{t('buses_description')}</p>

            <div className="ml-auto tablet:ml-0 mt-auto">
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
