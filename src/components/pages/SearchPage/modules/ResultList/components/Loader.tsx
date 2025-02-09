 
import Image from "next/image";
import loader from "../../../images/loader.gif"
import loaderdark from "../../../images/loaderdark.gif";



export const Loader = () => {
  return (
    <div className='flex items-center justify-center my-2'>
      <Image
        src={loader}
        alt='Loading...'
        height={200}
        width={200}
        priority
        unoptimized
        className='dark:hidden'
      />
      <Image
        src={loaderdark}
        alt='Loading...'
        priority
        unoptimized
        height={200}
        width={200}
        className='hidden dark:block'
      />
    </div>
  );
};
