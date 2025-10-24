"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import { useDropdownPosition } from "./use-dropdown-position";
import { SubcategoryMenu } from "./subcategory-menu";
import Link from "next/link";
import { CategoriesFindManyOutputSingle } from "@/modules/categories/types";

type CategoryDropdownProp = {
  category: CategoriesFindManyOutputSingle;
  isActive: boolean;
  isNavigationHovered: boolean;
};

export function CategoryDropdown({
  isActive,
  isNavigationHovered,
  category,
}: CategoryDropdownProp) {
  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const { getDropdownPosition } = useDropdownPosition(dropDownRef);
  const dropdownPosition = getDropdownPosition();

  function handleMouseEnter() {
    if (category.subcategories) {
      setIsOpen(true);
    }
  }

  function handleMouseLeave() {
    setIsOpen(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    e.preventDefault();

    if (e.key === "Enter" || e.key === " ") {
      if (category.subcategories.length) setIsOpen(!isOpen);
      return;
    }

    if (e.key === "Escape" && isOpen) {
      setIsOpen(false);
    }
  }

  return (
    <div
      className="relative"
      ref={dropDownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
    >
      <div className="relative">
        <Button
          className={cn(
            "h-11 px-4 bg-transparent border-transparent rounded-full hover:border-black hover:bg-white",
            isActive && !isNavigationHovered && "bg-white border-black",
            isOpen &&
              "bg-white translate-x-reverseBoxShadowX translate-y-reverseBoxShadowY shadow-shadow border-black"
          )}
        >
          <Link href={`/${category.slug === "all" ? "" : category.slug}`}>
            {category.name}
          </Link>
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
