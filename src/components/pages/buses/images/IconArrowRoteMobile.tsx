import React from 'react';

export default function IconArrowRoteMobile() {
  return (
    <div>
      <svg
        width={52}
        height={88}
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 52 88'
        fill='none'
      >
        <circle cx='6' cy='10' r='5' stroke='#475569' strokeWidth='2' />
        <rect
          x='6.5'
          y='16.5'
          width='55'
          height='1'
          transform='rotate(90 6.5 16.5)'
          stroke='#475569'
          strokeDasharray='3 3'
        />
        <rect x='1' y='72' width='10' height='10' rx='5' stroke='#088537' strokeWidth='2' />
        <circle cx='6' cy='77' r='2' fill='#088537' />
      </svg>
    </div>
  );
}
