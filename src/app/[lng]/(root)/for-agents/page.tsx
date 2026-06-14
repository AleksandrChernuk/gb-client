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

import busDirectly from '@/assets/images/bus-directly-to-the-bus-stop.webp';
import directionWith from '@/assets/images/direction-with-a-road-in-the-city.webp';
import { joinUsAgents } from '@/shared/constans/join.us.agents.constans';
import { generatePublicPageMetadata } from '@/shared/lib/metadata';
import { Link } from '@/shared/i18n/routing';
import { BASE_URL } from '@/shared/configs/constants';

export async function generateMetadata({ params }: Props) {
  const { lng } = (await params) as { lng: Locale };
  return await generatePublicPageMetadata({
    lng,
    namespace: MESSAGE_FILES.METADATA,
    slug: 'for-agents',
    path: 'for-agents/',
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

  const faqItems = [1, 2, 3, 4, 5].map((i) => ({
    question: t_for_agents(`faq_q${i}`),
    answer: t_for_agents(`faq_a${i}`),
  }));

  const pageSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: t_for_agents('automate_ticket_title'),
        serviceType: 'Bus ticket sales platform for agents',
        description: t_for_agents('automate_ticket_text'),
        areaServed: ['UA', 'EU'],
        provider: { '@type': 'Organization', name: 'GreenBus', url: BASE_URL },
        url: `${BASE_URL}/${lng}/for-agents/`,
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
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
                  alt={t_for_agents('automate_ticket_title')}
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
                    alt={t_for_agents(`why_join_us_text.${title}`)}
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
            <ul className="flex flex-col gap-12 tablet:flex-row">
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
                  alt={t_for_agents('features_title')}
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
          <Container size="m">
            <h2 className="mb-6 text-xl font-bold tracking-normal leading-[28.8px] laptop:text-[32px] laptop:leading-[38.4px] text-slate-700 dark:text-slate-50">
              {t_for_agents('faq_title')}
            </h2>
            <dl className="space-y-5">
              {faqItems.map((item, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800"
                >
                  <dt className="mb-1.5 text-base font-bold text-slate-800 dark:text-slate-50 tablet:text-lg">
                    {item.question}
                  </dt>
                  <dd className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 tablet:text-base">
                    {item.answer}
                  </dd>
                </div>
              ))}
            </dl>

            <h2 className="mb-4 mt-12 text-xl font-bold tracking-normal leading-[28.8px] laptop:text-[32px] laptop:leading-[38.4px] text-slate-700 dark:text-slate-50">
              {t_for_agents('useful_links_title')}
            </h2>
            <div className="flex flex-wrap gap-3">
              {[
                { href: '/for-carriers/', label: t_for_agents('link_carriers') },
                { href: '/about/', label: t_for_agents('link_about') },
                { href: '/routes/', label: t_for_agents('link_routes') },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  prefetch={false}
                  className="inline-flex items-center rounded-full border border-green-500/30 bg-green-50 px-4 py-2 text-sm font-medium text-green-700 transition-colors hover:border-green-500 hover:bg-green-100 dark:border-green-500/30 dark:bg-green-500/10 dark:text-green-300 dark:hover:bg-green-500/20"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </Container>
        </section>

        <section className="py-16 bg-slate-50 dark:bg-slate-900">
          <Container size="xs" className="my-auto">
            <CustomCard className="dark:bg-slate-800">
              <h2 className="mb-6 text-center text-xl font-bold tracking-normal leading-[28.8px] laptop:text-[32px] laptop:leading-[38.4px] text-slate-700 dark:text-slate-50">
                {t_common('leave_a_request')}
              </h2>
              <CooperationForm />
            </CustomCard>
          </Container>
        </section>
      </main>
      <ThirdFooter />
    </>
  );
}
