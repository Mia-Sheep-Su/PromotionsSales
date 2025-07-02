import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const DISCOUNT_RATE = 0.7; // 7折

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} className="group">
      <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <CardHeader className="p-0 border-b">
          <div className="relative aspect-square w-full">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <CardTitle className="font-headline text-base md:text-lg leading-tight line-clamp-2">
            {product.title}
          </CardTitle>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex items-center">
          <div className="flex items-baseline gap-2">
            <p className="text-base md:text-xl font-bold text-accent">
              ${(product.price * DISCOUNT_RATE).toFixed(2)}
            </p>
            <p className="text-xs md:text-sm text-muted-foreground line-through">
              ${product.price.toFixed(2)}
            </p>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
