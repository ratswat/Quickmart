import api from './api';

export const orderService = {
  // TODO: Implement all order methods

  createOrder: async (orderData: Record<string, any>) => {
    return api.post('/v1/orders', orderData);
  },

  getOrders: async (page = 1, limit = 10, status?: string) => {
    return api.get('/v1/orders', {
      params: { page, limit, status },
    });
  },

  getOrderById: async (orderId: string) => {
    return api.get(`/v1/orders/${orderId}`);
  },

  getOrderTracking: async (orderId: string) => {
    return api.get(`/v1/orders/${orderId}/tracking`);
  },

  cancelOrder: async (orderId: string) => {
    return api.post(`/v1/orders/${orderId}/cancel`);
  },

  requestReturn: async (orderId: string, reason: string) => {
    return api.post(`/v1/orders/${orderId}/return`, { reason });
  },
};

export default orderService;
