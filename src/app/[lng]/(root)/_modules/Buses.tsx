import { Container } from '@/components/shared/Container';
import { Button } from '@/components/ui/button';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

import aTravellerImage from '@/assets/images/a-traveller-on-the-street-with-a-suitcase-looking.avif';
import { MESSAGE_FILES } from '@/constans/message.file.constans';

export default async function Buses() {
  const t = await getTranslations(MESSAGE_FILES.MAIN_PAGE);
  const t_img_alts = await getTranslations(MESSAGE_FILES.IMG_ALTS);

  return (
    <section className="pb-8 tablet:pb-16">
      <Container size="m">
        <ul className="justify-between min-h-full gap-5 tablet:flex laptop:gap-40">
          <li className="relative overflow-hidden rounded-3xl w-[350px] h-[353px] mb-8 tablet:order-2 tablet:mb-0 mx-auto">
            <Image
              alt={t_img_alts('buses')}
              src={aTravellerImage}
              fill
              placeholder="blur"
              sizes="100vw"
              style={{
                objectFit: 'contain',
              }}
            />
          </li>
          <li className="flex flex-col tablet:w-1/2">
            <h3 className="mb-4 text-2xl font-bold tracking-normal leading-[28.8px] laptop:text-[32px] laptop:leading-[38.4px] laptop:mb-8 text-slate-700 dark:text-slate-50">
              {t('buses_title')}
            </h3>
            <p className="mb-4 text-base font-normal leading-6 tracking-normal text-slate-400 dark:text-slate-200">
              {t('buses_description')}
            </p>

            <div className="mt-auto ml-auto tablet:ml-0">
              <Button variant={'default'} size={'secondary'}>
                {t('buses_button')}
              </Button>
            </div>
          </li>
        </ul>
      </Container>
    </section>
  );
}
