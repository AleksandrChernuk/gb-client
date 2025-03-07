import { CustomCard } from '@/components/shared/CustomCard';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { faqConstans } from '@/constans/faq.constans';

interface Props {
  slug?: keyof typeof faqConstans;
  value?: string;
}

export function FaqDisplay({ slug = '/faq/bronjuvannja-mists', value }: Props) {
  return (
    <CustomCard className="w-full dark:bg-dark_main">
      <h3 className="text-text_prymery h5">{faqConstans[slug].title}</h3>
      <Accordion defaultValue={value} type="single" collapsible className="w-full">
        {faqConstans[slug].questions.map((el) => (
          <AccordionItem value={el.slug} key={el.id}>
            <AccordionTrigger className="text-text_prymery">{el.title}</AccordionTrigger>
            <AccordionContent className="text-text_prymery">
              <ul>
                {el.text.map((text, i) => (
                  <li key={i}>{text}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </CustomCard>
  );
}
