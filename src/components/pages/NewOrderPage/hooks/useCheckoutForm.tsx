'use client';

 import { createCheckoutSchema } from "@/schemas/checkout-form.shema";
 import { FormValues } from "@/types/checkout-from.types";
 import { zodResolver } from "@hookform/resolvers/zod";
 import { useForm } from "react-hook-form";
 import { useEffect } from "react";
 import createPassList from "../helpers/createPassList";
 import { useTranslations } from "next-intl";

 export function useMainForm({ adult, child }: { adult: string; child: string }) {
   const t = useTranslations("forms");

   const CheckoutSchema = createCheckoutSchema(t);

   const methods = useForm<FormValues>({
     mode: "onSubmit",
     resolver: zodResolver(CheckoutSchema),
     defaultValues: {
       passengers: createPassList({
         adult: Number(adult),
         children: Number(child),
       }),
       email: "",
       payment: "booking",
       phone: "",
     },
   });

   useEffect(() => {
     const storedPassengers = localStorage.getItem("passengers");

     if (typeof window !== "undefined" && storedPassengers) {
       const passengers = JSON.parse(storedPassengers);
       methods.reset({ passengers });
     }
     // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   useEffect(() => {
     const subscription = methods.watch((value) => {
       localStorage.setItem("passengers", JSON.stringify(value.passengers));
     });

     return () => subscription.unsubscribe();
     // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [methods.watch]);

   const { handleSubmit } = methods;

   const onSubmit = async (data: FormValues) => {
     console.log("Form Submitted:", data);
   };
   return { methods, onSubmit, handleSubmit };
 }
