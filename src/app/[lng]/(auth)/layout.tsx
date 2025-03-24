import AuthHeader from '@/components/modules/header/AuthHeader';
import ThirdFooter from '@/components/modules/footer/ThirdFooter';

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-screen">
      <AuthHeader />
      {children}
      <ThirdFooter />
    </div>
  );
}
