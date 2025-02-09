import Link from "next/link";
import { IconsProfile } from '../icons/IconsProfile';

type IProfile = {
  isMobile?: boolean;
  locale: string;
};

export const ProfileLink = async ({ isMobile }: IProfile) => {
  return (
    <Link
      href={'/signin'}
      className='flex flex-row items-center gap-1 text-base font-medium text-black transition-all group hover:text-gray_medium active:text-gray_medium dark:text-grayy hover:underline hover:text-gray_3'
    >
      <span className={`${!isMobile && 'group-hover:fill-gray_medium bg-gray_1 rounded-full p-1'}`}>
        <IconsProfile
          className={`${
            isMobile
              ? 'stroke-primary_1'
              : 'w-5 h-5  stroke-black group-hover:stroke-gray_3 transition-all'
          }`}
        />
      </span>
      <span className={`${!isMobile && 'hidden laptop:block'}`}>{'mainNavProfileLink'}</span>
    </Link>
  );
};
