"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavbarSidebar, NavbarSidebarItem } from "./navbar-sidebar";
import * as React from "react";
import { MenuIcon } from "lucide-react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "700",
});

const navbarItems: { href: string; children: React.ReactNode }[] = [
  { href: "/", children: "Home" },
  { href: "/about", children: "About" },
  { href: "/features", children: "Features" },
  { href: "/pricing", children: "Pricing" },
  { href: "/contact", children: "Contact" },
];

export function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <nav className="h-20 flex justify-between lg:pl-8 border-b font-medium bg-white">
      <Link href={"/"} className="flex items-center">
        <span className={cn("text-5xl font-semibold", poppins.className)}>
          funroad
        </span>
      </Link>

      <NavbarSidebar open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        {navbarItems.map(({ href, children }) => (
          <NavbarSidebarItem
            onClick={() => setIsSidebarOpen(false)}
            key={href}
            href={href}
          >
            {children}
          </NavbarSidebarItem>
        ))}
      </NavbarSidebar>

      <div className="items-center gap-4 hidden lg:flex">
        {navbarItems.map(({ href, children }) => (
          <NavbarItem key={href} href={href} isActive={pathname === href}>
            {children}
          </NavbarItem>
        ))}
      </div>

      <div className="hidden lg:flex">
        <SignButton href="/sign-in" className="bg-transparent text-black">
          Sign In
        </SignButton>
        <SignButton href="/sign-up">Start selling</SignButton>
      </div>

      <div className="flex lg:hidden items-center justify-center">
        <Button
          variant={"noShadow"}
          className="size-12 border-transparent bg-white"
          onClick={() => setIsSidebarOpen(true)}
        >
          <MenuIcon />
        </Button>
      </div>
    </nav>
  );
}

type NavbarItemProps = React.ComponentProps<typeof Link> & {
  isActive?: boolean;
};

function NavbarItem({ isActive, ...props }: NavbarItemProps) {
  return (
    <Button
      asChild
      variant={"noShadow"}
      className={cn(
        "bg-transparent hover:bg-transparent border-0",
        isActive && "border-2 border-border"
      )}
    >
      <Link {...props}></Link>
    </Button>
  );
}

function SignButton({
  className,
  ...props
}: React.ComponentProps<typeof Link>) {
  return (
    <Button
      variant={"noShadow"}
      className={cn(
        "h-full border-0 border-l rounded-none bg-black hover:bg-main text-white px-8 text-base",
        className
      )}
    >
      <Link {...props} />
    </Button>
  );
}
