import MainHeader from '@/components/modules/header/MainHeader';
import { Container } from '@/components/shared/Container';
import { Button } from '@/components/ui/button';
import { MESSAGE_FILES } from '@/constans/message.file.constans';
import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  return {
    robots: {
      index: false,
      follow: false,
      nocache: false,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function NotFoundPage() {
  const t = await getTranslations(MESSAGE_FILES.COMMON);

  return (
    <div className="flex flex-col h-svh">
      <MainHeader />
      <main className="grow flex flex-col items-center justify-center">
        <section className="py-5">
          <Container size="l" className="w-full">
            <h1 className="text-[32px] font-bold tracking-normal leading-[38.4px] mb-4">{t('notFoundTitle')}</h1>
            <Button asChild size={'primery'}>
              <Link href={'/'}>{t('mainPageBtn')}</Link>
            </Button>
          </Container>
        </section>
      </main>
    </div>
  );
}
