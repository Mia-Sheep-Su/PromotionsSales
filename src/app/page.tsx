import { getProducts } from "@/lib/api";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HomePageClient } from "@/components/HomePageClient";
import type { Product } from "@/types";

export default async function Home() {
  let allProducts: Product[] = [];
  try {
    allProducts = await getProducts();
  } catch (error) {
    console.error("Failed to fetch products:", error);
    // You can render an error state here if needed
  }
  
  const categories = allProducts.length > 0 
    ? [...new Set(allProducts.map((p) => p.category))]
    : [];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <HomePageClient 
          allProducts={allProducts}
          categories={categories}
        />
      </main>
      <Footer />
    </div>
  );
}
