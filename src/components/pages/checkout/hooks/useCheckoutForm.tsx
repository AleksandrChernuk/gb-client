'use client';

 import { useCheckoutSchema } from "@/schemas/checkout-form.shema";
 import { FormValues } from "@/types/checkout-from.types";
 import { zodResolver } from "@hookform/resolvers/zod";
 import { useForm } from "react-hook-form";
 import { useEffect } from "react";
 import createPassList from "../helpers/createPassList";
 import { useTranslations } from "next-intl";

 export function useMainForm({ adult, child }: { adult: string; child: string }) {
   const t = useTranslations("forms");

   const CheckoutSchema = useCheckoutSchema(Number(adult) + Number(child), t);

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
       selected_seats: [],
     },
   });

   useEffect(() => {
     const storedPassengers = localStorage.getItem("form");

     if (typeof window !== "undefined" && storedPassengers) {
       try {
         const passengers = JSON.parse(storedPassengers); // Попробуем распарсить
         methods.reset({ ...passengers });
       } catch (error) {
         console.error("Ошибка при парсинге данных из localStorage:", error);
       }
     }
     // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   useEffect(() => {
     const subscription = methods.watch((value) => {
       localStorage.setItem("form", JSON.stringify(value));
     });

     return () => subscription.unsubscribe();
     // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const { handleSubmit } = methods;

   const onSubmit = async (data: FormValues) => {
     console.log("Form Submitted:", data);
   };
   return { methods, onSubmit, handleSubmit };
 }
