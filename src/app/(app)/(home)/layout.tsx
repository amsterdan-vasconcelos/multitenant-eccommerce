import configPromise from "@payload-config";
import { getPayload } from "payload";

import { Footer } from "./footer";
import { Navbar } from "./navbar";
import { SearchFilters } from "./search-filters";
import { Category } from "@/payload-types";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const payload = await getPayload({
    config: configPromise,
  });

  const { docs } = await payload.find({
    collection: "categories",
    depth: 1,
    pagination: false,
    where: {
      parent: {
        exists: false,
      },
    },
  });

  const formatedData = docs.map((doc) => {
    const subDocs = doc.subcategories?.docs ?? [];
    const subcategories = subDocs.map((doc) => ({
      ...(doc as Category),
      subcategories: undefined,
    }));

    return { ...doc, subcategories };
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <SearchFilters data={formatedData} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
