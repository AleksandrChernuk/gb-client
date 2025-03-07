'use client';

import { CustomCard } from '@/components/shared/CustomCard';
import { Link } from '@/i18n/routing';

type Props = {
  id: string;
  title: string;
  text: string;
  href: string;
};

export default function PrewAccordion({ title, text, href }: Props) {
  return (
    <CustomCard className="flex flex-col w-full gap-2 dark:bg-dark_main">
      <Link href={href} className="underline text-primary_1 dark:text_prymery">
        {title}
      </Link>
      <p className="text-text_secondary">{text}</p>
    </CustomCard>
  );
}
