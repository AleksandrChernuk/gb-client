import MainSearch from "@/components/modules/main-search";
import { Container } from "@/components/shared/Container";
import { ResultList } from "./modules/ResultList";
import DateTabs from './modules/DatePicker';
import { Information } from './modules/Information';

export default async function SearchModule() {
  return (
    <section>
      <h1 className='sr-only'>SearchPage</h1>
      <search className=' bg-background_card dark:bg-background_black_mode'>
        <Container size='l' className='py-5 tablet:pt-8 '>
          <MainSearch />
        </Container>
      </search>

      <search className='bg-background_card dark:bg-background_black_mode'>
        <Container size='m'>
          <DateTabs />
        </Container>
      </search>

      <Container size='m' className='relative'>
        <div className='pt-4 pb-6 space-y-6 laptop:py-8 laptop:space-y-8'>
          <Information />

          <ResultList />
        </div>
      </Container>
    </section>
  );
}
