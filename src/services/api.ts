import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

export type Product = Database['public']['Tables']['products']['Row'];
export type Category = Database['public']['Tables']['categories']['Row'];
export type CarouselImage = Database['public']['Tables']['carousel_images']['Row'];

export type ProductWithCategory = Product & {
  category: Category | null;
};

// Products API
export const productsApi = {
  // Get all products with optional category filter
  async getProducts(categoryId?: string): Promise<ProductWithCategory[]> {
    let query = supabase
      .from('products')
      .select(`
        *,
        category:categories(*)
      `)
      .order('created_at', { ascending: false });

    if (categoryId) {
      query = query.eq('category_id', categoryId);
    }

    const { data, error } = await query;
    
    if (error) {
      throw new Error(`Failed to fetch products: ${error.message}`);
    }

    return data || [];
  },

  // Get a single product by ID
  async getProduct(id: string): Promise<ProductWithCategory | null> {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories(*)
      `)
      .eq('id', id)
      .single();

    if (error) {
      throw new Error(`Failed to fetch product: ${error.message}`);
    }

    return data;
  },

  // Search products
  async searchProducts(searchTerm: string): Promise<ProductWithCategory[]> {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories(*)
      `)
      .or(`name.ilike.%${searchTerm}%,brand.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to search products: ${error.message}`);
    }

    return data || [];
  },

  // Create a new product (admin only)
  async createProduct(product: Database['public']['Tables']['products']['Insert']): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .insert(product)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create product: ${error.message}`);
    }

    return data;
  },

  // Update a product (admin only)
  async updateProduct(id: string, updates: Database['public']['Tables']['products']['Update']): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update product: ${error.message}`);
    }

    return data;
  },

  // Delete a product (admin only)
  async deleteProduct(id: string): Promise<void> {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Failed to delete product: ${error.message}`);
    }
  }
};

// Categories API
export const categoriesApi = {
  // Get all categories
  async getCategories(): Promise<Category[]> {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');

    if (error) {
      throw new Error(`Failed to fetch categories: ${error.message}`);
    }

    return data || [];
  },

  // Create a new category (admin only)
  async createCategory(category: Database['public']['Tables']['categories']['Insert']): Promise<Category> {
    const { data, error } = await supabase
      .from('categories')
      .insert(category)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create category: ${error.message}`);
    }

    return data;
  },

  // Update a category (admin only)
  async updateCategory(id: string, updates: Database['public']['Tables']['categories']['Update']): Promise<Category> {
    const { data, error } = await supabase
      .from('categories')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update category: ${error.message}`);
    }

    return data;
  },

  // Delete a category (admin only)
  async deleteCategory(id: string): Promise<void> {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Failed to delete category: ${error.message}`);
    }
  }
};

// Carousel Images API
export const carouselApi = {
  // Get all carousel images
  async getCarouselImages(): Promise<CarouselImage[]> {
    const { data, error } = await supabase
      .from('carousel_images')
      .select('*')
      .order('order_index');

    if (error) {
      throw new Error(`Failed to fetch carousel images: ${error.message}`);
    }

    return data || [];
  },

  // Create a new carousel image (admin only)
  async createCarouselImage(image: Database['public']['Tables']['carousel_images']['Insert']): Promise<CarouselImage> {
    const { data, error } = await supabase
      .from('carousel_images')
      .insert(image)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create carousel image: ${error.message}`);
    }

    return data;
  },

  // Update a carousel image (admin only)
  async updateCarouselImage(id: string, updates: Database['public']['Tables']['carousel_images']['Update']): Promise<CarouselImage> {
    const { data, error } = await supabase
      .from('carousel_images')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update carousel image: ${error.message}`);
    }

    return data;
  },

  // Delete a carousel image (admin only)
  async deleteCarouselImage(id: string): Promise<void> {
    const { error } = await supabase
      .from('carousel_images')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Failed to delete carousel image: ${error.message}`);
    }
  }
}; 