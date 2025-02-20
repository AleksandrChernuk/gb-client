import MainHeader from "@/components/modules/header/MainHeader";
import { Params } from "@/types/common.types";

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Params;
}>) {
  const { lng } = await params;

  return (
    <div className='   flex flex-col h-screen'>
      <MainHeader locale={lng} />
      {children}
    </div>
  );
}
