import { Container } from '@/components/shared/Container';
import { Button } from '@/components/ui/button';
import { getTranslations } from 'next-intl/server';
import { CarriersList } from '../components/CarriersList';
import { MESSAGE_FILES } from '@/constans/message.file.constans';

export default async function Carriers() {
  const t = await getTranslations(MESSAGE_FILES.MAIN_PAGE);

  return (
    <section className="pt-6 pb-12">
      <Container size="m">
        <article>
          <ul className="justify-between min-h-full tablet:flex tablet:gap-5 laptop:gap-40">
            <li className="flex items-center justify-center mb-8 tablet:order-2 tablet:mb-0 ">
              <CarriersList />
            </li>

            <li className="flex flex-col tablet:w-1/2">
              <h3 className="mb-4 text-2xl font-bold tracking-normal leading-[28.8px] laptop:text-[32px] laptop:leading-[38.4px] laptop:mb-8 text-slate-700 dark:text-slate-50">
                {t('сarriers_title')}
              </h3>
              <p className="mb-4 body_text text-slate-400 dark:text-slate-200">{t('сarriers_description')}</p>
              <div className="mt-auto ml-auto tablet:ml-0">
                <Button
                  variant={'default'}
                  size={'secondary'}
                  className="text-sm font-bold tracking-normal leading-[18px] min-w-[159px] px-6 tablet:py-[14px]"
                >
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
