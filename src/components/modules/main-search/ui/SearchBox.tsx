import { ReactNode } from "react";

export const SearchBox = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className={`relative rounded-2xl bg-white dark:bg-dark_mode_main1 shadow-[0_4px_10px_0_rgba(0,0,0,0.1)]`}
    >
      {children}
    </div>
  );
};
