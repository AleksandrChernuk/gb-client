import AuthHeader from '@/components/modules/header/AuthHeader';
import { Container } from '@/components/shared/Container';
import { MobileNavTabs } from '@/components/shared/MobileNavTabs';
import { NavTabs } from '@/components/shared/NavTabs';
import { MESSAGE_FILES } from '@/constans/message.file.constans';
import { profile_links } from '@/constans/profile.nav.links';
import { AuthGuardProvider } from '@/providers/AuthGuardProvider';

export default async function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuardProvider>
      <div className="flex flex-col h-svh">
        <AuthHeader />
        <main className="bg-slate-[#E6E6E6] py-2 tablet:py-10">
          <MobileNavTabs items={profile_links} namespace={MESSAGE_FILES.PROFILE} />
          <Container size="m" className="w-full">
            <div className="w-full ">
              <div className="flex-1 flex flex-col tablet:flex-row gap-4 tablet:gap-8 laptop:gap-10">
                <NavTabs items={profile_links} namespace={MESSAGE_FILES.PROFILE} />

                <div className="flex-1">
                  <div> {children}</div>
                </div>
              </div>
            </div>
          </Container>
        </main>
      </div>
    </AuthGuardProvider>
  );
}
