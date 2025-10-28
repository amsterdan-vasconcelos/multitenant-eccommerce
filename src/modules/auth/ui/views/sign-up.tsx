"use client";

import { Mode, Resolver, useForm } from "react-hook-form";
import { signUpSchema, SignUpSchema } from "../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type UseFormConfig = {
  resolver: Resolver<SignUpSchema>;
  defaultValues: SignUpSchema;
  mode: Mode;
};

const useFormConfig: UseFormConfig = {
  resolver: zodResolver(signUpSchema),
  defaultValues: {
    username: "",
    email: "",
    password: "",
  },
  mode: "all",
};

export function SignUpView() {
  const router = useRouter();

  const trpc = useTRPC();
  const signUp = useMutation(
    trpc.auth.signUp.mutationOptions({
      onError: (error) => {
        toast.error(error.message);
      },
      onSuccess: () => {
        router.push("/");
        toast.success("Conta criada com sucesso!");
      },
    })
  );

  const form = useForm<SignUpSchema>({ ...useFormConfig });

  const username = form.watch("username");
  const usernameError = form.formState.errors.username;

  const showPreview = username.trim() && !usernameError;

  function onSubmit(data: SignUpSchema) {
    signUp.mutate(data);
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
                <Link prefetch href={"/sign-in"}>
                  Sign In
                </Link>
              </Button>
            </div>
            <h1 className="text-4xl font-medium">
              Join over 1.580 creators earning money on Funroad.
            </h1>
            <FormField
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" />
                  </FormControl>
                  <FormDescription
                    className={cn(showPreview ? "block" : "hidden")}
                  >
                    Sua loja terá o endereço: funroad.com/
                    <strong>{username}</strong>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
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
              disabled={signUp.isPending}
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
