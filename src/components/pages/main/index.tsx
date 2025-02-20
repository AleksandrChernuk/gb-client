import React from 'react';
import { Herow } from './modules/Herow';
import Questions from './modules/Questions';
import PopularRouters from './modules/PopularRouters';
import GetStarted from './modules/GetStarted';
import Carriers from './modules/Carriers';
import Buses from './modules/Buses';
import Benefits from './modules/Benefits';
 
export default async function MainPage() {
  return (
    <main role='main' className='grow  bg-grayy dark:bg-dark_bg'>
      <Herow />
      <Benefits />
      <Buses />
      <PopularRouters />
      <GetStarted />
      <Carriers />
      <Questions />
    </main>
  );
}
