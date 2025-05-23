import Image from 'next/image';
import loaderdark from '@/assets/loader_green.gif';

export const BusLoader = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <Image src={loaderdark} alt="Loading..." height={200} width={200} priority unoptimized draggable={false} />
    </div>
  );
};
