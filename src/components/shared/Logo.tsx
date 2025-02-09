import { IconLogo } from "@/components/icons/IconLogo";
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href={'/'}
      className='flex items-center font-mulish text-[26.838px] font-extrabold tracking-normal leading-normal tablet:text-[31.88px] tablet:leading-[33.68px]'
    >
      <div className='w-[38px] h-[47px]'>
        <IconLogo />
      </div>
      <span className='ml-1 text-primary'>Green</span>
      <span className='text-secondary'>Bus</span>
    </Link>
  );
}
