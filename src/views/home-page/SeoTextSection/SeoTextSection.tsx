import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { Container } from '@/shared/ui/Container';
import { useTranslations } from 'next-intl';

export default function SeoTextSection() {
  const t = useTranslations(MESSAGE_FILES.MAIN_PAGE);

  return (
    <section className="py-12">
      <Container size="m">
        <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-4">{t('seoText.title')}</h2>
        <div className="text-slate-600 dark:text-slate-300 space-y-4 text-sm leading-relaxed">
          <p>{t('seoText.p1')}</p>
          <p>{t('seoText.p2')}</p>
          <p>{t('seoText.p3')}</p>
        </div>
      </Container>
    </section>
  );
}
