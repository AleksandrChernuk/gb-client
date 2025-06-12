import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const alt = 'About Acme';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  const interSemiBold = await readFile(join(process.cwd(), 'assets/Inter-SemiBold.ttf'));

  return new ImageResponse(
    {
      type: 'div',
      key: null,
      props: {
        style: {
          fontSize: 128,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        children: 'About Acme',
      },
    },
    {
      fonts: [
        {
          name: 'Inter',
          data: interSemiBold,
          style: 'normal',
          weight: 400,
        },
      ],
    },
  );
}
