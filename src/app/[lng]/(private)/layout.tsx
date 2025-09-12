export const dynamic = 'force-dynamic';
export const revalidate = 0;

import ThirdFooter from '@/components/modules/footer/ThirdFooter';
import AuthHeader from '@/components/modules/header/AuthHeader';
import { Container } from '@/components/shared/Container';
import LogOutProfileBtn from '@/components/shared/LogOutProfileBtn';
import ProfileAvatar from '@/components/shared/ProfileAvatar';
import ProfileMobileNav from '@/components/shared/ProfileMobileNav';
import ProfileNavTabs from '@/components/shared/ProfileNavTabs';
import { MESSAGE_FILES } from '@/config/message.file.constans';
import { profile_links } from '@/constans/profile.nav.links';
import { AuthGuardProvider } from '@/providers/AuthGuardProvider';
import { Params } from '@/types/common.types';
import { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';

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
    title: t('profile.title'),
    description: t('profile.description'),
    keywords: t('profile.keywords'),

    appleWebApp: {
      title: 'GreenBus',
      capable: true,
      statusBarStyle: 'default',
    },

    manifest: '/manifest.json',

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

    metadataBase: new URL('https://greenbus.com.ua'),

    alternates: {
      canonical: `/${lng}/profile`,
      languages: {
        'x-default': '/uk/profile',
        uk: '/uk/profile',
        en: '/en/profile',
        ru: '/ru/profile',
      },
    },

    openGraph: {
      images: '/logo.png',
    },
  };
}

const ProfileLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthGuardProvider>
      <div className="flex flex-col h-svh">
        <AuthHeader />
        <main className="bg-slate-50 dark:bg-slate-900 py-2 tablet:py-10 flex-1">
          <Container size="l" className="w-full">
            <div className="flex-1 flex flex-col tablet:flex-row gap-8 tablet:gap-10 laptop:gap-12 pb-8">
              <ProfileNavTabs items={profile_links} namespace={MESSAGE_FILES.PROFILE} />
              <div className="flex-1">
                <div className="flex items-center justify-between gap-4 mb-4 laptop:mb-10">
                  <ProfileMobileNav items={profile_links} namespace={MESSAGE_FILES.PROFILE} />
                  <ProfileAvatar className="hidden tablet:flex tablet:items-center tablet:justify-baseline tablet:gap-2" />
                  <LogOutProfileBtn />
                </div>
                <div>{children}</div>
              </div>
            </div>
          </Container>
        </main>
        <ThirdFooter />
      </div>
    </AuthGuardProvider>
  );
};

export default ProfileLayout;
