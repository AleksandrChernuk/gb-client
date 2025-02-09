import MainFooter from "@/components/modules/footer/MainFooter";
import MainPage from "@/components/pages/MainPage";

export default function Home() {
  return (
    <>
      <main role="main" className="pb-16 grow bg-grayy dark:bg-dark_mode_main1">
        <MainPage />
      </main>
      <MainFooter />
    </>
  );
}
