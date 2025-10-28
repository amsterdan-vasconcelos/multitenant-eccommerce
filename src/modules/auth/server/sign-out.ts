import { baseProcedure } from "@/trpc/init";
import { cookies as getCookies } from "next/headers";
import { AUTH_COOKIE } from "../constants";

export const signOut = baseProcedure.mutation(async () => {
  const cookies = await getCookies();
  cookies.delete(AUTH_COOKIE);
});
