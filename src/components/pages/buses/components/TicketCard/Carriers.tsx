import { IconCarriersBus } from '@/components/pages/buses/icons/IconCarriersBus';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const Carriers = ({ children }: Props) => {
  return (
    <div className="flex items-center gap-2 small_text text-text_prymery shrink grow-0 text-nowrap">
      <div className="w-[45px] h-[16px] tablet:w-[70px] tablet:h-[24px] grow-0">
        <IconCarriersBus />
      </div>

      <span className="block text-[10px] tablet:small_text break-all text-text_prymery">{children}</span>
    </div>
  );
};
