import { Link } from '@/shared/i18n/routing';
import CustomCard from '@/shared/ui/CustomCard';

type Props = {
  id: string;
  title: string;
  text: string;
  href: string;
};

export default function SearchCard({ title, text, href }: Props) {
  return (
    <CustomCard className="flex flex-col w-full gap-2 dark:bg-slate-800">
      <Link prefetch={false} href={href} className="hover:cursor-pointer hover:underline  dark:text-green-200">
        <span className="text-base font-bold leading-6 tracking-normal text-green-200 "> {title}</span>
        <p className="text-slate-700 dark:text-slate-50 text-sm font-normal tracking-normal leading-5.25">{text}</p>
      </Link>
    </CustomCard>
  );
}
