import { Container } from '@/shared/ui/Container';

interface RouteContentProps {
  content: string;
}

export default async function RouteContent({ content }: RouteContentProps) {
  return (
    <section className="py-5 laptop:py-10 flex-1">
      <Container size="m">
        <div
          className="prose prose-sm prose-slate dark:prose-invert max-w-none prose-a:text-green-300 prose-headings:text-slate-700 dark:prose-headings:text-slate-50 prose-headings:mb-1 prose-p:mb-2 prose-p:leading-relaxed bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 tablet:p-6 laptop:p-8"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </Container>
    </section>
  );
}
