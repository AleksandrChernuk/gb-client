'use client';

import { Container } from '@/shared/ui/Container';
import { FaqDisplay } from './FaqDisplay';
import FaqNav from './FaqNav';
import { useSearchParams } from 'next/navigation';
import { usePathname } from '@/shared/i18n/routing';
import { faqConstans } from '@/shared/constans/faq.constans';

export default function FaqTabs() {
  const pathname = usePathname();
  const params = useSearchParams();

  const searchValue = params?.get('q');

  const normalizedPath = pathname.replace(/^\/(uk|ru|en)/, '');
  const defaultSlug = '/faq/bronjuvannja-mists';

  const slug = (normalizedPath in faqConstans ? normalizedPath : defaultSlug) as keyof typeof faqConstans;

  return (
    <Container size="l">
      <div className="grid grid-cols-1 tablet:grid-cols-3 gap-2">
        <FaqNav slug={slug} />
        <FaqDisplay slug={slug} value={searchValue ? searchValue : undefined} />
      </div>
    </Container>
  );
}
