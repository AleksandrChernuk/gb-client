import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { benefits } from '@/shared/constans/benefits.constans';
import { Container } from '@/shared/ui/Container';
import { getTranslations } from 'next-intl/server';

export default async function Benefits() {
  const t = await getTranslations(MESSAGE_FILES.MAIN_PAGE);

  return (
    <section className="py-4 tablet:py-8">
      <Container size="l">
        <h2 className="sr-only">{t('benefits_title')}</h2>
        <ul className="space-y-4 tablet:space-y-0 tablet:grid tablet:grid-cols-[repeat(2,minmax(auto,1fr))] tablet:grid-rows-2 gap-2 tablet:gap-4 justify-between">
          {benefits &&
            benefits.map(({ title, id, text, icon }) => (
              <li key={id} className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-14 h-14 tablet:w-16 tablet:h-16 laptop:w-[72px] laptop:h-[72px]" aria-hidden="true">
                    {icon}
                  </div>
                  <h3 className="text-base font-bold leading-6 tracking-normal tablet:text-lg text-slate-700 dark:text-slate-50 text-nowrap">
                    {t(`${title}`)}
                  </h3>
                </div>

                <p className="text-sm leading-[21px] tablet:text-base font-normal tablet:leading-6 tracking-normal text-slate-400 dark:text-slate-200">
                  {t(`${text}`)}
                </p>
              </li>
            ))}
        </ul>
      </Container>
    </section>
  );
}
