import { CustomCard } from '@/components/shared/CustomCard';
import Image from 'next/image';
import errorImg from '@/assets/images/something-happened-on-the-site.avif';

export default function NoLocations() {
  return (
    <CustomCard className="flex flex-col items-center self-center gap-8 p-5 mx-auto text-center shadow-xs w-fit">
      <div className="relative w-[313px] h-[313px] mx-auto overflow-hidden rounded-3xl">
        <Image src={errorImg} draggable={false} placeholder="blur" alt="peaple wait buses" />
      </div>
    </CustomCard>
  );
}
