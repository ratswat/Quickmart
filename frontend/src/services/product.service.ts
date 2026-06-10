import api from './api';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  rating: number;
  reviews: number;
  stock: number;
  category: string;
}

export const productService = {
  // TODO: Implement all product methods

  getProducts: async (filters?: Record<string, any>) => {
    return api.get<{ products: Product[] }>('/v1/products', { params: filters });
  },

  getProductById: async (id: string) => {
    return api.get<{ product: Product }>(`/v1/products/${id}`);
  },

  searchProducts: async (query: string, filters?: Record<string, any>) => {
    return api.get('/v1/products/search', {
      params: { q: query, ...filters },
    });
  },

  getProductReviews: async (productId: string, page = 1, limit = 10) => {
    return api.get(`/v1/products/${productId}/reviews`, {
      params: { page, limit },
    });
  },

  addReview: async (productId: string, review: Record<string, any>) => {
    return api.post(`/v1/products/${productId}/reviews`, review);
  },
};

export default productService;
