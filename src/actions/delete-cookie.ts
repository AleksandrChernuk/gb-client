"use server";

import { cookies } from "next/headers";

export async function DeleteCookie(name: string) {
  (await cookies()).delete(name);
}
