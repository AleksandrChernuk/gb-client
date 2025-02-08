import React from "react";

export default async function NotFoundLayout({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col h-screen">{children}</div>;
}
