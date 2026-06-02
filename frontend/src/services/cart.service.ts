import api from './api';

export const cartService = {
  // TODO: Implement all cart methods

  getCart: async () => {
    return api.get('/v1/cart');
  },

  addToCart: async (productId: string, quantity: number) => {
    return api.post('/v1/cart/items', { productId, quantity });
  },

  updateCartItem: async (itemId: string, quantity: number) => {
    return api.put(`/v1/cart/items/${itemId}`, { quantity });
  },

  removeFromCart: async (itemId: string) => {
    return api.delete(`/v1/cart/items/${itemId}`);
  },

  clearCart: async () => {
    return api.delete('/v1/cart');
  },

  applyCoupon: async (couponCode: string) => {
    return api.post('/v1/cart/apply-coupon', { couponCode });
  },
};

export default cartService;
