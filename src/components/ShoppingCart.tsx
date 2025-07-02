'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose
} from '@/components/ui/sheet';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { useCart } from '@/context/CartProvider';
import { X } from 'lucide-react';

const DISCOUNT_RATE = 0.7; // 7折

export function ShoppingCartSheet({ children }: { children: React.ReactNode }) {
  const { cartItems, cartCount, removeFromCart } = useCart();
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal * DISCOUNT_RATE;

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex w-full flex-col px-0 sm:max-w-lg">
        <SheetHeader className="px-6">
          <SheetTitle>你的購物車 ({cartCount})</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex-1">
          <div className="px-6">
            {cartItems.length > 0 ? (
              <div className="flex flex-col gap-6 py-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-contain"
                        sizes="80px"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm line-clamp-2">{item.title}</h4>
                      <div className="flex items-baseline gap-2 text-sm mt-1">
                        <span className="text-accent font-bold">
                          ${(item.price * DISCOUNT_RATE).toFixed(2)}
                        </span>
                        <span className="text-muted-foreground line-through">
                          ${item.price.toFixed(2)}
                        </span>
                      </div>
                       <p className="text-xs text-muted-foreground mt-1">數量: {item.quantity}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove item</span>
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex h-full flex-col items-center justify-center space-y-2 text-center py-16">
                <h3 className="text-lg font-semibold">你的購物車是空的</h3>
                <p className="text-sm text-muted-foreground">快去把喜歡的商品加進來吧！</p>
              </div>
            )}
          </div>
        </ScrollArea>
        {cartItems.length > 0 && (
          <SheetFooter className="bg-secondary/50 px-6 py-4">
            <div className="w-full space-y-4">
              <div className="flex justify-between text-base font-semibold">
                <p>總計</p>
                <p>${total.toFixed(2)}</p>
              </div>
              <SheetClose asChild>
                <Button asChild className="w-full bg-accent hover:bg-accent/90">
                  <Link href="/checkout">前往結帳</Link>
                </Button>
              </SheetClose>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
