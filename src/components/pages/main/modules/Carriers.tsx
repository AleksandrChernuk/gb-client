import { Container } from '@/components/shared/Container';
import { CarriersList } from '../components/CarriersList';
import { Button } from '@/components/ui/button';
import { getTranslations } from 'next-intl/server';

export default async function Carriers() {
  const t = await getTranslations('main');

  return (
    <section className="pt-6 pb-12">
      <Container size="m">
        <article>
          <ul className="justify-between tablet:flex tablet:gap-5 laptop:gap-40 min-h-full">
            <li className="flex items-center justify-center tablet:order-2 mb-8 tablet:mb-0  ">
              <CarriersList />
            </li>
            <li className="tablet:w-1/2 flex flex-col">
              <h3 className="mb-4 h3 laptop:h1 laptop:mb-8 text-text_prymery">{t('сarriers_title')}</h3>
              <p className="mb-4 body_text text-text_secondary">{t('сarriers_description')}</p>
              <div className="ml-auto tablet:ml-0 mt-auto">
                <Button variant={'default'} size={'secondary'} className="h6 min-w-[159px] px-6 tablet:py-[14px]">
                  {t('сarriers_button')}
                </Button>
              </div>
            </li>
          </ul>
        </article>
      </Container>
    </section>
  );
}
