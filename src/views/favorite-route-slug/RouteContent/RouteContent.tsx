import { Container } from '@/shared/ui/Container';

interface RouteContentProps {
  content: string;
}

export default async function RouteContent({ content }: RouteContentProps) {
  return (
    <section className="py-5 laptop:py-10 ">
      <Container size="sm">
        <div
          className="prose prose-sm prose-slate dark:prose-invert max-w-none prose-a:text-green-300 prose-headings:text-slate-700 dark:prose-headings:text-slate-50 prose-headings:mb-1 prose-p:mb-2 prose-p:leading-relaxed"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </Container>
    </section>
  );
}
