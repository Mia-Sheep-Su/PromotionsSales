'use client';

import React, { useState, useMemo } from 'react';
import type { Product } from '@/types';
import { BannerCarousel } from './BannerCarousel';
import { CountdownTimer } from './CountdownTimer';
import { ProductFilters, type SortOption } from './ProductFilters';
import { ProductGrid } from './ProductGrid';

interface HomePageClientProps {
  allProducts: Product[];
  categories: string[];
}

export function HomePageClient({ allProducts, categories }: HomePageClientProps) {
  const [sort, setSort] = useState<SortOption>('rating-desc');
  const [category, setCategory] = useState('all');

  const filteredAndSortedProducts = useMemo(() => {
    let products = [...allProducts];

    // Filter by category
    if (category !== 'all') {
      products = products.filter((p) => p.category === category);
    }

    // Sort
    products.sort((a, b) => {
      switch (sort) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name-asc':
          return a.title.localeCompare(b.title);
        case 'name-desc':
          return b.title.localeCompare(a.title);
        case 'rating-asc':
          return a.rating.rate - b.rating.rate;
        case 'rating-desc':
          return b.rating.rate - a.rating.rate;
        default:
          return 0;
      }
    });

    return products;
  }, [allProducts, category, sort]);

  const initialGridProducts = useMemo(() => {
    return filteredAndSortedProducts.slice(0, 8);
  }, [filteredAndSortedProducts]);

  return (
    <>
      <BannerCarousel />
      <CountdownTimer />
      <div className="container mx-auto px-4">
        <div className="flex justify-end py-4">
          <ProductFilters
            categories={categories}
            onSortChange={setSort}
            onCategoryChange={setCategory}
            sortValue={sort}
            categoryValue={category}
          />
        </div>
        <ProductGrid
          initialProducts={initialGridProducts}
          allProducts={filteredAndSortedProducts}
        />
      </div>
    </>
  );
}
