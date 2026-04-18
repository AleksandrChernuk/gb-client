import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import aTravellerImage from '@/assets/images/a-traveller-on-the-street-with-a-suitcase-looking.webp';
import { Container } from '@/shared/ui/Container';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { Button } from '@/shared/ui/button';
import { Link } from '@/shared/i18n/routing';
import { AspectRatio } from '@/shared/ui/aspect-ratio';
import { H2 } from '@/shared/ui/H2';

export default async function AllCountries() {
  const t = await getTranslations(MESSAGE_FILES.MAIN_PAGE);

  return (
    <section className="py-6">
      <Container size="m">
        <div className="flex flex-col tablet:flex-row justify-between gap-5 laptop:gap-40">
          <div className="relative w-full max-w-87.5 mb-8 tablet:order-2 tablet:mb-0 tablet:w-1/2 mx-auto">
            {' '}
            <AspectRatio ratio={1}>
              <Image
                alt={t('buses_title')}
                src={aTravellerImage}
                placeholder="blur"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="rounded-3xl object-contain"
              />
            </AspectRatio>
          </div>

          <div className="flex flex-col tablet:w-1/2">
            <H2>{t('buses_title')}</H2>
            <p className="whitespace-pre-line mb-4 text-base font-normal leading-6 tracking-normal text-slate-400 dark:text-slate-200">
              {t('buses_description')}
            </p>
            <div className="mt-auto ml-auto tablet:ml-0">
              <Button asChild variant="default" size="secondary">
                <Link href="/all-countries/">{t('buses_button')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
