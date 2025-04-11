import Image from 'next/image';
import loader from '@/assets/images/loader.gif';
import loaderdark from '@/assets/images/loaderdark.gif';

export const Loader = () => {
  return (
    <div className="flex items-center justify-center my-2">
      <Image
        src={loader}
        alt="Loading..."
        height={200}
        width={200}
        priority
        unoptimized
        className="dark:hidden"
        sizes="100vw"
      />
      <Image
        src={loaderdark}
        alt="Loading..."
        priority
        unoptimized
        height={200}
        width={200}
        className="hidden dark:block"
        sizes="100vw"
      />
    </div>
  );
};
