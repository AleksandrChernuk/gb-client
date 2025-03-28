import { Link } from '@/i18n/routing';

export default async function NotFound() {
  return (
    <main className="flex flex-1 flex-col gap-4 px-2 items-center mt-24 max-w-xl mx-auto text-xl">
      <h1 className="text-2xl font-bold">{'[...not-found]'}</h1>
      <p>...not-found</p>
      <Link href="/" className="text-blue-600 hover:underline">
        {'go-home'}
      </Link>
    </main>
  );
}
