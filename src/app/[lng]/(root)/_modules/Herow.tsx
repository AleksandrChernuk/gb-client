/* eslint-disable @next/next/no-img-element */
import MainSearch from '@/components/modules/main-search';
import { Container } from '@/components/shared/Container';
import { getTranslations } from 'next-intl/server';

export default async function Herow() {
  const t_img_alts = await getTranslations('img_alts');
  const t_main = await getTranslations('main');

  return (
    <section className="relative">
      <picture>
        <source media="(max-width:767px)" srcSet="/images/mob_full.avif 1x, /images/mob_full_2x.avif 2x" />
        <source media="(min-width:768px)" srcSet="/images/desc_full.avif 1x, /images/desc_full_2x.avif 2x" />
        <img src={`/images/desc_full_2x.avif?q=100`} className="w-full h-auto" alt={t_img_alts('herow')} />
      </picture>

      <Container size="l" className="-mt-10">
        <div>
          <h1 className="sr-only">{t_main('herow_title')}</h1>
          <MainSearch />
        </div>
      </Container>
    </section>
  );
}
