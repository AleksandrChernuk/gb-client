import Herow from './modules/Herow';
import Benefits from './modules/Benefits';
import Buses from './modules/Buses';
import PopularRoutes from './modules/PopularRoutes';
import GetStarted from './modules/GetStarted';
import Questions from './modules/Questions';
import MainFooter from '@/components/modules/footer/MainFooter';

const Main = () => {
  return (
    <>
      <main role="main" className="bg-slate-50 dark:bg-slate-900">
        <Herow />
        <Benefits />
        <Buses />
        <PopularRoutes />
        <GetStarted />
        <Questions />
      </main>
      <MainFooter />
    </>
  );
};

export default Main;
