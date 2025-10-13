import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import * as React from "react";

export function SearchInput({ ...props }: React.ComponentProps<typeof Input>) {
  return (
    <div className="flex items-center gap-2 w-full">
      <div className="relative w-full">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
        <Input className="pl-8" placeholder="Search products" {...props} />
      </div>
    </div>
  );
}
