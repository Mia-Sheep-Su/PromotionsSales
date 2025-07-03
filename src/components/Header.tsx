'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ShoppingCartSheet } from './ShoppingCart';
import { useCart } from '@/context/CartProvider';
import { cn } from '@/lib/utils';

export function Header() {
  const { cartCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // When the user scrolls more than 10px, we'll change the header's style
      setIsScrolled(window.scrollY > 10);
    };

    // Add the scroll event listener when the component mounts
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // The empty array ensures this effect runs only once

  return (
    <header
      className={cn(
        // Use 'fixed' to take the header out of the document flow, allowing it to overlay content.
        'fixed top-0 z-50 w-full transition-colors duration-300 ease-in-out',
        // Conditional classes: apply a background and border only when scrolled
        isScrolled
          ? 'border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'
          : 'border-transparent'
      )}
    >
      <div className="container flex h-16 items-center px-6">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold font-headline text-xl sm:inline-block">
              ShopStream
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <ShoppingCartSheet>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-accent-foreground text-xs font-bold">
                  {cartCount}
                </span>
              )}
              <span className="sr-only">Open shopping cart</span>
            </Button>
          </ShoppingCartSheet>
        </div>
      </div>
    </header>
  );
}
