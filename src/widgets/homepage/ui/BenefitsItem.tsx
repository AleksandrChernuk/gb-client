import { ReactNode } from 'react';

interface IBenefitsItemProps {
  icon: ReactNode;
  title: string;
  text: string;
}

export default function BenefitsItem({ icon, title, text }: IBenefitsItemProps) {
  return (
    <li>
      <ul className="space-y-2">
        <li className="w-14 h-14 tablet:w-16 tablet:h-16 laptop:w-[72px] laptop:h-[72px]">{icon}</li>
        <li className="shrink">
          <h3 className="text-base font-bold leading-6 tracking-normal tablet:h3 text-slate-700 dark:text-slate-50 text-nowrap">
            {title}
          </h3>
        </li>
        <li>
          <p className="text-sm font-normal tracking-normal leading-[21px] tablet:text-base tablet:leading-6 text-slate-400 dark:text-slate-200">
            {text}
          </p>
        </li>
      </ul>
    </li>
  );
}
