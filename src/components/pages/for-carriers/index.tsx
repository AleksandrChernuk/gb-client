import ThirdFooter from '@/components/modules/footer/ThirdFooter';
import { Container } from '@/components/shared/Container';
import Image from 'next/image';
import { CustomCard } from '@/components/shared/CustomCard';
import RequestPartnershipForm from '@/components/modules/request-partnership';
import { improveYourSalesList } from '@/constans/improve.your.sales.constans';
import BackRouteButton from '@/components/shared/BackRouteButton';
import peopleWithSuitcases from '@/assets/images/people-with-suitcases-looking-straight-ahead-goin.avif';
import busDirectly from '@/assets/images/bus-directly-to-the-bus-stop.avif';
import directionWith from '@/assets/images/direction-with-a-road-in-the-city.avif';
import { MESSAGE_FILES } from '@/constans/message.file.constans';
import { getTranslations } from 'next-intl/server';

export default async function ForCarriersPage() {
  const t_common = await getTranslations(MESSAGE_FILES.COMMON);
  const t_for_carriers = await getTranslations(MESSAGE_FILES.FORCARRIERS_PAGE);

  return (
    <>
      <main className="bg-slate-50 dark:bg-slate-900">
        <section className="pt-8 pb-16">
          <Container size="l">
            <div className="mb-8">
              <BackRouteButton />
            </div>
            <ul className="flex flex-col gap-12 tablet:flex-row tablet:items-center">
              <li className="tablet:w-1/2">
                <h1 className="mb-4 text-xl font-bold tracking-normal leading-[28.8px] laptop:text-[32px] laptop:leading-[38.4px] text-slate-700 dark:text-slate-50">
                  {t_for_carriers('joinGreenBus_title')}
                </h1>
                <p className="text-sm font-normal tracking-normal leading-[21px] laptop:text-base laptop:leading-6 text-slate-400 dark:text-slate-200">
                  {t_for_carriers('joinGreenBus_text')}
                </p>
              </li>
              <li className="tablet:w-1/2">
                <Image
                  src={busDirectly}
                  placeholder="blur"
                  draggable={false}
                  quality={75}
                  className=" max-h-[318px] rounded-3xl"
                  alt="people-with-suitcases-looking-straight-ahead-goin "
                />
              </li>
            </ul>
          </Container>
        </section>

        <section className="bg-green-500">
          <Container size="l" className="py-8">
            <h2 className="mb-4 text-xl font-medium tracking-normal leading-[28.8px] laptop:text-2xl laptop:font-bold laptop:leading-[28.8px] text-slate-50 laptop:mb-8">
              {t_for_carriers('powerful_tools_title')}
            </h2>
            <ul className="grid grid-cols-1 gap-4 tablet:grid-cols-2 laptop:grid-cols-4 laptop:gap-14">
              {improveYourSalesList.map(({ id, title, text, icon }) => (
                <li key={id} className="flex flex-col items-start gap-2">
                  <div className="flex items-center">
                    <Image
                      src={icon.src}
                      width={icon.w}
                      height={icon.h}
                      alt={icon.alt}
                      className="size-14 tablet:size-16 laptop:size-[72px]"
                    />
                    <h3 className="text-base font-bold leading-6 tracking-normal text-green-100">
                      {t_for_carriers(`powerful_tools_text.${title}`)}
                    </h3>
                  </div>
                  <p className="text-sm font-normal tracking-normal leading-[21px] text-slate-200">
                    {t_for_carriers(`powerful_tools_text.${text}`)}
                  </p>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        <section className="py-16">
          <Container size="l">
            <ul className="flex flex-col gap-12 tablet:flex-row tablet:items-center ">
              <li className="tablet:w-1/2">
                <h2 className="mb-4 text-xl font-bold tracking-normal leading-[28.8px] laptop:text-[32px] laptop:leading-[38.4px] text-slate-700 dark:text-slate-50">
                  {t_for_carriers('choose_us_title')}
                </h2>
                <p className="text-sm font-normal tracking-normal leading-[21px] laptop:text-base laptop:leading-6 text-slate-400 dark:text-slate-200 max-w-[766px]">
                  {t_for_carriers('choose_us_text')}
                </p>
              </li>
              <li className="tablet:w-1/2">
                <Image
                  src={peopleWithSuitcases}
                  quality={75}
                  placeholder="blur"
                  alt="people-with-suitcases-looking-straight-ahead-goin"
                  className="h-auto rounded-3xl"
                />
              </li>
            </ul>
          </Container>
        </section>

        <section>
          <Container size="l">
            <ul className="flex flex-col gap-12 tablet:flex-row tablet:items-start">
              <li className="flex items-center justify-center order-1 text-center tablet:order-1 tablet:w-1/2   ">
                <Image
                  alt="direction-with-a-road-in-the-city"
                  src={directionWith}
                  placeholder="blur"
                  quality={75}
                  className="mx-auto overflow-hidden rounded-3xl max-w-[350px] max-h-[353px]"
                />{' '}
              </li>
              <li className="flex flex-col w-full tablet:order-2 tablet:w-1/2">
                <h2 className="mb-4 text-xl font-bold tracking-normal leading-[28.8px] laptop:text-[32px] laptop:leading-[38.4px] text-slate-700 dark:text-slate-50">
                  {t_for_carriers('security_data_title')}
                </h2>
                <p className="text-sm font-normal tracking-normal leading-[21px] laptop:text-base laptop:leading-6 text-slate-400 dark:text-slate-200">
                  {t_for_carriers('security_data_text')}
                </p>
              </li>
            </ul>
          </Container>
        </section>

        <section className="py-16 bg-slate-50 dark:bg-slate-900">
          <Container size="xs" className="my-auto">
            <CustomCard className="dark:bg-slate-800">
              <h2 className="mb-6 text-center text-xl font-bold tracking-normal leading-[28.8px] laptop:text-[32px] laptop:leading-[38.4px] text-slate-700 dark:text-slate-50">
                {t_common('leave_a_request')}
              </h2>
              <RequestPartnershipForm />
            </CustomCard>
          </Container>
        </section>
      </main>
      <ThirdFooter />
    </>
  );
}
