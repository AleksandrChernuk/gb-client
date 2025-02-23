import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-light_primary dark:bg-black_2_for_text',
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
