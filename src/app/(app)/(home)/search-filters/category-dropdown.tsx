"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Category } from "@/payload-types";
import * as React from "react";
import { useDropdownPosition } from "./use-dropdown-position";
import { SubcategoryMenu } from "./subcategory-menu";

type CategoryDropdownProp = {
  category: Category;
  isActive: boolean;
  isNavigationHovered: boolean;
};

export function CategoryDropdown({
  isActive,
  isNavigationHovered,
  category,
}: CategoryDropdownProp) {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropDownRef = React.useRef<HTMLDivElement>(null);
  const { getDropdownPosition } = useDropdownPosition(dropDownRef);
  const dropdownPosition = getDropdownPosition();

  function onMouseEnter() {
    if (category.subcategories) {
      setIsOpen(true);
    }
  }

  function onMouseLeave() {
    setIsOpen(false);
  }

  return (
    <div
      className="relative"
      ref={dropDownRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="relative">
        <Button
          className={cn(
            "h-11 px-4 bg-transparent border-transparent rounded-full hover:bg-white hover:border-black text-black",
            isActive && !isNavigationHovered && "bg-white border-black"
          )}
        >
          {category.name}
        </Button>
        {category.subcategories && category.subcategories.length > 0 && (
          <div
            className={cn(
              "absolute opacity-0 -bottom-3 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[10px] border-l-transparent border-r-transparent border-b-black left-1/2 -translate-x-1/2",
              isOpen && "opacity-100"
            )}
          />
        )}
      </div>

      <SubcategoryMenu
        category={category}
        isOpen={isOpen}
        position={dropdownPosition}
      />
    </div>
  );
}
