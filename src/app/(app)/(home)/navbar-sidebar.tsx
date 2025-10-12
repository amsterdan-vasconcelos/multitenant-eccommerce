import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Link from "next/link";
import * as React from "react";

export function NavbarSidebar({
  children,
  ...props
}: React.ComponentProps<typeof Sheet>) {
  return (
    <Sheet {...props}>
      <SheetContent side="left" className="p-0 transition-none">
        <SheetHeader className="p-4 border-b">
          <div className="flex items-center">
            <SheetTitle>Menu</SheetTitle>
          </div>
        </SheetHeader>
        <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
          {children}
          <div className="border-t">
            <Link
              onClick={() => props.onOpenChange?.(false)}
              href="/sign-in"
              className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
            >
              Sign In
            </Link>
            <Link
              onClick={() => props.onOpenChange?.(false)}
              href="/sign-up"
              className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
            >
              Start Selling
            </Link>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

export function NavbarSidebarItem({
  ...props
}: React.ComponentProps<typeof Link>) {
  return (
    <Link
      className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
      {...props}
    />
  );
}
