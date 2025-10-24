import { inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "@/trpc/routers/_app";

export type CategoriesFindManyOutput =
  inferRouterOutputs<AppRouter>["categories"]["getMany"];

export type CategoriesFindManyOutputSingle = CategoriesFindManyOutput[0];
