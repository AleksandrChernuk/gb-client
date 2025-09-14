import CustomCard from '@/components/shared/CustomCard';
import { Link } from '@/i18n/routing';

type Props = {
  id: string;
  title: string;
  text: string;
  href: string;
};

export default function SearchCard({ title, text, href }: Props) {
  return (
    <CustomCard className="flex flex-col w-full gap-2 dark:bg-slate-800">
      <Link
        prefetch={false}
        href={href}
        className="text-base font-bold leading-6 tracking-normal text-green-300 underline dark:text-green-300"
      >
        {title}
      </Link>
      <p className="text-slate-700 dark:text-slate-50 text-sm font-normal tracking-normal leading-[21px]">{text}</p>
    </CustomCard>
  );
}
