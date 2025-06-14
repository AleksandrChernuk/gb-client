// import BlogPage from '@/components/pages/blog';
import ProfilePage from '@/components/pages/profile/settings';
import { Container } from '@/components/shared/Container';
import { NavTabs } from '@/components/shared/NavTabs';
import { MESSAGE_FILES } from '@/constans/message.file.constans';
import { Params } from '@/types/common.types';
import { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type Props = {
  params: Params;
};

export async function generateMetadata({ params }: Props) {
  const { lng } = (await params) as { lng: Locale };
  const t = await getTranslations({
    locale: lng,
    namespace: MESSAGE_FILES.METADATA,
  });

  return {
    title: t('blog.title'),
    description: t('blog.description'),
    keywords: t('blog.keywords'),

    appleWebApp: {
      title: 'GreenBus',
      capable: true,
      statusBarStyle: 'default',
    },

    manifest: '/manifest.json',

    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    metadataBase: new URL('https://greenbus.com.ua'),

    alternates: {
      canonical: `/${lng}/blog`,
      languages: {
        'x-default': '/uk/blog',
        uk: '/uk/blog',
        en: '/en/blog',
        ru: '/ru/blog',
      },
    },

    openGraph: {
      images: '/logo.png',
    },
  };
}
const items = [
  { slug: '/profile/orders', title: 'ordersTitle' },
  { slug: '/profile/histori', title: 'historiTitle' },
  { slug: '/profile', title: 'settingsTitle' },
];

export default async function Blog({
  params,
}: Readonly<{
  params: Params;
}>) {
  const { lng } = await params;

  setRequestLocale(lng as Locale);
  return (
    <Container size="m" className="w-full">
      <div className="w-full py-2 tablet:py-10">
        <div className="flex-1 flex flex-col tablet:flex-row gap-4 tablet:gap-8 laptop:gap-10">
          <NavTabs items={items} namespace={MESSAGE_FILES.PROFILE} />
          <div className="flex-1">
            <ProfilePage />;
          </div>
        </div>
      </div>
    </Container>
  );
}
