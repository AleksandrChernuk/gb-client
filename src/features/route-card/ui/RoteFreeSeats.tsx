export const RoteFreeSeats = ({ title, seats }: { title: string; seats: number }) => {
  return (
    <div className="hidden justify-self-center tablet:flex items-center gap-0.5 tablet:order-3 tablet:justify-self-end">
      <span className="text-slate-400 dark:text-slate-200 text-xs font-normal tracking-normal leading-[18px]">
        {title}:
      </span>
      <p className="break-all text-xs font-normal tracking-normal leading-[18px] text-slate-700 dark:text-slate-50">
        {seats}
      </p>
    </div>
  );
};
