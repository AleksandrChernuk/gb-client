import { Container } from '@/components/shared/Container';
import { benefits } from '@/constans/benefits.constans';
import { getTranslations } from 'next-intl/server';

export default async function Benefits() {
  const t = await getTranslations('main');

  return (
    <section className="py-8 tablet:py-16 ">
      <Container size="l">
        <ul className="grid grid-cols-1 grid-rows-4 tablet:grid-cols-[repeat(2,minmax(auto,1fr))] tablet:grid-rows-2 laptop:grid-cols-[repeat(4,minmax(auto,auto))] laptop:grid-rows-1 gap-2 tablet:gap-8 laptop:gap-[117px]">
          {benefits &&
            benefits.map(({ title, id, text, icon }) => (
              <li key={id}>
                <ul className="space-y-2">
                  <li className="w-14 h-14 tablet:w-16 tablet:h-16 laptop:w-[72px] laptop:h-[72px]">{icon}</li>
                  <li className="shrink">
                    <h3 className="text-base font-bold leading-6 tracking-normal tablet:h3 text-slate-700 dark:text-slate-50 text-nowrap">
                      {t(`${title}`)}
                    </h3>
                  </li>
                  <li>
                    <p className="text-sm leading-[21px] tablet:text-base font-normal  tablet:leading-6 tracking-normal text-text_secondary">
                      {t(`${text}`)}
                    </p>
                  </li>
                </ul>
              </li>
            ))}
        </ul>
      </Container>
    </section>
  );
}
