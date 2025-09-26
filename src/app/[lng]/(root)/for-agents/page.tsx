import { Params } from '@/shared/types/common.types';
import { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import Image from 'next/image';
import { Container } from '@/shared/ui/Container';
import ThirdFooter from '@/widgets/footer/ThirdFooter';
import CooperationForm from '@/features/cooperation-form';
import CustomCard from '@/shared/ui/CustomCard';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import BackRouteButton from '@/shared/ui/BackRouteButton';

type Props = {
  params: Params;
};

import busDirectly from '@/assets/images/bus-directly-to-the-bus-stop.avif';
import directionWith from '@/assets/images/direction-with-a-road-in-the-city.avif';
import { joinUsAgents } from '@/shared/constans/join.us.agents.constans';
import { generatePublicPageMetadata } from '@/shared/lib/metadata';

export async function generateMetadata({ params }: Props) {
  const { lng } = (await params) as { lng: Locale };
  return generatePublicPageMetadata({
    lng,
    namespace: MESSAGE_FILES.METADATA,
    slug: 'for-agents',
    path: 'for-agents',
  });
}

export default async function ForAgents({
  params,
}: Readonly<{
  params: Params;
}>) {
  const { lng } = await params;
  const t_common = await getTranslations(MESSAGE_FILES.COMMON);
  const t_for_agents = await getTranslations(MESSAGE_FILES.FORAGENTS_PAGE);
  setRequestLocale(lng as Locale);

  return (
    <>
      <main>
        <section className="pt-8 pb-16">
          <Container size="m">
            <div className="mb-8">
              <BackRouteButton />
            </div>

            <ul className="flex flex-col gap-12 tablet:flex-row tablet:items-center">
              <li className="tablet:w-1/2">
                <Image
                  src={busDirectly}
                  width={766}
                  height={318}
                  priority
                  draggable={false}
                  alt="people-with-suitcases-looking-straight-ahead-goin"
                />
              </li>
              <li className="tablet:w-1/2">
                <h1 className="mb-4 text-xl font-bold tracking-normal leading-[28.8px] laptop:text-[32px] laptop:leading-[38.4px] text-slate-700 dark:text-slate-50">
                  {t_for_agents('automate_ticket_title')}
                </h1>
                <p className="text-sm leading-[21px] laptop:text-base font-normal laptop:leading-6 tracking-normal text-slate-400 dark:text-slate-200">
                  {t_for_agents('automate_ticket_text')}
                </p>
              </li>
            </ul>
          </Container>
        </section>

        <section className="bg-green-500">
          <Container size="m" className="py-8">
            <h2 className="mb-4 text-xl font-bold tracking-normal leading-[28.8px] laptop:text-[32px] laptop:leading-[38.4px] text-slate-50 laptop:mb-8">
              {t_for_agents('why_join_us_title')}
            </h2>
            <ul className="grid justify-between grid-cols-1 gap-4 tablet:gap-6 laptop:grid-cols-3 laptop:gap-20">
              {joinUsAgents.map(({ title, text, icon }) => (
                <li key={title} className="flex flex-col items-start gap-2">
                  <Image
                    src={icon.src}
                    width={icon.w}
                    height={icon.h}
                    alt={icon.alt}
                    className="size-14 tablet:size-16 laptop:size-[72px]"
                  />
                  <h3 className="text-base font-bold leading-6 tracking-normal text-green-100">
                    {t_for_agents(`why_join_us_text.${title}`)}
                  </h3>
                  <p className="text-sm font-normal tracking-normal leading-[21px] text-slate-200">
                    {t_for_agents(`why_join_us_text.${text}`)}
                  </p>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        <section className="pt-16 bg-slate-50 dark:bg-slate-900">
          <Container size="m">
            <ul className="flex flex-col gap-12 tablet:flex-row ">
              <li className="tablet:w-1/2">
                <h2 className="mb-4 text-xl font-bold tracking-normal leading-[28.8px] laptop:text-[32px] laptop:leading-[38.4px] text-slate-700 dark:text-slate-50">
                  {t_for_agents('features_title')}
                </h2>
                <p className="text-sm font-normal tracking-normal leading-[21px] laptop:text-base laptop:leading-6 text-slate-400 dark:text-slate-200">
                  {t_for_agents('features_text')}
                </p>
              </li>
              <li className="mx-auto">
                <Image
                  alt="direction-with-a-road-in-the-city"
                  src={directionWith}
                  width={350}
                  height={353}
                  className="mx-auto overflow-hidden rounded-3xl"
                />
              </li>
            </ul>
          </Container>
        </section>

        <section className="py-16 bg-slate-50 dark:bg-slate-900">
          <Container size="xs" className="my-auto">
            <CustomCard className="dark:bg-slate-800">
              <h3 className="mb-6 text-center text-xl font-bold tracking-normal leading-[28.8px] laptop:text-[32px] laptop:leading-[38.4px] text-slate-700 dark:text-slate-50">
                {t_common('leave_a_request')}
              </h3>
              <CooperationForm />
            </CustomCard>
          </Container>
        </section>
      </main>
      <ThirdFooter />
    </>
  );
}
