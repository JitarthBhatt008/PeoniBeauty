import { motion } from 'framer-motion';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Card } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { useCarouselImages } from '@/hooks/use-carousel';
import { useProducts } from '@/hooks/use-products';

const ProductCarousel = () => {
  const [api, setApi] = useState<any>(null);
  const { data: carouselImages = [] } = useCarouselImages();
  const { data: products = [] } = useProducts();

  // Use carousel images if available, otherwise use featured products
  const displayItems = carouselImages.length > 0 
    ? carouselImages.map(img => ({
        id: img.id,
        name: img.alt || 'Featured Product',
        image: img.url,
        brand: 'Peoni Beauty'
      }))
    : products.slice(0, 4).map(product => ({
        id: product.id,
        name: product.name,
        image: product.image || '/src/assets/product1.jpg',
        brand: product.brand
      }));

  useEffect(() => {
    if (!api) return;

    const autoScroll = setInterval(() => {
      api.scrollNext();
    }, 3000);

    return () => clearInterval(autoScroll);
  }, [api]);

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-muted-foreground">
            Discover our premium Korean beauty collection
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-5xl mx-auto"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {displayItems.map((product, index) => (
                <CarouselItem key={product.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="glass-card overflow-hidden hover:glow-effect smooth-transition">
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover smooth-transition hover:scale-105"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="font-playfair font-semibold text-lg mb-2">
                          {product.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {product.brand}
                        </p>
                      </div>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductCarousel;