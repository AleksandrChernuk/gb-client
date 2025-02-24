"use server";

import { cookies } from "next/headers";

export async function DeleteCookie(name: string) {
    const cookieStore = await cookies()

    cookieStore.delete(name)
}
