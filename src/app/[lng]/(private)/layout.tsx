import AuthHeader from '@/components/modules/header/AuthHeader';
import { Container } from '@/components/shared/Container';
import { NavTabs } from '@/components/shared/NavTabs';
import { MESSAGE_FILES } from '@/constans/message.file.constans';
import { AuthGuardProvider } from '@/providers/AuthGuardProvider';

const items = [
  { slug: '/profile/orders', title: 'ordersTitle' },
  { slug: '/profile/histori', title: 'historiTitle' },
  { slug: '/profile', title: 'settingsTitle' },
];

export default async function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuardProvider>
      <div className="flex flex-col h-svh">
        <AuthHeader />

        <Container size="m" className="w-full">
          <div className="w-full py-2 tablet:py-10">
            <div className="flex-1 flex flex-col tablet:flex-row gap-4 tablet:gap-8 laptop:gap-10">
              <NavTabs items={items} namespace={MESSAGE_FILES.PROFILE} />
              <div className="flex-1">{children}</div>
            </div>
          </div>
        </Container>
      </div>
    </AuthGuardProvider>
  );
}
