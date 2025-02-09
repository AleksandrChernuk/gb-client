import SecondFooter from "@/components/modules/footer/SecondFooter";
import SearchModule from "@/components/pages/SearchPage";

export default async function SearchPage() {
  return (
    <>
      <main role="main" className="pb-16 grow bg-grayy dark:bg-dark_mode_main1">
        <SearchModule />
      </main>
      <SecondFooter />
    </>
  );
}
