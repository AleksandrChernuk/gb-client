import { ReactNode } from "react";

export const StartIcon = ({ icon }: { icon: ReactNode }) => {
  return (
    <div className="absolute transform -translate-y-1/2 pointer-events-none left-1 tablet:left-2 laptop:left-5 top-1/2">
      {icon}
    </div>
  );
};
