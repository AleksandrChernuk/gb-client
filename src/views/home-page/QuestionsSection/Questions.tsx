import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { faqConstans } from '@/shared/constans/faq.constans';
import { Link } from '@/shared/i18n/routing';
import { Container } from '@/shared/ui/Container';
import { H2 } from '@/shared/ui/H2';
import { getTranslations, getMessages } from 'next-intl/server';

const stripHtml = (html: string) =>
  html
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();

export default async function Questions() {
  const t_main = await getTranslations(MESSAGE_FILES.MAIN_PAGE);
  const t = await getTranslations(MESSAGE_FILES.QUESTIONS_PAGE);
  // Відповіді містять HTML-посилання — у тизері виводимо чистий текст із сирих messages
  // (next-intl інакше парсить <a href> як ICU-тег і кидає INVALID_TAG).
  const messages = (await getMessages()) as Record<string, Record<string, Record<string, string>>>;
  const qp = messages?.[MESSAGE_FILES.QUESTIONS_PAGE] ?? {};

  return (
    <section className="py-4 bg-green-500 tablet:py-6 dark:bg-slate-800">
      <Container size="m">
        <H2 className="text-slate-50 dark:text-slate-100">{t_main('questions_title')}</H2>
        <ul className="grid grid-cols-1 gap-6 mb-4 tablet:grid-cols-3">
          {faqConstans['/faq/routes-and-buses'].questions.slice(0, 3).map(({ id, title, text, slug }) => (
            <li className="flex flex-col items-start justify-between gap-2" key={id}>
              <h3 className="text-white text-base font-bold tracking-tighter tablet:text-xl tablet:leading-[28.8px]">
                {t(`${`${title}.title`}`)}
              </h3>
              <p className="text-sm font-normal tracking-normal leading-5.25 laptop:text-base laptop:leading-6 text-[#e6e6e6]">
                {stripHtml(qp?.[title]?.[text[0]] ?? '')}
              </p>
              <Link
                prefetch={false}
                className="block text-sm font-bold text-green-600! hover:underline transition-all laptop:text-base"
                href={`/faq/routes-and-buses/#${slug}`}
              >
                {t_main('learn_more')}
                <span className="sr-only">: {t(`${title}.title`)}</span>
                {` >`}
              </Link>
            </li>
          ))}
        </ul>
        <div className="text-right">
          <Link
            href={'/faq/bronjuvannja-mists/'}
            className="underline-offset-4 py-2 px-6 tablet:py-4 rounded-full tablet:text-base font-bold leading-6 tracking-normal  text-green-600! hover:underline transition-all"
          >
            {`${t_main('questions_button')} >`}
          </Link>
        </div>
      </Container>
    </section>
  );
}
