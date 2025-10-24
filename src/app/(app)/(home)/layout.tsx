import { Suspense } from "react";
import { Footer } from "./footer";
import { Navbar } from "./navbar";
import { SearchFilters, SearchFiltersSkeleton } from "./search-filters";
import { getQueryClient, HydrateClient, trpc } from "@/trpc/server";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.categories.getMany.queryOptions());

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <HydrateClient>
        <Suspense fallback={<SearchFiltersSkeleton />}>
          <SearchFilters />
        </Suspense>
        <main className="flex-1">
          <Suspense fallback={<p>Jéssica linda...</p>}>{children}</Suspense>
        </main>
      </HydrateClient>
      <Footer />
    </div>
  );
}
