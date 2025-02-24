"use client";

import { popularRoutersFakeData } from "@/constans/constans.popular-routers";
 import RoutersItem from "./RoutersItem";
import { useState } from "react";
import { Button } from "@/components/ui/button";
 
type Props = {
  buttonText: string;
};

export const RoutersList = ({ buttonText }: Props) => {
  const [open, setOpen] = useState(false);

  const initialRouters = popularRoutersFakeData.slice(0, 3);
  const additionalRouters = popularRoutersFakeData.slice(3);

  return (
    <div>
      <ul className="grid grid-cols-1 gap-4 mb-0 laptop:grid-cols-3 laptop:gap-8">
        {initialRouters.map((router) => (
          <li className="w-full" key={router.id}>
            <RoutersItem from={router?.from} to={router?.to} />
          </li>
        ))}

        {open &&
          additionalRouters.map((router) => (
            <li className="w-full" key={router.id}>
              <RoutersItem from={router?.from} to={router?.to} />
            </li>
          ))}
      </ul>

      <div className="text-right laptop:text-center">
        <Button
          variant={"link"}
          onClick={() => setOpen(!open)}
          className="h-auto p-0 mt-4 text-base font-normal text-white"
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};
