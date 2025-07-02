'use client';

import { useRouter } from 'next/navigation';
import type { Product } from '@/types';
import { Button } from './ui/button';
import { useCart } from '@/context/CartProvider';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface ProductActionButtonsProps {
  product: Product;
  className?: string;
}

export function ProductActionButtons({ product, className }: ProductActionButtonsProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "已加入購物車",
      description: product.title,
    });
  };

  const handleCheckout = () => {
    addToCart(product);
    router.push('/checkout');
  };

  return (
    <div className={cn("flex flex-row gap-4", className)}>
      <Button size="lg" onClick={handleAddToCart} variant="outline" className="flex-1 md:w-auto">加入購物車</Button>
      <Button size="lg" onClick={handleCheckout} className="flex-1 md:w-auto bg-accent hover:bg-accent/90">立即結帳</Button>
    </div>
  );
}
