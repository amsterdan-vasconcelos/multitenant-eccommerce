import { Category } from "@/payload-types";
import Link from "next/link";
import { CustomCategory } from "../types";

type SubcategoryMenuProps = {
  category: CustomCategory;
  isOpen: boolean;
  position: {
    top: number;
    left: number;
  };
};

export function SubcategoryMenu({
  category,
  isOpen,
  position,
}: SubcategoryMenuProps) {
  if (
    !isOpen ||
    !category.subcategories ||
    category.subcategories.length === 0
  ) {
    return null;
  }
  const subcategories = category.subcategories;
  const backgroundColor = category.color || "#f5f5f5";

  return (
    <div
      className="fixed z-100"
      style={{ top: position.top, left: position.left }}
    >
      <div className="h-3 w-60" />
      <div
        style={{ backgroundColor }}
        className="w-60 text-black rounded-md overflow-hidden border shadown shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-[2px] -translate-y-[2px]"
      >
        <div>
          {subcategories.map((sub: Category) => (
            <Link
              href={`/${category.slug}/${sub.slug}`}
              key={sub.slug}
              className="w-full text-left p-4 hover:bg-black hover:text-white flex justify-between items-center underline font-medium"
            >
              {sub.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
