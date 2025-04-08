import Questions from './modules/Questions';
import GetStarted from './modules/GetStarted';
import Buses from './modules/Buses';
import Benefits from './modules/Benefits';
import PopularRoutes from './modules/PopularRoutes';
import Herow from './modules/Herow';
import Carriers from './modules/Carriers';

export default async function MainPage() {
  return (
    <main role="main" className="bg-slate-50 dark:bg-slate-900">
      <Herow />
      <Benefits />
      <Buses />
      <PopularRoutes />
      <GetStarted />
      <Carriers />
      <Questions />
    </main>
  );
}
