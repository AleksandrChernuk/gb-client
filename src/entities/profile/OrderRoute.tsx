import { LuRoute } from 'react-icons/lu';

type Props = {
  fromCityName: string;
  toCityName: string;
};

export const OrderRoute = ({ fromCityName, toCityName }: Props) => {
  return (
    <div className="flex items-center gap-2 flex-wrap subpixel-antialiased">
      <p
        className={`text-xl tablet:text-2xl font-medium tracking-normal tablet:leading-6 ext-slate-700 dark:text-slate-50`}
      >
        {fromCityName}
      </p>
      <LuRoute aria-hidden className="shrink-0 text-green-200 dark:text-green-200" />
      <p
        className={`text-xl tablet:text-2xl font-medium tracking-normal tablet:leading-6 ext-slate-700 dark:text-slate-50`}
      >
        {toCityName}
      </p>
    </div>
  );
};
