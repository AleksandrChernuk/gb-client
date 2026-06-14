import { Container } from '@/shared/ui/Container';
import { Link } from '@/shared/i18n/routing';
import { MapPin } from 'lucide-react';

interface RouteEndpointLink {
  href: string;
  label: string;
}

interface RouteContentProps {
  content: string;
  endpointLinks?: RouteEndpointLink[];
}

export default async function RouteContent({ content, endpointLinks = [] }: RouteContentProps) {
  const hasContent = !!content?.trim();

  if (!hasContent && endpointLinks.length === 0) return null;

  return (
    <section className="py-8 laptop:py-12">
      <Container size="l">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900 laptop:p-7">
          {endpointLinks.length > 0 ? (
            <div className="mb-5 flex flex-wrap gap-2">
              {endpointLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch={false}
                  className="inline-flex items-center gap-1.5 rounded-full border border-green-500/30 bg-green-50 px-3 py-1.5 text-sm font-medium text-green-700 transition-colors hover:border-green-500 hover:bg-green-100 dark:border-green-500/30 dark:bg-green-500/10 dark:text-green-300 dark:hover:bg-green-500/20"
                >
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  {link.label}
                </Link>
              ))}
            </div>
          ) : null}

          {hasContent ? (
            <div
              className="prose prose-sm prose-slate max-w-none dark:prose-invert prose-headings:mb-2 prose-headings:mt-5 prose-headings:font-bold prose-headings:text-slate-800 dark:prose-headings:text-slate-50 prose-p:mb-3 prose-p:leading-relaxed prose-a:font-medium prose-a:text-slate-800 prose-a:underline prose-a:underline-offset-2 dark:prose-a:text-slate-100"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          ) : null}
        </div>
      </Container>
    </section>
  );
}
