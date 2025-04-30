import { cn } from '@/lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      className={cn(
        `flex h-auto w-full rounded-md border border-slate-200 dark:border-slate-700 dark:hover:bg-black  dark:hover:border-slate-700 dark:focus:bg-slate-600 dark:focus:border-slate-900  bg-background px-4 py-3 text-base font-normal leading-6 tracking-normal text-slate-700 dark:text-slate-50 disabled:cursor-not-allowed disabled:opacity-50 outline-hidden hover:bg-slate-50 hover:border-slate-200 focus:border-slate-700 focus:bg-white
         aria-invalid:ring-[#de2a1a] dark:aria-invalid:ring-[#de2a1a]
         aria-invalid:border-[#de2a1a] dark:aria-invalid:border-[#de2a1a]`,
        className,
      )}
      {...props}
    />
  );
}

export { Input };
