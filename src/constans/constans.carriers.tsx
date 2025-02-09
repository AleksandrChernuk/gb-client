import { IconEastExpress } from "@/components/icons/IconEastExpress";
import { IconEastWestEurolines } from "@/components/icons/IconEastWestEurolines";
import { IconEuroClub } from "@/components/icons/IconEuroClub";
import { IconGrandesTour } from "@/components/icons/IconGrandesTour";
import { IconKLR } from "@/components/icons/IconKLR";
import { IconMusilTuor } from "@/components/icons/IconMusilTuor";
import { IconOrionBus } from "@/components/icons/IconOrionBus";
import { IconR } from "@/components/icons/IconR";
import { IconTrunsTempo } from "@/components/icons/IconTrunsTempo";
import { IconWgrand } from "@/components/icons/IconWgrand";
import { ReactNode } from "react";

export type Tcarriers = {
  id: string;
  icon: ReactNode;
};

export const carriers = [
  {
    id: "1",
    icon: <IconMusilTuor />,
  },
  {
    id: "2",
    icon: <IconTrunsTempo />,
  },
  {
    id: "3",
    icon: <IconWgrand />,
  },
  {
    id: "4",
    icon: <IconEuroClub />,
  },
  {
    id: "5",
    icon: <IconEastWestEurolines />,
  },
  {
    id: "6",
    icon: <IconGrandesTour />,
  },
  {
    id: "7",
    icon: <IconEastExpress />,
  },
  {
    id: "8",
    icon: <IconOrionBus />,
  },
  {
    id: "9",
    icon: <IconR />,
  },
  {
    id: "10",
    icon: <IconKLR />,
  },
];

