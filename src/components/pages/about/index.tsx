import ThirdFooter from '@/components/modules/footer/ThirdFooter';
import RequestPartnershipForm from '@/components/modules/request-partnership';
import BackRouteButton from '@/components/shared/BackRouteButton';
import { Container } from '@/components/shared/Container';
import { CustomCard } from '@/components/shared/CustomCard';
import { MESSAGE_FILES } from '@/constans/message.file.constans';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import irectionWith from '@/assets/images/direction-with-a-road-in-the-city.avif';
import world from '@/assets/images/world.avif';
import business from '@/assets/images/business.avif';
import group from '@/assets/images/group.avif';
import { aboutUsStatistics } from '@/constans/about.us.statistics';

export default async function AboutPage() {
  const [t_about, t_common] = await Promise.all([
    getTranslations(MESSAGE_FILES.ABOUT_PAGE),
    getTranslations(MESSAGE_FILES.COMMON),
  ]);

  return (
    <>
      <main className="bg-slate-50 dark:bg-slate-900">
        <section className="pt-8">
          <Container size="m">
            <div className="mb-8">
              <BackRouteButton />
            </div>
            <ul className="items-start justify-between space-y-8 tablet:space-y-0 tablet:flex tablet:gap-4">
              <li className="tablet:w-1/2 tablet:order-2">
                <h1 className="mb-2 laptop:mb-4 text-xl font-bold tracking-normal leading-[28.8px] laptop:text-[32px] laptop:leading-[38.4px] text-slate-700 dark:text-slate-50">
                  {t_about('route_to_europe_title')}
                </h1>
                <p className="mb-4 body_text text-slate-400 dark:text-slate-200">{t_about('route_to_europe_text')}</p>
              </li>
              <li className="overflow-hidden tablet:w-1/2 tablet:mr-auto max-w-[400px]">
                <Image
                  alt="direction-with-a-road-in-the-city"
                  src={irectionWith}
                  priority
                  draggable={false}
                  placeholder="blur"
                  quality={80}
                  className="mx-auto tablet:mx-0 rounded-3xl h-auto"
                />
              </li>
            </ul>
          </Container>
        </section>

        <section className="py-16 ">
          <Container size="m">
            <ul className="flex items-start justify-between gap-1 tablet:gap-4">
              {aboutUsStatistics.map(({ id, title, text }) => (
                <li key={id} className="text-center">
                  <h3 className="mb-2 laptop:mb-4 text-base font-bold leading-6 tracking-normal text-green-300 tablet:text-2xl laptop:text-[32px] laptop:leading-[38.4px]">
                    {t_about(`statistics.${title}`)}
                  </h3>
                  <p className="text-base font-normal tracking-normal leading-[18px] tablet:text-lg tablet:leading-[27px] text-slate-400 dark:text-slate-200">
                    {t_about(`statistics.${text}`)}
                  </p>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        <section className="pb-16">
          <Container size="m">
            <ul className="items-start justify-between space-y-8 tablet:space-y-0 tablet:flex tablet:gap-4">
              <li className="mb-4 tablet:mb-0 tablet:w-1/2">
                <h2 className="mb-2 laptop:mb-4 text-xl font-bold tracking-normal leading-[28.8px] laptop:text-[32px] laptop:leading-[38.4px] text-slate-700 dark:text-slate-50">
                  {t_about('professional_solutions_title')}
                </h2>
                <p className="text-base font-normal tracking-normal leading-[21px] laptop:text-lg laptop:leading-6 text-slate-400 dark:text-slate-200">
                  {t_about('professional_solutions_text')}
                </p>
              </li>
              <li className="ml-auto max-w-[400px]">
                <Image
                  alt="group"
                  src={group}
                  draggable={false}
                  placeholder="blur"
                  quality={80}
                  className="mx-auto tablet:mx-0 rounded-3xl h-auto"
                />
              </li>
            </ul>
          </Container>
        </section>

        <section className="bg-green-500">
          <Container size="m" className="py-6 tablet:py-12 ">
            <h2 className="mb-2 laptop:mb-4 text-xl font-bold tracking-normal leading-[28.8px] laptop:text-[32px] laptop:leading-[38.4px] text-slate-50">
              {t_about('about_us_title')}
            </h2>

            <p className="text-base font-normal tracking-normal leading-[21px] laptop:text-lg laptop:leading-6 text-slate-200">
              {t_about('about_us_text')}
            </p>
          </Container>
        </section>

        <section className="py-16">
          <Container size="m">
            <ul className="items-start justify-between space-y-8 tablet:flex tablet:gap-5">
              <li className="tablet:w-1/2">
                <h2 className="mb-2 laptop:mb-4 text-xl font-bold tracking-normal leading-[28.8px] laptop:text-[32px] laptop:leading-[38.4px] text-slate-700 dark:text-slate-50">
                  {t_about('main_product_title')}
                </h2>
                <p className="text-base font-normal tracking-normal leading-[21px] laptop:text-lg laptop:leading-6 text-slate-400 dark:text-slate-200">
                  {t_about('main_product_text')}
                </p>
              </li>
              <li className="ml-auto max-w-[400px]">
                <Image
                  alt="world"
                  src={world}
                  draggable={false}
                  placeholder="blur"
                  quality={80}
                  className="mx-auto tablet:mx-0 rounded-3xl h-auto"
                />
              </li>
            </ul>
          </Container>
        </section>

        <section className="bg-green-500">
          <Container size="m" className="py-6 tablet:py-12 ">
            <ul className="items-start justify-between space-y-8 tablet:space-y-0 tablet:flex tablet:gap-5 ">
              <li className="mr-auto max-w-[400px]">
                <Image
                  alt="group"
                  src={business}
                  draggable={false}
                  className="mx-auto tablet:mx-0 rounded-3xl max-w-[400px]"
                />
              </li>
              <li className="tablet:w-1/2">
                <h2 className="mb-2 laptop:mb-4 text-xl font-bold tracking-normal leading-[28.8px] laptop:text-[32px] laptop:leading-[38.4px] text-slate-50">
                  {t_about('individual_approach_title')}
                </h2>

                <p className="text-base font-normal tracking-normal leading-[21px] laptop:text-lg laptop:leading-6 text-slate-200">
                  {t_about('individual_approach_text')}
                </p>
              </li>
            </ul>
          </Container>
        </section>
        <section className="py-16 bg-slate-50 dark:bg-slate-900">
          <Container size="xs" className="my-auto">
            <CustomCard className="dark:bg-slate-800">
              <h3 className="mb-6 text-center text-2xl font-bold tracking-normal leading-[28.8px] laptop:h1 text-slate-700 dark:text-slate-50">
                {t_common('leave_a_request')}
              </h3>
              <RequestPartnershipForm />
            </CustomCard>
          </Container>
        </section>
      </main>
      <ThirdFooter />
    </>
  );
}
