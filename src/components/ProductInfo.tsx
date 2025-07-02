'use client';

import type { Product } from '@/types';
import { Star } from 'lucide-react';
import { ProductActionButtons } from './ProductActionButtons';

const DISCOUNT_RATE = 0.7; // 7折

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const rating = product.rating.rate;
  const ratingCount = product.rating.count;

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-4xl font-headline font-bold tracking-tight">{product.title}</h1>

      <div className="flex items-center gap-2">
         <div className="flex items-center gap-0.5">
           {[...Array(5)].map((_, i) => (
             <Star key={i} className={`h-5 w-5 ${i < Math.round(rating) ? 'text-primary fill-primary' : 'text-muted-foreground'}`} />
           ))}
         </div>
         <span className="text-sm text-muted-foreground">({ratingCount} 則評論)</span>
      </div>

      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-bold text-accent">
          ${(product.price * DISCOUNT_RATE).toFixed(2)}
        </span>
        <span className="text-xl text-muted-foreground line-through">
          ${product.price.toFixed(2)}
        </span>
      </div>

      <p className="text-base text-foreground/80 leading-relaxed">{product.description}</p>
      
      <div className="hidden md:block mt-4">
        <ProductActionButtons product={product} />
      </div>
    </div>
  );
}
