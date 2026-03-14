import { Container } from '@/shared/ui/Container';
import { FaqDisplay } from '@/widgets/faq-display';

import { faqConstans } from '@/shared/constans/faq.constans';
import FaqNav from '@/widgets/faq-nav';

type FaqSlug = keyof typeof faqConstans;

type Props = {
  slug: FaqSlug;
  searchQuery?: string;
};

export default function FaqContent({ slug, searchQuery }: Props) {
  return (
    <section>
      <Container size="l">
        <div className="grid grid-cols-1 tablet:grid-cols-4 gap-2">
          <FaqNav slug={slug} />
          <FaqDisplay slug={slug} value={searchQuery} />
        </div>
      </Container>
    </section>
  );
}
