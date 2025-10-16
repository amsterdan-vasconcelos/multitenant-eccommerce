import { CustomCategory } from "../types";
import { Categories } from "./categories";
import { SearchInput } from "./search-input";

export function SearchFilters({ data }: { data: CustomCategory[] }) {
  return (
    <div className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full">
      <SearchInput data={data} />
      <Categories data={data} />
    </div>
  );
}
