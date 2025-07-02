import { getProductById } from '@/lib/api';
import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductImageGallery } from '@/components/ProductImageGallery';
import { ProductInfo } from '@/components/ProductInfo';
import { ReviewCarousel } from '@/components/ReviewCarousel';
import Image from 'next/image';
import { ProductActionButtons } from '@/components/ProductActionButtons';

export default async function ProductPage({ params }: { params: { id: string } }) {
  const productId = parseInt(params.id, 10);
  if (isNaN(productId)) {
    notFound();
  }

  const product = await getProductById(productId);

  if (!product) {
    notFound();
  }
  
  // Fake multiple images for gallery demonstration
  const images = [product.image, "https://placehold.co/600x600.png", "https://placehold.co/600x600.png"];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <div>
              <ProductImageGallery images={images} productName={product.title} />
            </div>
            <div>
              <ProductInfo product={product} />
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-3xl font-headline font-bold text-center mb-8">商品詳情</h2>
             <div className="relative w-full aspect-[9/16] md:aspect-video">
              <Image
                  src="https://placehold.co/600x900.png"
                  alt="Product details vertical"
                  fill
                  className="object-cover rounded-lg block md:hidden"
                  data-ai-hint="product detail vertical"
              />
              <Image
                  src="https://placehold.co/1200x600.png"
                  alt="Product details"
                  fill
                  className="object-cover rounded-lg hidden md:block"
                  data-ai-hint="product lifestyle"
              />
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-3xl font-headline font-bold text-center mb-8">顧客評價</h2>
            <ReviewCarousel />
          </div>
        </div>
        <div className="md:hidden sticky bottom-0 bg-background/90 backdrop-blur-sm p-4 border-t z-40">
          <div className="container mx-auto px-4">
            <ProductActionButtons product={product} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
