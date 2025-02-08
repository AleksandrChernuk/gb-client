// import { useTranslations } from "next-intl";
import { Link } from "../../i18n/routing";

   
export default function NotFound() {
  // const t = useTranslations("continue");
  return (
    <main className="flex flex-1 flex-col gap-4 px-2 items-center mt-24 max-w-xl mx-auto text-xl">
      <h1 className="text-2xl font-bold">{"title"}</h1>
      <p>description</p>
      <Link href="/" className="text-blue-600 hover:underline">
        {"go-home"}
      </Link>
    </main>
  );
}
