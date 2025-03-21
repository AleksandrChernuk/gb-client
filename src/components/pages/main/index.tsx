import Questions from './modules/Questions';
import GetStarted from './modules/GetStarted';
import Buses from './modules/Buses';
import Benefits from './modules/Benefits';
import PopularRoutes from './modules/PopularRoutes';
import Herow from './modules/Herow';

export default async function MainPage() {
  return (
    <main role="main" className="bg-grayy dark:bg-dark_bg ">
      <Herow />
      <Benefits />
      <Buses />
      <PopularRoutes />
      <GetStarted />
      <Questions />
    </main>
  );
}
