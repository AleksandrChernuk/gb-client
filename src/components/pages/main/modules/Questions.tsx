import { Container } from '@/components/shared/Container';
import { Button } from '@/components/ui/button';
import { faqConstans } from '@/constans/faq.constans';
import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';

export default async function Questions() {
  const t = await getTranslations('questions');
  const t_main = await getTranslations('main');

  return (
    <section className="py-4 bg-green-500 tablet:py-6 dark:bg-slate-800">
      <Container size="m">
        <h3 className="mb-4 text-white text-2xl font-bold tracking-normal leading-[28.8px] laptop:text-[32px] laptop:leading-[38.4px] laptop:mb-8 dark:text-garyy">
          {t_main('questions_title')}
        </h3>
        <ul className="grid grid-cols-1 gap-6 mb-4 tablet:grid-cols-3 last:border-b-0">
          {faqConstans['/faq/routes-and-buses'].questions.slice(0, 3).map(({ id, title, text, slug }) => (
            <li className="flex flex-col items-start" key={id}>
              <h4 className="mb-2 text-white text-sm font-bold tracking-normal leading-[16.8px] tablet:text-sm laptop:h3">
                {t(`${`${title}.title`}`)}
              </h4>
              <p className="mb-4 text-sm font-normal tracking-normal leading-[21px] laptop:text-base laptop:leading-6 text-[#e6e6e6] ">
                {t(`${title}.${text[0]}`)}
              </p>
              <Button asChild variant={'link'} className="mt-auto">
                <Link
                  prefetch={false}
                  className="block mb-6 text-base font-bold text-green-100 underline laptop:text-base"
                  href={`${'/faq/routes-and-buses'}?q=${slug}`}
                >
                  {`${t_main('learn_more')} >`}
                </Link>
              </Button>
            </li>
          ))}
        </ul>
        <div className="text-right">
          <Button asChild variant={'secondary'} size={'secondary'}>
            <Link prefetch={false} href={'/faq'}>
              {t_main('questions_button')}
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
