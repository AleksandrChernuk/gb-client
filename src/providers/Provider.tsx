import React, { ReactNode } from "react";
import ReactQueryContext from "./ReactQueryProvider";
import ThemeProvider from "./ThemeProvider";

export default function Provider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <ReactQueryContext>{children}</ReactQueryContext>
    </ThemeProvider>
  );
}
