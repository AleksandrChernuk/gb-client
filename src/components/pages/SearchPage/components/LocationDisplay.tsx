import React from 'react';

type Props = {
  location: string;
  address: string;
  time?: string;
  variant: 'mobile' | 'desctop';
};

export default function LocationDisplay({ location, address, time, variant }: Props) {
  switch (variant) {
    case 'mobile':
      return (
        <div>
          <div className='body_medium text-text_prymery_color'>{location}</div>
          <div className='text-[10px] leading-4 text-text_secondary_color  text-wrap'>
            {address}
          </div>
        </div>
      );

    case 'desctop':
      return (
        <div className='space-y-2'>
          <h3 className='h5 text-text_secondary_color'>{time}</h3>

          <div className='space-y-2 truncate text-wrap'>
            <div className='h3 laptop:h4 text-text_prymery_color'>{location}</div>
            <div className='text-sm leading-4 text-text_secondary_color'>{address}</div>
          </div>
        </div>
      );

    default:
      return null;
  }
}
