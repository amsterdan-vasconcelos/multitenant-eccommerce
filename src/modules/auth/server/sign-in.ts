import { baseProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { cookies as getCookies } from "next/headers";
import { AUTH_COOKIE } from "../constants";
import { signInSchema } from "../schemas";

export const signIn = baseProcedure
  .input(signInSchema)
  .mutation(async ({ ctx, input: { email, password } }) => {
    const data = await ctx.db.login({
      collection: "users",
      data: { email, password },
    });

    if (!data.token) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Falha no login",
      });
    }

    const cookies = await getCookies();
    cookies.set({
      name: AUTH_COOKIE,
      value: data.token,
      httpOnly: true,
      path: "/",
    });

    return data;
  });
