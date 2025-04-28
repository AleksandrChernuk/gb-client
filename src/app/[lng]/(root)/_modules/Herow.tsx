import MainSearch from '@/components/modules/main-search';
import { Container } from '@/components/shared/Container';
import desc from '@/assets/images/desc_full_2x.avif';
import mob from '@/assets/images/mob_full_2x.avif';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

export default async function Herow() {
  const t_img_alts = await getTranslations('img_alts');
  const t_main = await getTranslations('main');

  return (
    <section className="relative">
      <>
        <Image
          src={mob}
          alt={t_img_alts('herow')}
          width={768}
          height={233}
          priority
          placeholder="blur"
          sizes="100vw"
          draggable={false}
          className="w-full h-auto tablet:hidden"
        />
        <Image
          src={desc}
          alt={t_img_alts('herow')}
          width={1440}
          height={233}
          priority
          placeholder="blur"
          sizes="100vw"
          draggable={false}
          className="w-full h-auto hidden tablet:block"
        />
      </>

      <Container size="l" className="-mt-10">
        <div>
          <h1 className="sr-only">{t_main('herow_title')}</h1>
          <MainSearch />
        </div>
      </Container>
    </section>
  );
}
