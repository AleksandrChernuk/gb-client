import { cn } from "@/lib/utils";
type TIconSupportArrow = {
  className: string;
};

export const IconSupportArrow = ({ className }: TIconSupportArrow) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="44"
      height="23"
      viewBox="0 0 44 23"
      fill="none"
      className={cn(className, "stroke-bw")}
    >
      <path
        d="M1.96934 21.9994C1.52006 21.9994 1.29875 21.4529 1.62143 21.1403L21.8537 1.53893C22.0489 1.34982 22.3594 1.35126 22.5528 1.54216L42.4143 21.1436C42.7325 21.4576 42.5101 21.9994 42.0631 21.9994L22.2081 21.9994L1.96934 21.9994Z"
        fill="white"
        className={"stroke-bw"}
      />
    </svg>
  );
};
