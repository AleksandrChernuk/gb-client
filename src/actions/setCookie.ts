"use server";

import { cookies } from "next/headers";

export async function setCookie({ name, value }: { name: string; value: string }) {
  const cookieStore = await cookies();

  cookieStore.set({
    name,
    value,
    // httpOnly: true,
    // path: "/",
  });
}
