import React from 'react';
import { Herow } from './modules/Herow';
import Questions from './modules/Questions';
import PopularRouters from './modules/PopularRouters';
import GetStarted from './modules/GetStarted';
import Carriers from './modules/Carriers';
import Buses from './modules/Buses';
import Benefits from './modules/Benefits';

export default function MainPage({ locales }: { locales: string }) {
  return (
    <main role='main' className='grow bg-grayy dark:bg-background_black_mode'>
      <Herow />
      <Benefits locale={locales} />
      <Buses locale={locales} />
      <PopularRouters locale={locales} />
      <GetStarted locale={locales} />
      <Carriers locale={locales} />
      <Questions locale={locales} />
    </main>
  );
}
