import { Container } from '@/components/shared/Container';
import { MESSAGE_FILES } from '@/constans/message.file.constans';
import { getTranslations } from 'next-intl/server';

export default async function BlogPage() {
  const t = await getTranslations(MESSAGE_FILES.COMMON);
  return (
    <main className="bg-slate-50 dark:bg-slate-900 flex-1">
      <section className="pt-10 laptop:pt-20">
        <Container size="m" className="text-center">
          <h1 className="text-xs laptop:text-2xl tracking-normal text-slate-700 dark:text-slate-50">
            {t('page_in_progress')}
          </h1>
        </Container>
      </section>
    </main>
  );
}
