import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { generatePublicPageMetadata } from '@/shared/lib/metadata';
import { Params } from '@/shared/types/common.types';
import { Container } from '@/shared/ui/Container';
import AcriclesList from '@/widgets/acricles-list';
import MainFooter from '@/widgets/footer/MainFooter';
import { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type Props = {
  params: Params;
};

export async function generateMetadata({ params }: Props) {
  const { lng } = (await params) as { lng: Locale };
  return await generatePublicPageMetadata({
    lng,
    namespace: MESSAGE_FILES.METADATA,
    slug: 'blog',
    path: 'blog',
  });
}

export default async function Blog({
  params,
}: Readonly<{
  params: Params;
}>) {
  const { lng } = await params;
  setRequestLocale(lng as Locale);

  const t = await getTranslations(MESSAGE_FILES.COMMON);

  return (
    <>
      <main className="bg-slate-50 dark:bg-slate-900 flex-1">
        <section className="py-10 laptop:py-20">
          <Container size="m">
            <h1 className="mb-4">{t('articles_title')}</h1>
            <AcriclesList />
          </Container>
        </section>
      </main>
      <MainFooter />
    </>
  );
}
