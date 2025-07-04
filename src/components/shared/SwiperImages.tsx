import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import Image from 'next/image';

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

export default function SwiperImages({ items }: Props) {
  return (
    <div className="flex items-center justify-center w-full h-[320px] mt-2">
      <Swiper
        pagination={{ dynamicBullets: true }}
        modules={[Pagination]}
        className="mySwiper w-full h-full rounded-2xl overflow-hidden"
        style={{ maxWidth: 350 }}
        spaceBetween={20}
      >
        {items.map((element) => (
          <SwiperSlide
            key={element.alt}
            className="flex items-center justify-center h-[300px] rounded-2xl overflow-hidden"
          >
            <div className=" rounded-2xl overflow-hidden ">
              <Image
                draggable={false}
                src={element.src}
                alt={element.alt}
                width={element.width}
                height={element.height}
                className="w-full h-full object-contain  "
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
