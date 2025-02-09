"use client";

import { ReactNode } from "react";

type Props = {
  open?: boolean;
  children: ReactNode;
  position?: "left" | "right";
};

export const DropdownWrapper = ({ children, open, position = "left" }: Props) => {
  const isLeft = position === "left";
  return open ? (
    <div
      className={`absolute top-[86px] ${isLeft ? 'left-0' : 'right-0'} z-100 min-w-[310px] max-w-[440px] h-fit overflow-y-auto flex-col gap-2 p-4 rounded-2xl bg-grayy dark:bg-dark_mode_main1 shadow-[0_4px_10px_0_rgba(0,0,0,0.2)] 
    transform transition-transform duration-100 ease-in-out opacity-0 translate-x-[-100%]   ${
      open ? 'opacity-100 translate-x-[0%] ' : ''
    }`}
      onMouseDown={(event) => {
        event.preventDefault();
        event.stopPropagation();
      }}
    >
      {children}
    </div>
  ) : null;
};
