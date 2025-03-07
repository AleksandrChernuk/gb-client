'use client';

import { usePathname } from '@/i18n/routing';
import { FaqDisplay } from './modules/FaqDisplay';
import { faqConstans } from '@/constans/faq.constans';
import { Container } from '@/components/shared/Container';
import FaqNav from './modules/FaqNav';
import { useSearchParams } from 'next/navigation';

export default function FaqPage() {
  const pathname = usePathname();
  const params = useSearchParams();

  const searchValue = params.get('q');

  const slug = pathname === '/faq' ? '/faq/bronjuvannja-mists' : (pathname as keyof typeof faqConstans);

  return (
    <>
      <div className="mb-8 lg:hidden">
        <FaqNav slug={slug} />
      </div>
      <Container size="l">
        <div className="flex flex-col gap-8 tablet:flex-row tablet:gap-10">
          <div className="hidden lg:block">
            <FaqNav slug={slug} />
          </div>
          <FaqDisplay slug={slug} value={searchValue ? searchValue : undefined} />
        </div>
      </Container>
    </>
  );
}
