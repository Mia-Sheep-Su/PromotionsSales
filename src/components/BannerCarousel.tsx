'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { bannerImages } from '@/data/banners';
import { Card, CardContent } from '@/components/ui/card';

export function BannerCarousel() {
  return (
    <div className="w-full">
      <Carousel
        className="w-full"
        plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]}
        opts={{ loop: true }}
      >
        <CarouselContent>
          {bannerImages.map((banner, index) => {
            const isExternal = banner.href?.startsWith('http');
            return (
              <CarouselItem key={index}>
                <Link
                  href={banner.href || '#'}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  prefetch={isExternal ? false : undefined}
                >
                  <Card className="overflow-hidden border-0 rounded-none cursor-pointer">
                    <CardContent className="p-0">
                      <div className="h-[80vh] md:h-[80vh] relative w-full">
                        <Image
                          src={banner.src}
                          alt={banner.alt}
                          fill
                          className="object-cover hidden md:block"
                          sizes="100vw"
                          data-ai-hint={banner['data-ai-hint']}
                          priority={index === 0}
                        />
                        <Image
                          src={banner.srcMobile}
                          alt={banner.alt}
                          fill
                          className="object-cover block md:hidden"
                          sizes="100vw"
                          data-ai-hint={banner['data-ai-hint-mobile']}
                          priority={index === 0}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
      </Carousel>
    </div>
  );
}
