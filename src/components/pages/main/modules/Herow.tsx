import MainSearch from '@/components/modules/main-search';
import { Container } from '@/components/shared/Container';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import desc from '@/assets/images/desc_full_2x.avif';
import mob from '@/assets/images/mob_full_2x.avif';
import { MESSAGE_FILES } from '@/config/message.file.constans';

export default async function Herow() {
  const t_img_alts = await getTranslations(MESSAGE_FILES.IMG_ALTS);
  const t_main = await getTranslations(MESSAGE_FILES.MAIN_PAGE);

  return (
    <section className="relative">
      <Image
        src={mob}
        alt={t_img_alts('herow')}
        placeholder="blur"
        width={740}
        height={233}
        className="tablet:hidden w-dvw h-auto"
        priority
        loading="eager"
        decoding="sync"
        quality={80}
      />
      <Image
        src={desc}
        alt={t_img_alts('herow')}
        placeholder="blur"
        width={1240}
        height={233}
        className="hidden tablet:block w-dvw h-auto"
        priority
        loading="eager"
        decoding="sync"
        quality={80}
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
