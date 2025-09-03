import { Container } from '@/components/shared/Container';
import { MESSAGE_FILES } from '@/config/message.file.constans';
import { renderDocumentHtml } from '@/lib/renderDocumentHtml';
import { getTranslations } from 'next-intl/server';

export default async function PrivacyPolicyPage() {
  const t = await getTranslations(MESSAGE_FILES.PRIVACY_POLICY);
  const textObj = t.raw('text') as Record<string, string>;
  const html = renderDocumentHtml(textObj);

  return (
    <section>
      <Container size="l">
        <div className="py-10 text-slate-700 dark:text-slate-50">
          <h1 className="mb-4">{t('title')}</h1>
          <h5 className="mb-4">{t('intro')}</h5>
          <div className="space-y-2" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </Container>
    </section>
  );
}
