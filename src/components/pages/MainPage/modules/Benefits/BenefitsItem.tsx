 import { ReactNode } from "react";

interface IBenefitsItemProps {
  icon: ReactNode;
  title: string;
  text: string;
}

export default function BenefitsItem   ({ icon, title, text }: IBenefitsItemProps)   {
 
  return (
    <li>
      <ul className='space-y-2'>
        <li className='w-14 h-14 tablet:w-16 tablet:h-16 laptop:w-[72px] laptop:h-[72px]'>
          {icon}
        </li>
        <li className='shrink'>
          <h3 className='h5 tablet:h3 text-text_prymery_color text-nowrap'>{title}</h3>
        </li>
        <li>
          <p className='secondary_text tablet:main_text_body text-text_secondary_color'>{text}</p>
        </li>
      </ul>
    </li>
  );
};
