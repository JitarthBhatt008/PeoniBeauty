import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Save, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useProducts, useCreateProduct, useUpdateProduct, useDeleteProduct } from '@/hooks/use-products';
import { useCategories, useCreateCategory, useUpdateCategory, useDeleteCategory } from '@/hooks/use-categories';
import { useCarouselImages, useCreateCarouselImage, useUpdateCarouselImage, useDeleteCarouselImage } from '@/hooks/use-carousel';
import type { Product, Category, CarouselImage } from '@/services/api';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingCarousel, setEditingCarousel] = useState<CarouselImage | null>(null);

  // Products
  const { data: products = [], isLoading: productsLoading } = useProducts();
  const { data: categories = [] } = useCategories();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  // Categories
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();

  // Carousel Images
  const { data: carouselImages = [], isLoading: carouselLoading } = useCarouselImages();
  const createCarouselImage = useCreateCarouselImage();
  const updateCarouselImage = useUpdateCarouselImage();
  const deleteCarouselImage = useDeleteCarouselImage();

  // Product form state
  const [productForm, setProductForm] = useState({
    name: '',
    brand: '',
    price: '',
    original_price: '',
    category_id: '',
    description: '',
    image: '',
    rating: '5',
    tags: ''
  });

  // Category form state
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    slug: ''
  });

  // Carousel form state
  const [carouselForm, setCarouselForm] = useState({
    url: '',
    alt: '',
    order_index: '0'
  });

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      ...productForm,
      price: parseInt(productForm.price),
      original_price: productForm.original_price ? parseInt(productForm.original_price) : null,
      category_id: productForm.category_id || null,
      rating: parseFloat(productForm.rating),
      tags: productForm.tags ? productForm.tags.split(',').map(tag => tag.trim()) : []
    };

    if (editingProduct) {
      updateProduct.mutate({ id: editingProduct.id, updates: productData });
    } else {
      createProduct.mutate(productData);
    }

    resetProductForm();
  };

  const handleCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const categoryData = {
      name: categoryForm.name,
      slug: categoryForm.slug
    };

    if (editingCategory) {
      updateCategory.mutate({ id: editingCategory.id, updates: categoryData });
    } else {
      createCategory.mutate(categoryData);
    }

    resetCategoryForm();
  };

  const handleCarouselSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const carouselData = {
      ...carouselForm,
      order_index: parseInt(carouselForm.order_index)
    };

    if (editingCarousel) {
      updateCarouselImage.mutate({ id: editingCarousel.id, updates: carouselData });
    } else {
      createCarouselImage.mutate(carouselData);
    }

    resetCarouselForm();
  };

  const resetProductForm = () => {
    setProductForm({
      name: '',
      brand: '',
      price: '',
      original_price: '',
      category_id: '',
      description: '',
      image: '',
      rating: '5',
      tags: ''
    });
    setEditingProduct(null);
  };

  const resetCategoryForm = () => {
    setCategoryForm({
      name: '',
      slug: ''
    });
    setEditingCategory(null);
  };

  const resetCarouselForm = () => {
    setCarouselForm({
      url: '',
      alt: '',
      order_index: '0'
    });
    setEditingCarousel(null);
  };

  const editProduct = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      brand: product.brand,
      price: product.price.toString(),
      original_price: product.original_price?.toString() || '',
      category_id: product.category_id || '',
      description: product.description || '',
      image: product.image || '',
      rating: product.rating?.toString() || '5',
      tags: product.tags?.join(', ') || ''
    });
  };

  const editCategory = (category: Category) => {
    setEditingCategory(category);
    setCategoryForm({
      name: category.name,
      slug: category.slug
    });
  };

  const editCarousel = (carousel: CarouselImage) => {
    setEditingCarousel(carousel);
    setCarouselForm({
      url: carousel.url,
      alt: carousel.alt || '',
      order_index: carousel.order_index?.toString() || '0'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-hero pt-20 pb-16">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="gradient-primary bg-clip-text text-transparent">
              Admin Dashboard
            </span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Manage your Korean beauty products and content
          </p>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="carousel">Carousel</TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-8">
            <Card className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-4">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h3>
              <form onSubmit={handleProductSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Product Name</Label>
                    <Input
                      id="name"
                      value={productForm.name}
                      onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="brand">Brand</Label>
                    <Input
                      id="brand"
                      value={productForm.brand}
                      onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Price (₹)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={productForm.price}
                      onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="original_price">Original Price (₹)</Label>
                    <Input
                      id="original_price"
                      type="number"
                      value={productForm.original_price}
                      onChange={(e) => setProductForm({ ...productForm, original_price: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <select
                      id="category"
                      value={productForm.category_id}
                      onChange={(e) => setProductForm({ ...productForm, category_id: e.target.value })}
                      className="w-full p-2 border rounded-md bg-background"
                    >
                      <option value="">Select Category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="rating">Rating</Label>
                    <Input
                      id="rating"
                      type="number"
                      step="0.1"
                      min="0"
                      max="5"
                      value={productForm.rating}
                      onChange={(e) => setProductForm({ ...productForm, rating: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    value={productForm.image}
                    onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    value={productForm.tags}
                    onChange={(e) => setProductForm({ ...productForm, tags: e.target.value })}
                    placeholder="Vitamin C, Brightening, Anti-aging"
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit" disabled={createProduct.isPending || updateProduct.isPending}>
                    {createProduct.isPending || updateProduct.isPending ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    {editingProduct ? 'Update Product' : 'Add Product'}
                  </Button>
                  {editingProduct && (
                    <Button type="button" variant="outline" onClick={resetProductForm}>
                      <X className="w-4 h-4" />
                      Cancel
                    </Button>
                  )}
                </div>
              </form>
            </Card>

            {/* Products List */}
            <Card className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-4">All Products</h3>
              {productsLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin" />
                </div>
              ) : (
                <div className="space-y-4">
                  {products.map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">{product.name}</h4>
                        <p className="text-sm text-muted-foreground">{product.brand} • ₹{product.price}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => editProduct(product)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deleteProduct.mutate(product.id)}
                          disabled={deleteProduct.isPending}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories" className="space-y-8">
            <Card className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-4">
                {editingCategory ? 'Edit Category' : 'Add New Category'}
              </h3>
              <form onSubmit={handleCategorySubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="categoryName">Category Name</Label>
                    <Input
                      id="categoryName"
                      value={categoryForm.name}
                      onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="categorySlug">Slug</Label>
                    <Input
                      id="categorySlug"
                      value={categoryForm.slug}
                      onChange={(e) => setCategoryForm({ ...categoryForm, slug: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button type="submit" disabled={createCategory.isPending || updateCategory.isPending}>
                    {createCategory.isPending || updateCategory.isPending ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    {editingCategory ? 'Update Category' : 'Add Category'}
                  </Button>
                  {editingCategory && (
                    <Button type="button" variant="outline" onClick={resetCategoryForm}>
                      <X className="w-4 h-4" />
                      Cancel
                    </Button>
                  )}
                </div>
              </form>
            </Card>

            {/* Categories List */}
            <Card className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-4">All Categories</h3>
              <div className="space-y-4">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">{category.name}</h4>
                      <p className="text-sm text-muted-foreground">{category.slug}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => editCategory(category)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteCategory.mutate(category.id)}
                        disabled={deleteCategory.isPending}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Carousel Tab */}
          <TabsContent value="carousel" className="space-y-8">
            <Card className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-4">
                {editingCarousel ? 'Edit Carousel Image' : 'Add New Carousel Image'}
              </h3>
              <form onSubmit={handleCarouselSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="carouselUrl">Image URL</Label>
                    <Input
                      id="carouselUrl"
                      value={carouselForm.url}
                      onChange={(e) => setCarouselForm({ ...carouselForm, url: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="carouselAlt">Alt Text</Label>
                    <Input
                      id="carouselAlt"
                      value={carouselForm.alt}
                      onChange={(e) => setCarouselForm({ ...carouselForm, alt: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="carouselOrder">Order Index</Label>
                    <Input
                      id="carouselOrder"
                      type="number"
                      value={carouselForm.order_index}
                      onChange={(e) => setCarouselForm({ ...carouselForm, order_index: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button type="submit" disabled={createCarouselImage.isPending || updateCarouselImage.isPending}>
                    {createCarouselImage.isPending || updateCarouselImage.isPending ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    {editingCarousel ? 'Update Image' : 'Add Image'}
                  </Button>
                  {editingCarousel && (
                    <Button type="button" variant="outline" onClick={resetCarouselForm}>
                      <X className="w-4 h-4" />
                      Cancel
                    </Button>
                  )}
                </div>
              </form>
            </Card>

            {/* Carousel Images List */}
            <Card className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-4">Carousel Images</h3>
              {carouselLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin" />
                </div>
              ) : (
                <div className="space-y-4">
                  {carouselImages.map((carousel) => (
                    <div key={carousel.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <img
                          src={carousel.url}
                          alt={carousel.alt || 'Carousel image'}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div>
                          <h4 className="font-semibold">{carousel.alt || 'No alt text'}</h4>
                          <p className="text-sm text-muted-foreground">Order: {carousel.order_index}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => editCarousel(carousel)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deleteCarouselImage.mutate(carousel.id)}
                          disabled={deleteCarouselImage.isPending}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;