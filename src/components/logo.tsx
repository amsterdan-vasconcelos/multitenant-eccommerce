import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

const poppins = Poppins({ subsets: ["latin"], weight: "700" });

export function Logo({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn("text-5xl font-semibold", poppins.className, className)}
      {...props}
    >
      funroad
    </span>
  );
}
