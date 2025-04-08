import Link from 'next/link';
import { ReactNode } from 'react';

interface SupportItemProps {
  title: string;
  icon?: ReactNode;
  src: string;
}

export const SupportItem = ({ title, icon, src }: SupportItemProps) => {
  return (
    <Link prefetch={false} href={src} className="flex flex-row items-center gap-1">
      <div>{icon && icon}</div>
      <div className="text-sm font-normal tracking-normal leading-[21px] text-slate-50 dark:text-black">{title}</div>
    </Link>
  );
};
