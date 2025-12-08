import { Params } from '@/shared/types/common.types';
import { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import aTravellerImage from '@/assets/images/a-traveller-on-the-street-with-a-suitcase-looking.webp';
import desc from '@/assets/images/desc_full_2x.webp';
import mob from '@/assets/images/mob_full_2x.webp';
import Benefits from '@/widgets/homepage/Benefits';
import PopularRoutes from '@/widgets/homepage/PopularRoutes';
import GetStarted from '@/widgets/homepage/GetStarted';
import Questions from '@/widgets/homepage/Questions';
import MainFooter from '@/widgets/footer/MainFooter';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { Button } from '@/shared/ui/button';
import { Link } from '@/shared/i18n/routing';
import Image from 'next/image';
import { Container } from '@/shared/ui/Container';
import { AspectRatio } from '@/shared/ui/aspect-ratio';
import MainSearch from '@/features/route-search-form';
import { generatePublicPageMetadata } from '@/shared/lib/metadata';

type Props = {
  params: Params;
};

export async function generateMetadata({ params }: Props) {
  const { lng } = (await params) as { lng: Locale };
  return await generatePublicPageMetadata({
    lng,
    namespace: MESSAGE_FILES.METADATA,
    slug: 'main',
  });
}
export default async function Home({
  params,
}: Readonly<{
  params: Params;
}>) {
  const { lng } = await params;

  setRequestLocale(lng as Locale);
  const t = await getTranslations(MESSAGE_FILES.MAIN_PAGE);
  const t_img_alts = await getTranslations(MESSAGE_FILES.IMG_ALTS);

  return (
    <>
      <main role="main" className="bg-slate-50 dark:bg-slate-900">
        <section className="relative">
          <Image
            src={mob}
            alt={t_img_alts('herow')}
            placeholder="blur"
            width={740}
            height={233}
            fetchPriority="high"
            className="tablet:hidden w-dvw h-auto"
            priority
            loading="eager"
            decoding="sync"
            quality={75}
          />
          <Image
            src={desc}
            alt={t_img_alts('herow')}
            placeholder="blur"
            width={1240}
            height={233}
            fetchPriority="high"
            className="hidden tablet:block w-dvw h-auto"
            priority
            loading="eager"
            decoding="sync"
            quality={75}
          />

          <Container size="l" className="-mt-10">
            <div>
              <h1 className="sr-only">{t('herow_title')}</h1>
              <MainSearch />
            </div>
          </Container>
        </section>
        <Benefits />
        <section className="pb-8 tablet:pb-16">
          <Container size="m">
            <ul className="justify-between min-h-full gap-5 tablet:flex laptop:gap-40">
              <li className="relative overflow-hidden min-w-0 max-w-[350px] mb-8 tablet:order-2 tablet:mb-0 tablet:w-1/2 mx-auto">
                <AspectRatio ratio={1}>
                  <Image
                    alt={t_img_alts('buses')}
                    src={aTravellerImage}
                    placeholder="blur"
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="rounded-3xl object-contain"
                  />
                </AspectRatio>
              </li>
              <li className="flex flex-col tablet:w-1/2">
                <h3 className="mb-4 text-2xl font-bold tracking-normal leading-[28.8px] laptop:text-[32px] laptop:leading-[38.4px] laptop:mb-8 text-slate-700 dark:text-slate-50">
                  {t('buses_title')}
                </h3>
                <p className="mb-4 text-base font-normal leading-6 tracking-normal text-slate-400 dark:text-slate-200">
                  {t('buses_description')}
                </p>

                <div className="mt-auto ml-auto tablet:ml-0">
                  <Button asChild variant={'default'} size={'secondary'}>
                    <Link href={'/all-countries'} scroll={true}>
                      {t('buses_button')}
                    </Link>
                  </Button>
                </div>
              </li>
            </ul>
          </Container>
        </section>
        <PopularRoutes />
        <GetStarted />
        <Questions />
      </main>
      <MainFooter />
    </>
  );
}
