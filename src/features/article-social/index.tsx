import { MESSAGE_FILES } from '@/shared/configs/message.file.constans';
import { footerNavLinks } from '@/shared/constans/footer-nav-links.constans';
import { getTranslations } from 'next-intl/server';

export async function ArticleSocialFollow() {
  const t = await getTranslations(MESSAGE_FILES.COMMON);

  return (
    <section className="mt-6 rounded-2xl border border-slate-200 p-6 text-center dark:border-slate-700">
      <p className="text-xl font-bold text-slate-900 dark:text-slate-50">{t('social_follow_title')}</p>
      <p className="mt-1 text-slate-500 dark:text-slate-400">{t('social_follow_text')}</p>
      <ul className="mt-5 flex flex-wrap items-center justify-center gap-3">
        {footerNavLinks.social.map((item) => (
          <li key={item.title}>
            <a
              href={item.href}
              target="_blank"
              rel="nofollow noopener noreferrer"
              aria-label={t(item.ariaLabel)}
              className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 capitalize text-slate-700 transition-colors hover:border-green-400 hover:text-green-600 dark:border-slate-700 dark:text-slate-200 [&_path]:fill-current"
            >
              <span className="flex h-6 w-6 items-center justify-center">{item.icon}</span>
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
