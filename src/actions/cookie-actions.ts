"use server";

import { cookies } from "next/headers";

 

export async function setCookie({ name, value }: { name: string; value: string }) {
  const cookieStore = await cookies();

  cookieStore.set({
    name,
    value,
    maxAge: 3600,
    // httpOnly: true,
    // path: "/",
  });
}


export async function DeleteCookie(name: string) {
  const cookieStore = await cookies()

  cookieStore.delete(name)
}
