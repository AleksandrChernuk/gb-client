"use client";

import BackButton from "@/components/shared/BackButton";
import { Container } from "@/components/shared/Container";
import Trip from "./modules/Trip";
import CheckoutCard from "./components/CheckoutCard";
import { FormProvider } from "react-hook-form";
import Passengers from "./modules/Passengers";
import { Button } from "@/components/ui/button";
import { useMainForm } from "./hooks/useCheckoutForm";
import Contacts from "./modules/Contacts";
import { useEffect } from "react";
import Booking from "./modules/Booking";
import Payment from "./modules/Payment";

export default function NewOrderPage({ adult, child }: { adult: string; child: string }) {
  const { handleSubmit, onSubmit, methods } = useMainForm({ adult, child });

  useEffect(() => {
    return () => {
      localStorage.removeItem("passengers");
    };
  }, []);

  return (
    <section>
      <h1 className="sr-only">CheckoutPage</h1>
      <Container size="l">
        <div className="my-4 laptop:my-8">
          <BackButton />
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 tablet:grid-cols-[minmax(0,766px)_1fr] w-full relative gap-4">
            <div className="space-y-8 laptop:col-span-1">
              <FormProvider {...methods}>
                <Passengers />

                <CheckoutCard title="Booling" cardCount={2}>
                  <Booking />
                </CheckoutCard>

                <CheckoutCard title="Contacts" cardCount={3}>
                  <Contacts />
                </CheckoutCard>

                <CheckoutCard title="Payment" cardCount={4}>
                  <Payment />
                </CheckoutCard>
              </FormProvider>
            </div>
            <div className="laptop:col-span-1 laptop:justify-self-end laptop:w-[542px] space-y-4">
              <CheckoutCard title="Your booking">
                <Trip />
              </CheckoutCard>
              <Button variant={"default"} className="w-full p-4" type="submit">
                Submit
              </Button>
            </div>
          </div>
        </form>
      </Container>
    </section>
  );
}
