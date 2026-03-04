// import MainSearch from '@/features/route-search-form';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { Container } from '@/shared/ui/Container';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import desc from '@/assets/images/avtobusni-kvytky-online-desktop.webp';
import mob from '@/assets/images/avtobusni-kvytky-online-mobile.webp';
import MainSearch from '@/features/route-search-form';

export default async function HeroSection() {
  const t = await getTranslations(MESSAGE_FILES.MAIN_PAGE);
  const t_img_alts = await getTranslations(MESSAGE_FILES.IMG_ALTS);

  return (
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
        quality={75}
        sizes="100vw"
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
        quality={75}
        sizes="100vw"
      />
      <Container size="l" className="-mt-10">
        <h1 className="sr-only">{t('herow_title')}</h1>
        <MainSearch />
      </Container>
    </section>
  );
}
