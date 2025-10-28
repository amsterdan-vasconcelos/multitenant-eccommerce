"use client";

import { Mode, Resolver, useForm } from "react-hook-form";
import { signInSchema, SignInSchema } from "../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type UseFormConfig = {
  resolver: Resolver<SignInSchema>;
  defaultValues: SignInSchema;
  mode: Mode;
};

const useFormConfig: UseFormConfig = {
  resolver: zodResolver(signInSchema),
  defaultValues: {
    email: "",
    password: "",
  },
  mode: "all",
};

export function SignInView() {
  const router = useRouter();

  const trpc = useTRPC();
  const signIn = useMutation(
    trpc.auth.signIn.mutationOptions({
      onError: (error) => {
        toast.error(error.message);
      },
      onSuccess: () => {
        router.push("/");
        toast.success("SignIn realizado com sucesso!");
      },
    })
  );

  const form = useForm<SignInSchema>({ ...useFormConfig });

  function onSubmit(data: SignInSchema) {
    signIn.mutate(data);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5">
      <div className="bg-[#f4f4f0] h-screen w-full lg:col-span-3 overflow-y-auto">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-8 p-4 lg:p-16"
          >
            <div className="flex items-center justify-between mb-8">
              <Link href={"/"}>
                <Logo className="text-2xl" />
              </Link>
              <Button
                asChild
                size={"sm"}
                variant={"noShadow"}
                className="text-base border-none underline bg-[#f4f4f0]"
              >
                <Link prefetch href={"/sign-up"}>
                  Sign Up
                </Link>
              </Button>
            </div>
            <h1 className="text-4xl font-medium">
              Join over 1.580 creators earning money on Funroad.
            </h1>
            <FormField
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={signIn.isPending}
              type="submit"
              size="lg"
              className="bg-black text-white hover:bg-pink-400"
            >
              Create Account
            </Button>
          </form>
        </Form>
      </div>
      <div
        className="h-screen w-full lg:col-span-2 hidden lg:block"
        style={{
          background: "url(/auth-bg.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </div>
  );
}
