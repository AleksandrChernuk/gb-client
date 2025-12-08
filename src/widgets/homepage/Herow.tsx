import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import desc from '@/assets/images/desc_full_2x.webp';
import mob from '@/assets/images/mob_full_2x.webp';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { Container } from '@/shared/ui/Container';
import MainSearch from '@/features/route-search-form';

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
        quality={75}
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
        quality={75}
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
