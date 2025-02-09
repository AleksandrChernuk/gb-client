import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
};

export const CustomCard = ({ children, className }: Props) => {
  return (
    <div
      className={cn(
        'p-4 tablet:p-6 bg-card_bg_primery shadow-(--shadow-custom) rounded-2xl',
        className
      )}
    >
      {children}
    </div>
  );
};

 