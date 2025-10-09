import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { faqConstans } from '@/shared/constans/faq.constans';
import { Link } from '@/shared/i18n/routing';
import { Container } from '@/shared/ui/Container';
import { getTranslations } from 'next-intl/server';

export default async function Questions() {
  const t_main = await getTranslations(MESSAGE_FILES.MAIN_PAGE);
  const t = await getTranslations(MESSAGE_FILES.QUESTIONS_PAGE);

  return (
    <section className="py-4 bg-green-500 tablet:py-6 dark:bg-slate-800">
      <Container size="m">
        <h3 className="mb-4 text-white text-2xl font-bold tracking-normal leading-[28.8px] laptop:text-[32px] laptop:leading-[38.4px] laptop:mb-8 dark:text-garyy">
          {t_main('questions_title')}
        </h3>
        <ul className="grid grid-cols-1 gap-6 mb-4 tablet:grid-cols-3 last:border-b-0">
          {faqConstans['/faq/routes-and-buses'].questions.slice(0, 3).map(({ id, title, text, slug }) => (
            <li className="flex flex-col items-start justify-between" key={id}>
              <h4 className="mb-2 text-white text-sm font-bold tracking-normal leading-[16.8px] tablet:text-sm laptop:text-xl laptop:leading-[28.8px]">
                {t(`${`${title}.title`}`)}
              </h4>
              <p className="mb-4 text-sm font-normal tracking-normal leading-[21px] laptop:text-base laptop:leading-6 text-[#e6e6e6] ">
                {t(`${title}.${text[0]}`)}
              </p>
              <Link
                prefetch={false}
                className="block mb-6 text-base font-bold text-green-600! hover:underline transition-all laptop:text-base"
                href={`${'/faq/routes-and-buses'}?q=${slug}`}
              >
                {`${t_main('learn_more')} >`}
              </Link>
            </li>
          ))}
        </ul>
        <div className="text-right">
          <Link
            prefetch={false}
            href={'/faq'}
            className="underline-offset-4 py-2 px-6 tablet:py-4 rounded-full tablet:text-base font-bold leading-6 tracking-normal min-w-[168px] min-h-[48px] max-h-[48px] tablet:max-h-[52px] text-green-600! hover:underline transition-all"
          >
            {`${t_main('questions_button')} >`}
          </Link>
        </div>
      </Container>
    </section>
  );
}
