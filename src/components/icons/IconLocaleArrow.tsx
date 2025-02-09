import { cn } from "@/lib/utils";

type TIconSupportArrow = {
  className: string;
};

export const IconLocaleArrow = ({ className }: TIconSupportArrow) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M6 9L12 15L18 9"
        className={cn(className, "stroke-bw")}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
