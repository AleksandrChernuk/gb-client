import MainSearch from '@/components/modules/main-search';
import { Container } from '@/components/shared/Container';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import desc from '@/assets/images/desc_full_2x.avif';
import mob from '@/assets/images/mob_full_2x.avif';

export default async function Herow() {
  const t_img_alts = await getTranslations('img_alts');
  const t_main = await getTranslations('main');

  return (
    <section className="relative">
      <Image
        src={mob}
        alt={t_img_alts('herow')}
        placeholder="blur"
        width={740}
        height={233}
        priority
        sizes="100vw"
        className="tablet:hidden"
        style={{
          width: '100%',
          height: 'auto',
        }}
      />
      <Image
        src={desc}
        alt={t_img_alts('herow')}
        placeholder="blur"
        width={1240}
        height={233}
        priority
        className="hidden tablet:block"
        sizes="100vw"
        style={{
          width: '100%',
          height: 'auto',
        }}
      />

      <Container size="l" className="-mt-10">
        <div>
          <h1 className="sr-only">{t_main('herow_title')}</h1>
          <MainSearch />
        </div>
      </Container>
    </section>
  );
}
