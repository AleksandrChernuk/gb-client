type Props = {
  price: number;
  currency: string;
  distount?: boolean;
};

export const RoutePricing = ({ price, currency, distount }: Props) => {
  return (
    <p
      className={`text-2xl font-medium tracking-normal leading-[28.8px] laptop:text-[32px] laptop:leading-[38.4px] text-slate-700 dark:text-slate-50 lining-nums ${distount && 'text-red-400'}`}
    >
      {price}
      <span className="text-xs ml-[2px]">{currency}</span>
    </p>
  );
};
