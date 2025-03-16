import getstarted from './images/getstarted.png';
import buses from './images/buses.png';
import MainSearch from '@/components/modules/main-search';
import { Container } from '@/components/shared/Container';
import HerowImg from './components/HerowImg';
import { benefits } from '@/constans/constans.benefits';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { RoutersList } from './components/RoutersList';
import { CarriersList } from './components/CarriersList';
import { QuestionsMobileList } from './components/QuestionsMobileList';
import { Link } from '@/i18n/routing';
import { QuestionsTabletList } from './components/QuestionsTabletList';
import { QuestionsLaptopList } from './components/QuestionsLaptopList';

export default async function MainPage() {
  const t = await getTranslations('main');

  return (
    <main role="main" className="grow bg-grayy dark:bg-dark_bg">
      <section className="relative pt-0 tablet:pt-0">
        <h1 className="sr-only">Автобусні квитки з України в Європу – зручні перевезення з GreenBus</h1>
        <HerowImg />
        <Container size="l" className="static top-0 left-0 right-0 -translate-y-4 tablet:-translate-y-1/2">
          <MainSearch />
        </Container>
      </section>
      <section className="mt-7">
        <Container size="l">
          <ul className="grid grid-cols-1 grid-rows-4 tablet:grid-cols-[repeat(2,minmax(auto,1fr))] tablet:grid-rows-2 laptop:grid-cols-[repeat(4,minmax(auto,auto))] laptop:grid-rows-1 gap-2 tablet:gap-8 laptop:gap-[117px]">
            {benefits &&
              benefits.map(({ title, id, text, icon }) => (
                <li key={id}>
                  <ul className="space-y-2">
                    <li className="w-14 h-14 tablet:w-16 tablet:h-16 laptop:w-[72px] laptop:h-[72px]">{icon}</li>
                    <li className="shrink">
                      <h3 className="h5 tablet:h3 text-text_prymery text-nowrap">{t(`${title}`)}</h3>
                    </li>
                    <li>
                      <p className="secondary_text tablet:main_text_body text-text_secondary">{t(`${text}`)}</p>
                    </li>
                  </ul>
                </li>
              ))}
          </ul>
        </Container>
      </section>
      <section className="my-12">
        <Container size="m">
          <ul className="items-start justify-between space-y-8 tablet:flex tablet:gap-5 laptop:gap-40">
            <li className="tablet:order-2 shrink-0">
              <Image
                src={buses}
                placeholder="blur"
                alt="peaple wait buses"
                className="overflow-hidden rounded-3xl mx-auto w-auto h-auto tablet:w-[330px] tablet:h-[325px] laptop:w-[350px] laptop:h-[345px]"
              />
            </li>
            <li className="tablet:w-1/2">
              <h3 className="mb-4 h3 laptop:h1 laptop:mb-8 text-text_prymery">{t('buses_title')}</h3>
              <p className="mb-4 tablet:mb-[72px] laptop:mb-[96px] body_text text-text_secondary max-w-[425px]">
                {t('buses_description')}
              </p>
              <Button variant={'default'} size={'secondary'}>
                {t('buses_button')}
              </Button>
            </li>
          </ul>
        </Container>
      </section>
      <section className="py-6 bg-background_card laptop:py-8 dark:bg-dark_main">
        <Container size="m" className="tablet:px-8">
          <h3 className="mb-4 text-white button_large_text tablet:h3 laptop:mb-8 laptop:h1">{t('popular_title')}</h3>
          <RoutersList buttonText={t('popular_button')} />
        </Container>
      </section>
      <section className="my-12">
        <Container size="m">
          <ul className="items-start justify-between space-y-8 tablet:flex tablet:gap-5 laptop:gap-40">
            <li className="shrink-0">
              <Image
                src={getstarted}
                placeholder="blur"
                alt="people and bus"
                className="overflow-hidden rounded-3xl mx-auto w-auto h-auto tablet:w-[330px] tablet:h-[325px] laptop:w-[350px] laptop:h-[345px]"
              />
            </li>
            <li className="tablet:order-2 tablet:w-1/2">
              <h3 className="mb-4 h3 laptop:h1 laptop:mb-8 text-text_prymery">{t('get_started_title')}</h3>
              <p className="mb-4 tablet:mb-[72px] laptop:mb-[96px] body_text text-text_secondary max-w-[425px]">
                {t('get_started_description')}
              </p>
              <div className="">
                <Button variant={'default'} size={'secondary'}>
                  {t('get_started_button')}
                </Button>
              </div>
            </li>
          </ul>
        </Container>
      </section>

      <section className="my-12">
        <Container size="m">
          <article>
            <ul className="items-start justify-between space-y-8 tablet:flex tablet:gap-5 laptop:gap-40">
              <li className="self-center tablet:order-2 shrink-0 tablet:w-1/2">
                <CarriersList />
              </li>
              <li className="tablet:w-1/2">
                <h3 className="mb-4 h3 laptop:h1 laptop:mb-8 text-text_prymery">{t('сarriers_title')}</h3>

                <p className="mb-4 tablet:mb-[72px] laptop:mb-[96px] body_text text-text_secondary max-w-[425px]">
                  {t('сarriers_description')}
                </p>

                <div className="mt-auto">
                  <Button variant={'default'} size={'secondary'} className="h6 min-w-[159px] px-6 tablet:py-[14px]">
                    {t('сarriers_button')}
                  </Button>
                </div>
              </li>
            </ul>
          </article>
        </Container>
      </section>

      <section className="py-6 bg-background_card laptop:py-8 dark:bg-dark_main">
        <Container size="m">
          <h3 className="mb-4 text-white h3 laptop:h1 laptop:mb-8 dark:text-garyy">{t('questions_title')}</h3>

          <QuestionsMobileList />
          <QuestionsTabletList />
          <QuestionsLaptopList />

          <div className="text-left">
            <Button asChild variant={'secondary'} size={'secondary'}>
              <Link href={'/faq'}>{t('questions_button')}</Link>
            </Button>
          </div>
        </Container>
      </section>
    </main>
  );
}
