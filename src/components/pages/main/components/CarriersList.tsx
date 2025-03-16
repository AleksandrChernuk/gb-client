import { carriers } from '@/constans/carriers.constans';
import Image from 'next/image';

export const normalizeCarriersList = (array: typeof carriers) => {
  const newArr = [];
  let currentLevel = 4;
  let index = 0;

  while (index < array.length) {
    const level = [];
    for (let i = 0; i < currentLevel && index < array.length; i++) {
      level.push(array[index]);
      index++;
    }
    newArr.push(level);
    currentLevel = Math.max(1, currentLevel - 1);
  }
  return newArr;
};

export const CarriersList = () => {
  return (
    <ul className="space-y-4">
      {normalizeCarriersList(carriers).map((level, idx) => (
        <ul key={idx} className="flex items-center justify-center gap-4">
          {level.map(({ alt, src, w, h }) => (
            <li key={alt} className={`w-[${w}px] h-[${h}px]`}>
              <Image src={src} alt={alt} width={w} height={h} />
            </li>
          ))}
        </ul>
      ))}
    </ul>
  );
};
