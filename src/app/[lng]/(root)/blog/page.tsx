import { BASE_URL } from '@/shared/configs/constants';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { generatePublicPageMetadata } from '@/shared/lib/metadata';
import { buildBreadcrumbSchema } from '@/shared/seo/breadcrumbs.schema';
import { Params } from '@/shared/types/common.types';
import { BreadcrumbSimple } from '@/shared/ui/BreadcrumbSimple';
import { Container } from '@/shared/ui/Container';
import { H1 } from '@/shared/ui/H1';
import Main from '@/shared/ui/Main';
import Section from '@/shared/ui/Section';
import AcriclesList from '@/widgets/acricles-list';
import MainFooter from '@/widgets/footer/MainFooter';
import { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Script from 'next/script';

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

  const breadcrumbSchema = buildBreadcrumbSchema(
    [
      {
        name: t('breadcrumb_main'),
        url: `${BASE_URL}/${lng}`,
      },
      {
        name: t('breadcrumb_blog'),
        url: `${BASE_URL}/${lng}/blog`,
      },
    ],
    lng,
  );

  return (
    <>
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Main>
        <Section>
          <Container size="m">
            <div className="mb-2 flex items-center justify-between gap-2">
              <BreadcrumbSimple
                items={[
                  { label: t('breadcrumb_main'), href: '/' },
                  { label: t('breadcrumb_blog'), href: '/blog' },
                ]}
              />
            </div>
            <H1>{t('articles_title')}</H1>
            <AcriclesList />
          </Container>
        </Section>
      </Main>
      <MainFooter />
    </>
  );
}
