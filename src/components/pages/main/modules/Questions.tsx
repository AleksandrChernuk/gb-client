import { Container } from '@/components/shared/Container';
import { Button } from '@/components/ui/button';
import { faqConstans } from '@/constans/faq.constans';
import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';

export default async function Questions() {
  const t = await getTranslations('questions');
  const t_main = await getTranslations('main');

  return (
    <section className="py-4 tablet:py-6 bg-background_card   dark:bg-dark_main">
      <Container size="m">
        <h3 className="mb-4 text-white h3 laptop:h1 laptop:mb-8 dark:text-garyy">{t_main('questions_title')}</h3>
        <ul className="grid grid-cols-1 tablet:grid-cols-3 gap-6 mb-4 last:border-b-0">
          {faqConstans['/faq/routes-and-buses'].questions.slice(0, 3).map(({ id, title, text, slug }) => (
            <li className="flex flex-col items-start" key={id}>
              <h4 className="mb-2 text-white secondary_2_bolt_text tablet:button_mobile_bolt_text laptop:h3">
                {t(`${`${title}.title`}`)}
              </h4>
              <p className="mb-4 secondary_text laptop:main_text_body text-gray_0 ">{t(`${title}.${text[0]}`)}</p>
              <Button asChild variant={'link'} className="mt-auto">
                <Link
                  prefetch={false}
                  className="block mb-6 text-base font-bold underline laptop:text-base text-primary_2"
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
