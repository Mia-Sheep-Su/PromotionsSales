'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { Product } from '@/types';
import { getProducts } from '@/lib/api';
import { ProductCard } from './ProductCard';
import { Skeleton } from './ui/skeleton';

interface ProductGridProps {
  initialProducts: Product[];
  allProducts: Product[]; // For client-side filtering
}

export function ProductGrid({ initialProducts, allProducts }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const loaderRef = useRef(null);

  const loadMoreProducts = useCallback(async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    // In a real scenario with a proper API, offset would be products.length
    // Here we simulate by fetching from the full list.
    const newProducts = allProducts.slice(products.length, products.length + 4);

    if (newProducts.length > 0) {
      setProducts((prev) => [...prev, ...newProducts]);
    } else {
      setHasMore(false);
    }
    setIsLoading(false);
  }, [isLoading, hasMore, products.length, allProducts]);

  useEffect(() => {
    setProducts(initialProducts);
    setHasMore(initialProducts.length < allProducts.length);
  }, [initialProducts, allProducts.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreProducts();
        }
      },
      { threshold: 1.0 }
    );

    const loader = loaderRef.current;
    if (loader) {
      observer.observe(loader);
    }

    return () => {
      if (loader) {
        observer.unobserve(loader);
      }
    };
  }, [loadMoreProducts]);

  return (
    <div className="py-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div ref={loaderRef} className="flex justify-center py-8">
        {isLoading && (
           <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {[...Array(4)].map((_, i) => (
               <div key={i} className="flex flex-col space-y-3">
                 <Skeleton className="h-[250px] w-full rounded-xl" />
                 <div className="space-y-2">
                   <Skeleton className="h-4 w-full" />
                   <Skeleton className="h-4 w-3/4" />
                 </div>
               </div>
            ))}
           </div>
        )}
        {!hasMore && products.length > 0 && (
          <p className="text-muted-foreground">已經到底囉！</p>
        )}
      </div>
    </div>
  );
}
