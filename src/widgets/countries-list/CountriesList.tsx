import Link from 'next/link';
import { ICountry } from '@/shared/types/countries.types';
import { ChevronRight } from 'lucide-react';
import flags from 'react-phone-number-input/flags';

type Props = { countries: ICountry[]; locale: string };

export default function CountriesList({ countries, locale }: Props) {
  return (
    <ul className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-3 tablet:gap-4">
      {countries.map((c) => {
        const country = c.translations.find((e) => e.language === locale);
        if (!country) return null;

        const Flag = c.code ? flags[c.code.toUpperCase() as keyof typeof flags] : null;

        return (
          <li key={c.id}>
            <Link
              prefetch={false}
              href={`/${locale}/all-countries/${c.slug}/`}
              className="group relative flex items-center justify-between w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm hover:shadow-md hover:border-green-500 dark:hover:border-green-400 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                {Flag ? (
                  <div className="w-9 h-6 shrink-0 rounded-[4px] overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800 flex items-center justify-center bg-slate-50 dark:bg-slate-800 [&>svg]:w-full [&>svg]:h-full [&>svg]:object-cover">
                    <Flag title={country.countryFullName} />
                  </div>
                ) : (
                  <div className="w-9 h-6 shrink-0 rounded-[4px] bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 text-[10px] font-bold uppercase">
                    {c.code || '?'}
                  </div>
                )}
                <span className="text-base font-semibold text-slate-800 dark:text-slate-100 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors line-clamp-1">
                  {country.countryFullName}
                </span>
              </div>
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 group-hover:bg-green-50 dark:group-hover:bg-green-900/30 transition-colors shrink-0 ml-2">
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-green-600 dark:group-hover:text-green-400 transition-all group-hover:translate-x-0.5 duration-300" />
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
