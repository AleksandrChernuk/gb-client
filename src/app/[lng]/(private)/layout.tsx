import AuthHeader from '@/components/modules/header/AuthHeader';
import { AuthGuardProvider } from '@/providers/AuthGuardProvider';

export default async function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuardProvider>
      <div className="flex flex-col h-svh">
        <AuthHeader />
        {children}
      </div>
    </AuthGuardProvider>
  );
}
