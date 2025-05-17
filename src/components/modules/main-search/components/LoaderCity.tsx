import { IconLoader } from '@/components/icons/IconLoader';

export const LoaderCity = () => {
  return (
    <div className="flex size-12 items-center justify-center gap-1 body_medtext-base font-medium tracking-normal leading-[24px] text-slate-700 dark:text-slate-50 tablet:min-w-[397px] py-4">
      <IconLoader />
    </div>
  );
};
