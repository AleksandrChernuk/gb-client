import SecondFooter from "@/components/modules/footer/SecondFooter";
import NewOrderPage from "@/components/pages/NewOrderPage";
import { cookies } from "next/headers";

export default async function NewOrder() {
  const cookieStore = await cookies();
  const ___pas = cookieStore.get("___pas");
  console.log("___pas", ___pas?.value);

  return (
    <>
      <main role="main" className="pb-16 grow bg-grayy dark:bg-dark_bg">
        <NewOrderPage pass={___pas?.value || "1"} />
      </main>
      <SecondFooter className="bg-grayy dark:bg-dark_bg" />
    </>
  );
}
