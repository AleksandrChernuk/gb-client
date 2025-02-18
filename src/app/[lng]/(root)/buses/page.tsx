import SecondFooter from "@/components/modules/footer/SecondFooter";
import BusesPage from "@/components/pages/buses";
 
export default async function Buses() {
  return (
    <>
      <main role="main" className="pb-16 grow bg-grayy dark:bg-dark_main">
        <BusesPage />
      </main>
      <SecondFooter />
    </>
  );
}
