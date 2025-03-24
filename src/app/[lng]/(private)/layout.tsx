import MainHeader from '@/components/modules/header/MainHeader';

export default async function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-screen">
      <MainHeader />
      {children}
    </div>
  );
}
