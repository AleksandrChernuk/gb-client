import { CustomCard } from '@/components/shared/CustomCard';
import { Link } from '@/i18n/routing';

type Props = {
  id: string;
  title: string;
  text: string;
  href: string;
};

export default function SearchCard({ title, text, href }: Props) {
  return (
    <CustomCard className="flex flex-col w-full gap-2 dark:bg-dark_main">
      <Link prefetch={false} href={href} className="underline h5 text-primary_1 dark:text-primary_1">
        {title}
      </Link>
      <p className="text-text_prymery secondary_text">{text}</p>
    </CustomCard>
  );
}
