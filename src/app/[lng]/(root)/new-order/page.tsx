import SecondFooter from "@/components/modules/footer/SecondFooter";
import NewOrderPage from "@/components/pages/NewOrderPage";
 import { cookies } from "next/headers";
 import { redirect } from "next/navigation";

 export default async function NewOrder() {
   const cookieStore = await cookies();
   const adult = cookieStore.get("_a");
   const children = cookieStore.get("_c");

   if (!adult || !children) {
     return redirect("/");
   }

   return (
     <>
       <main role="main" className="pb-16 grow bg-grayy dark:bg-dark_bg">
         <NewOrderPage adult={adult.value} child={children.value} />
       </main>
       <SecondFooter className="bg-grayy dark:bg-dark_bg" />
     </>
   );
 }
