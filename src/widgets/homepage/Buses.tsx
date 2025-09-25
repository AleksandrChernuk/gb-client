import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

import aTravellerImage from '@/assets/images/a-traveller-on-the-street-with-a-suitcase-looking.avif';
import Link from 'next/link';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { Container } from '@/shared/ui/Container';
import { AspectRatio } from '@/shared/ui/aspect-ratio';
import { Button } from '@/shared/ui/button';

export default async function Buses() {
  const t = await getTranslations(MESSAGE_FILES.MAIN_PAGE);
  const t_img_alts = await getTranslations(MESSAGE_FILES.IMG_ALTS);

  return (
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
  );
}
