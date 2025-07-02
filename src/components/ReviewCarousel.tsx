'use client';

import React, { useState, useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { customerReviews } from '@/data/reviews';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import Autoplay from 'embla-carousel-autoplay';

export function ReviewCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="flex justify-center">
      <Carousel
        setApi={setApi}
        opts={{
          align: 'center',
          loop: true,
        }}
        orientation="vertical"
        className="w-full max-w-lg"
        plugins={[Autoplay({ delay: 3000, stopOnInteraction: true })]}
      >
        <CarouselContent className="-mt-4 h-[320px] md:h-[420px]">
          {customerReviews.map((review, index) => (
            <CarouselItem key={index} className="pt-4 basis-1/3">
              <div className={cn(
                'p-1 h-full transition-all duration-300',
                current === index ? 'scale-100 opacity-100' : 'scale-90 opacity-50'
              )}>
                <Card className="h-full">
                  <CardContent className="flex flex-col items-center justify-center gap-2 md:gap-4 p-4 md:p-6 text-center h-full">
                    <Avatar className="h-12 w-12 md:h-16 md:w-16">
                      <AvatarImage src={review.avatar} alt={review.name} data-ai-hint={review['data-ai-hint']} />
                      <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-center gap-1">
                      <h3 className="font-semibold text-base md:text-lg">{review.name}</h3>
                      <div className="flex items-center gap-0.5">
                         {[...Array(5)].map((_, i) => (
                           <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-primary fill-primary' : 'text-muted-foreground'}`} />
                         ))}
                       </div>
                    </div>
                    <p className="text-muted-foreground text-sm line-clamp-3">&ldquo;{review.review}&rdquo;</p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
