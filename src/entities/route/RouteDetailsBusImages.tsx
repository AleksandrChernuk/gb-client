import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/pagination';
import { AspectRatio } from '@/shared/ui/aspect-ratio';

type TImages = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

type Props = {
  items: TImages[];
  slidesPerView: number;
  spaceBetween: number;
};

const RouteDetailsBusImages = ({ items, spaceBetween }: Props) => {
  return (
    <div className="flex items-center justify-center w-full mt-2">
      <Swiper
        pagination={{ dynamicBullets: true }}
        modules={[Pagination]}
        className="mySwiper w-full rounded-2xl overflow-hidden"
        style={{ maxWidth: 350 }}
        spaceBetween={spaceBetween}
      >
        {items.map((element, index) => (
          <SwiperSlide key={`${element.alt}-${index}`} className="flex items-center justify-center pb-10">
            <AspectRatio ratio={1} className="bg-inherit rounded-2xl overflow-hidden w-full">
              <Image
                draggable={false}
                src={element.src}
                alt={element.alt}
                width={element.width}
                height={element.height}
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </AspectRatio>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default RouteDetailsBusImages;
