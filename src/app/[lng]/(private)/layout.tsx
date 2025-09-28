export const dynamic = 'force-dynamic';
export const revalidate = 0;

import ThirdFooter from '@/widgets/footer/ThirdFooter';
import AuthHeader from '@/widgets/header/AuthHeader';

import { AuthGuardProvider } from '@/shared/providers/AuthGuardProvider';
import { Params } from '@/shared/types/common.types';
import { Locale } from 'next-intl';
import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { Container } from '@/shared/ui/Container';
import ProfileNavTabs from '@/entities/profile/ProfileNavTabs';
import { profile_links } from '@/shared/constans/profile.nav.links';
import ProfileMobileNav from '@/entities/profile/ProfileMobileNav';
import ProfileAvatar from '@/entities/profile/ProfileAvatar';
import LogOutProfileBtn from '@/entities/profile/LogOutProfileBtn';
import { generatePrivatePageMetadata } from '@/shared/lib/metadata';

type Props = {
  params: Params;
};

export async function generateMetadata({ params }: Props) {
  const { lng } = (await params) as { lng: Locale };
  return generatePrivatePageMetadata({
    lng,
    namespace: MESSAGE_FILES.METADATA,
    slug: 'profile',
    path: 'profile',
  });
}

const ProfileLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthGuardProvider>
      <div className="flex flex-col min-h-svh supports-[min-height:100dvh]:min-h-dvh">
        <AuthHeader />
        <main className="bg-slate-50 dark:bg-slate-900 py-2 tablet:py-10 flex-1 flex flex-col">
          <Container size="l" className="w-full flex flex-col flex-1 min-h-0">
            <div className="flex flex-col tablet:flex-row gap-8 laptop:gap-12 pb-8 flex-1 min-h-0">
              <ProfileNavTabs items={profile_links} namespace={MESSAGE_FILES.PROFILE} />
              <div className="flex-1 flex flex-col min-h-0">
                <div className="flex items-center justify-between gap-4 mb-4 laptop:mb-10">
                  <ProfileMobileNav items={profile_links} namespace={MESSAGE_FILES.PROFILE} />
                  <ProfileAvatar className="hidden tablet:flex tablet:items-center tablet:gap-2" />
                  <LogOutProfileBtn />
                </div>
                <div className="flex flex-col flex-1 min-h-0">{children}</div>
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
