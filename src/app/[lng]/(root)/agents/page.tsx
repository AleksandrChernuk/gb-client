import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { generatePublicPageMetadata } from '@/shared/lib/metadata';
import { Params } from '@/shared/types/common.types';
import { Container } from '@/shared/ui/Container';
import { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type Props = {
  params: Params;
};

export async function generateMetadata({ params }: Props) {
  const { lng } = (await params) as { lng: Locale };
  return generatePublicPageMetadata({
    lng,
    namespace: MESSAGE_FILES.METADATA,
    slug: 'agents',
  });
}

export default async function Agents({
  params,
}: Readonly<{
  params: Params;
}>) {
  const { lng } = await params;
  const t = await getTranslations(MESSAGE_FILES.COMMON);

  setRequestLocale(lng as Locale);
  return (
    <main className="bg-slate-50 dark:bg-slate-900 flex-1">
      <section className="pt-10 laptop:pt-20">
        <Container size="m" className="text-center ">
          <h1 className="text-xs laptop:text-2xl tracking-normal text-slate-700 dark:text-slate-50">
            {t('page_in_progress')}
          </h1>
        </Container>
      </section>
    </main>
  );
}
