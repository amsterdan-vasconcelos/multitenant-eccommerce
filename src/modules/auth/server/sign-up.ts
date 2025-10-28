import { baseProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { cookies as getCookies } from "next/headers";
import { AUTH_COOKIE } from "../constants";
import { signUpSchema } from "../schemas";

export const signUp = baseProcedure
  .input(signUpSchema)
  .mutation(async ({ ctx, input: { username, email, password } }) => {
    const existingData = await ctx.db.find({
      collection: "users",
      limit: 1,
      where: { username: { equals: username } },
    });

    const existingUser = existingData.docs[0];

    if (existingUser) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "Este nome de usuário já está em uso.",
      });
    }

    await ctx.db.create({
      collection: "users",
      data: { username, email, password },
    });

    const data = await ctx.db.login({
      collection: "users",
      data: { email, password },
    });
    console.log(data.user.sessions);

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
  });
