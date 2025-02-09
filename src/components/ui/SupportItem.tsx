import Link from "next/link";
import { ReactNode } from "react";

interface SupportItemProps {
  title: string;
  icon?: ReactNode;
  src: string;
}

export const SupportItem = ({ title, icon, src }: SupportItemProps) => {
  return (
    <Link href={src} className="flex flex-row items-center gap-1">
      <div>{icon && icon}</div>
      <div className="secondary_text text-search_color">{title}</div>
    </Link>
  );
};

 