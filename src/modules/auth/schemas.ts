import z from "zod";

export const signUpSchema = z.object({
  email: z.email(),
  password: z.string(),
  username: z
    .string()
    .min(3)
    .max(63)
    .regex(/^[a-z0-9][a-z0-9-]*[a-z0-9]$/)
    .refine((val) => !val.includes("--"))
    .transform((val) => val.toLowerCase()),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export type SignInSchema = z.infer<typeof signInSchema>;
