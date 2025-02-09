import { Skeleton } from "@/components/ui/skeleton";

export const MainSearchSkeleton = () => {
  return (
    <div className='relative overflow-hidden flex flex-col tablet:flex-row rounded-2xl bg-white dark:bg-dark_mode_main1 shadow-[0_4px_10px_0_rgba(0,0,0,0.1)]'>
      <div className='flex flex-col tablet:flex-row tablet:items-center p-4 tablet:px-4 tablet:py-3 tablet:gap-[25px] laptop:gap-10 w-full'>
        <Skeleton className='h-[42px] tablet:h-[58px] laptop:h-[55.6px] w-full bg-light_primary dark:bg-black_2_for_text' />
        <Skeleton className='h-[1px] tablet:hidden my-2 w-full bg-light_primary dark:bg-black_2_for_text' />

        <Skeleton className='h-[42px] tablet:h-[58px]  laptop:h-[55.6px] w-full bg-light_primary dark:bg-black_2_for_text' />
        <Skeleton className='h-[1px] tablet:hidden my-2 w-full bg-light_primary dark:bg-black_2_for_text' />

        <Skeleton className='h-[42px] tablet:h-[58px]  laptop:h-[55.6px] w-full  bg-light_primary dark:bg-black_2_for_text' />
        <Skeleton className='h-[1px] tablet:hidden my-2 w-full bg-light_primary dark:bg-black_2_for_text ' />

        <Skeleton className='h-[42px] tablet:h-[58px]  laptop:h-[55.6px] w-full bg-light_primary dark:bg-black_2_for_text' />
      </div>
      <Skeleton className='tablet:min-w-[120px] laptop:min-w-[187px] laptop:max-w-[187px] min-h-[56px] laptop:min-h-[87.6] tablet:min-h-[90px] bg-light_primary dark:bg-black_2_for_text rounded-none rounded-br-[16px] rounded-bl-[16px] tablet:rounded-tl-none tablet:rounded-tr-[16px] tablet:rounded-bl-none' />
    </div>
  );
};
