import { AuthGuardProvider } from '@/providers/AuthGuardProvider';

export default async function ProfileLayout({ children }: { children: React.ReactNode }) {
  return <AuthGuardProvider>{children}</AuthGuardProvider>;
}
