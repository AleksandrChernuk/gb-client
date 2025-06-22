'use client';

import { usePathname } from '@/i18n/routing';
import { FaqDisplay } from './FaqDisplay';
import { faqConstans } from '@/constans/faq.constans';
import { Container } from '@/components/shared/Container';
import FaqNav from './FaqNav';
import { useSearchParams } from 'next/navigation';

export default function FaqTabs() {
  const pathname = usePathname();
  const params = useSearchParams();

  const searchValue = params.get('q');

  const slug = pathname === '/faq' ? '/faq/bronjuvannja-mists' : (pathname as keyof typeof faqConstans);

  return (
    <Container size="l">
      <div className="flex flex-col gap-8 tablet:flex-row tablet:gap-10">
        <FaqNav slug={slug} />
        <FaqDisplay slug={slug} value={searchValue ? searchValue : undefined} />
      </div>
    </Container>
  );
}
