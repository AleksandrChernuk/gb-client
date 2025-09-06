import AuthHeader from '@/components/modules/header/AuthHeader';
import { Container } from '@/components/shared/Container';
import LogOutProfileBtn from '@/components/shared/LogOutProfileBtn';
import ProfileAvatar from '@/components/shared/ProfileAvatar';
import ProfileMobileNav from '@/components/shared/ProfileMobileNav';
import ProfileNavTabs from '@/components/shared/ProfileNavTabs';
import { MESSAGE_FILES } from '@/config/message.file.constans';
import { profile_links } from '@/constans/profile.nav.links';
import { AuthGuardProvider } from '@/providers/AuthGuardProvider';

export async function generateMetadata() {
  return {
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
  };
}

const ProfileLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthGuardProvider>
      <div className="flex flex-col h-svh">
        <AuthHeader />
        <main className="bg-slate-[#E6E6E6] py-2 tablet:py-10">
          <Container size="m" className="w-full">
            <div className="w-full">
              <div className="flex-1 flex flex-col tablet:flex-row gap-4 tablet:gap-8 laptop:gap-10">
                <ProfileNavTabs items={profile_links} namespace={MESSAGE_FILES.PROFILE} />
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-4 mb-4 tablet:text-right ">
                    <ProfileMobileNav items={profile_links} namespace={MESSAGE_FILES.PROFILE} />
                    <ProfileAvatar className="hidden tablet:flex tablet:items-center tablet:justify-baseline tablet:gap-2" />
                    <LogOutProfileBtn />
                  </div>
                  <div>{children}</div>
                </div>
              </div>
            </div>
          </Container>
        </main>
      </div>
    </AuthGuardProvider>
  );
};

export default ProfileLayout;
