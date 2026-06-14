import { Params } from '@/shared/types/common.types';
import { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import BackRouteButton from '@/shared/ui/BackRouteButton';
import { Container } from '@/shared/ui/Container';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { aboutUsStatistics } from '@/shared/constans/about.us.statistics';
import CustomCard from '@/shared/ui/CustomCard';
import ThirdFooter from '@/widgets/footer/ThirdFooter';
import irectionWith from '@/assets/images/direction-with-a-road-in-the-city.webp';
import world from '@/assets/images/world.webp';
import business from '@/assets/images/business.webp';
import group from '@/assets/images/group.webp';
import { generatePublicPageMetadata } from '@/shared/lib/metadata';
import ContactForm from '@/features/contact-form';
import { Link } from '@/shared/i18n/routing';
import { BASE_URL } from '@/shared/configs/constants';

type Props = {
  params: Params;
};

export async function generateMetadata({ params }: Props) {
  const { lng } = (await params) as { lng: Locale };
  return await generatePublicPageMetadata({
    lng,
    namespace: MESSAGE_FILES.METADATA,
    slug: 'about',
    path: 'about',
  });
}

export default async function About({
  params,
}: Readonly<{
  params: Params;
}>) {
  const { lng } = await params;
  const [t_about, t_common] = await Promise.all([
    getTranslations(MESSAGE_FILES.ABOUT_PAGE),
    getTranslations(MESSAGE_FILES.COMMON),
  ]);

  setRequestLocale(lng as Locale);

  const faqItems = [1, 2, 3, 4, 5].map((i) => ({
    question: t_about(`faq_q${i}`),
    answer: t_about(`faq_a${i}`),
  }));

  const aboutSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      },
      {
        '@type': 'Organization',
        '@id': `${BASE_URL}/#organization`,
        name: 'GreenBus',
        url: BASE_URL,
        foundingDate: '2019',
        description: t_about('route_to_europe_text'),
        contactPoint: [
          { '@type': 'ContactPoint', contactType: 'customer support', telephone: '+380987446419', availableLanguage: ['uk', 'ru', 'en'] },
          { '@type': 'ContactPoint', contactType: 'customer support', telephone: '+380996033832', availableLanguage: ['uk', 'ru', 'en'] },
          { '@type': 'ContactPoint', contactType: 'customer support', email: 'greenbus.ukraine@gmail.com', availableLanguage: ['uk', 'ru', 'en'] },
        ],
        sameAs: [
          'https://www.instagram.com/greenbus_ukraine',
          'https://www.tiktok.com/@greenbusukraine',
          'https://x.com/GreenBusUkraine',
          'https://www.facebook.com/greenbus.ukraine',
          'https://t.me/+380987446419',
          'https://wa.me/380987446419',
        ],
      },
      {
        '@type': 'AboutPage',
        url: `${BASE_URL}/${lng}/about/`,
        inLanguage: lng,
        name: t_about('route_to_europe_title'),
        mainEntity: { '@id': `${BASE_URL}/#organization` },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }} />
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
                  alt={t_about('alt_route')}
                  src={irectionWith}
                  priority
                  draggable={false}
                  placeholder="blur"
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
                  <h3 className="mb-2 laptop:mb-4 text-base font-bold leading-6 tracking-normal text-green-200 tablet:text-2xl laptop:text-[32px] laptop:leading-[38.4px]">
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
                  alt={t_about('alt_team')}
                  src={group}
                  draggable={false}
                  placeholder="blur"
                  quality={75}
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
                  alt={t_about('alt_world')}
                  src={world}
                  draggable={false}
                  placeholder="blur"
                  quality={75}
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
                  alt={t_about('alt_business')}
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
        <section className="pt-16">
          <Container size="m">
            <h2 className="mb-6 text-xl font-bold leading-[28.8px] tracking-normal text-slate-700 dark:text-slate-50 laptop:text-[32px] laptop:leading-[38.4px]">
              {t_about('faq_title')}
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
          </Container>
        </section>

        <section className="pt-16">
          <Container size="m">
            <h2 className="mb-4 text-xl font-bold leading-[28.8px] tracking-normal text-slate-700 dark:text-slate-50 laptop:text-[32px] laptop:leading-[38.4px]">
              {t_about('useful_links_title')}
            </h2>
            <div className="flex flex-wrap gap-3">
              {[
                { href: '/routes/', label: t_about('link_routes') },
                { href: '/all-countries/', label: t_about('link_countries') },
                { href: '/faq/bronjuvannja-mists/', label: t_about('link_faq') },
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
              <h3 className="mb-6 text-center text-2xl font-bold tracking-normal leading-[28.8px] laptop:h1 text-slate-700 dark:text-slate-50">
                {t_common('have_an_idea')}
              </h3>
              <ContactForm />
            </CustomCard>
          </Container>
        </section>
      </main>
      <ThirdFooter />
    </>
  );
}
