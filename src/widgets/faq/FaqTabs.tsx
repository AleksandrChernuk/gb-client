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
