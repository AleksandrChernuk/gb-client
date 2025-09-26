import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { generatePrivatePageMetadata } from '@/shared/lib/metadata';
import { renderDocumentHtml } from '@/shared/lib/renderDocumentHtml';
import { Params } from '@/shared/types/common.types';
import { Container } from '@/shared/ui/Container';
import { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type Props = {
  params: Params;
};

export async function generateMetadata({ params }: Props) {
  const { lng } = (await params) as { lng: Locale };
  return generatePrivatePageMetadata({
    lng,
    namespace: MESSAGE_FILES.METADATA,
    slug: 'privacy-policy',
    path: 'privacy-policy',
  });
}

export default async function PrivacyPolicy({
  params,
}: Readonly<{
  params: Params;
}>) {
  const { lng } = await params;

  setRequestLocale(lng as Locale);
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
