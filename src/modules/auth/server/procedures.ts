import { createTRPCRouter } from "@/trpc/init";
import { session } from "./session";
import { signUp } from "./sign-up";
import { signIn } from "./sign-in";
import { signOut } from "./sign-out";

export const authRouter = createTRPCRouter({
  session,
  signUp,
  signIn,
  signOut,
});
