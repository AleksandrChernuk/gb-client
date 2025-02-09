import { FC, PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  className?: string;
  size: "s" | "m" | "l";
}

export const Container: FC<PropsWithChildren<ContainerProps>> = ({ className, size, children }) => {
  const sizeClasses = {
    s: 'max-w-[805px]',
    m: 'max-w-[1156px]',
    l: 'max-w-[1368px]',
  };

  return <div className={cn("mx-auto px-5", sizeClasses[size], className)}>{children}</div>;
};
