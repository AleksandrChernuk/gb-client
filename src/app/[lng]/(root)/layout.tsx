export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div>{"lng"}</div>
      {children}
    </div>
  );
}
