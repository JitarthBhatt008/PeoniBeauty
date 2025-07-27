import { motion } from 'framer-motion';
import { Instagram, Heart, Star, ArrowRight, Search, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useProducts, useSearchProducts } from '@/hooks/use-products';
import { useCategories } from '@/hooks/use-categories';
import { createInstagramDMLink, createOrderMessage, SOCIAL_CONFIG } from '@/config/social';
import { toast } from 'sonner';

// Dialog imports
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showDialog, setShowDialog] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState('');

  const { data: products = [], isLoading: productsLoading, error: productsError } = useProducts(
    selectedCategory !== 'all' ? selectedCategory : undefined
  );

  const { data: categories = [], isLoading: categoriesLoading } = useCategories();
  const { data: searchResults = [], isLoading: searchLoading } = useSearchProducts(searchTerm);

  const displayProducts = searchTerm.length > 0 ? searchResults : products;
  const isLoading = productsLoading || categoriesLoading || searchLoading;

  const allCategories = [
    { id: 'all', name: 'All Products', slug: 'all' },
    ...categories
  ];

  const handleOrderProduct= (productName: string) => {
    const message = createOrderMessage(productName);
    setCopiedMessage(message);
    const instagramUrl = `https://www.instagram.com/peonibeautyy`;
  
    try {
      navigator.clipboard.writeText(message).then(() => {
        setShowDialog(true);
      }).catch(() => {
        toast.error(`Please copy this message and send it to @${SOCIAL_CONFIG.INSTAGRAM_HANDLE}:\n\n${message}`);
      });
      navigator.clipboard.writeText(message);
    } catch (e) {
      console.warn('Clipboard failed', e);
    }
  
    // Redirect right after user action
    setTimeout(() => {
      window.location.href = instagramUrl;
    }, 5);
  };

  return (
    <div className="min-h-screen bg-gradient-hero pt-20 pb-16">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="gradient-primary bg-clip-text text-transparent">
              Our Products
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Premium Korean Beauty Products
          </p>
          <div className="glass-card inline-flex items-center space-x-2 px-6 py-3 rounded-full">
            <Instagram className="w-5 h-5 text-primary" />
            <span className="text-sm">All orders via Instagram DM</span>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 space-y-6"
        >
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 glass-card border-primary/20 focus:border-primary/40"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {allCategories.map((category) => (
              <Badge
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "secondary"}
                className={`px-6 py-3 text-sm smooth-transition cursor-pointer ${
                  selectedCategory === category.id
                    ? "gradient-primary text-white"
                    : "glass-card hover:bg-primary/10 hover:border-primary/40"
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </Badge>
            ))}
          </div>
        </motion.div>

        {/* Product Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : productsError ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Failed to load products. Please try again later.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayProducts.length === 0 ? (
              <div className="text-center col-span-full py-12">
                <p className="text-muted-foreground text-lg">No products available.</p>
              </div>
            ) : (
              displayProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="glass-card p-6 h-full hover:glow-effect smooth-transition">
                    <div className="text-center mb-6">
                      <div className="w-full h-48 mb-4 rounded-lg overflow-hidden">
                        <img
                          src={product.image || '/src/assets/product1.jpg'}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex justify-center items-center space-x-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating || 5)
                                ? 'text-yellow-400 fill-current'
                                : 'text-muted-foreground'
                            }`}
                          />
                        ))}
                        <span className="text-sm text-muted-foreground ml-2">
                          {product.rating || 5}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">{product.brand}</p>
                        <h3 className="text-lg font-semibold mb-3">{product.name}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {product.description || 'No description available'}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {product.tags?.map((tag, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-primary">₹{product.price}</span>
                        {product.original_price && (
                          <span className="text-sm text-muted-foreground line-through">
                            ₹{product.original_price}
                          </span>
                        )}
                      </div>
                      <Button
                        className="w-full instagram-button smooth-transition hover:scale-105"
                        onClick={() => handleOrderProduct(product.name)}
                      >
                        <Instagram className="w-4 h-4 mr-2" />
                        Order Inquiry
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        )}

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Card className="glass-card p-8 max-w-2xl mx-auto">
            <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Looking for More Products?</h3>
            <p className="text-muted-foreground mb-6">
              Contact us via Instagram DM for personalized product recommendations and our complete catalog!
            </p>
            <Button
              size="lg"
              className="gradient-primary glow-effect smooth-transition hover:scale-105"
              onClick={() => window.open(createInstagramDMLink(), '_blank')}
            >
              <Instagram className="w-5 h-5 mr-2" />
              Request Full Catalog
            </Button>
          </Card>
        </motion.div>
      </div>

      {/* Custom Modal */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Message Copied</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground mb-4">
            "{copiedMessage}"
          </p>
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                window.location.href = createInstagramDMLink();
                setShowDialog(false);
              }}
            >
              Open Instagram
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Products;
