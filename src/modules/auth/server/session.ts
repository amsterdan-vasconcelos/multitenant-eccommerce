import { baseProcedure } from "@/trpc/init";
import { headers as getHeaders } from "next/headers";

export const session = baseProcedure.query(async ({ ctx }) => {
  const headers = await getHeaders();
  const session = await ctx.db.auth({ headers });

  console.log(session);

  return session;
});
