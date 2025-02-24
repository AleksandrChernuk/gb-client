import MainFooter from "@/components/modules/footer/MainFooter";
import MainPage from '@/components/pages/MainPage'
import { seoMain } from '@/lib/seo'
import { Params } from '@/types/common.types'

type Props = {
  params: Params
}

export async function generateMetadata({ params }: Props) {
  const { lng } = (await params) as { lng: 'uk' | 'ru' | 'en' }

  return {
    title: seoMain.title[lng],
    description: seoMain.description[lng],
    keywords: seoMain.keywords[lng],
  }
}
 
export default function Home() {
  return (
    <>
      <main role='main' className='pb-16 grow bg-grayy dark:bg-dark_main'>
        <MainPage />
      </main>
      <MainFooter />
    </>
  )
}
