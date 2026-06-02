import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  name: string;
}

interface CartState {
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  discount: number;
  couponCode?: string;
}

const initialState: CartState = {
  items: [],
  subtotal: 0,
  tax: 0,
  total: 0,
  discount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find((item) => item.productId === action.payload.productId);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      // TODO: Recalculate totals
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      // TODO: Recalculate totals
    },
    updateQuantity: (state, action: PayloadAction<{ itemId: string; quantity: number }>) => {
      const item = state.items.find((item) => item.id === action.payload.itemId);
      if (item) {
        item.quantity = action.payload.quantity;
      }
      // TODO: Recalculate totals
    },
    clearCart: (state) => {
      state.items = [];
      state.subtotal = 0;
      state.tax = 0;
      state.total = 0;
      state.discount = 0;
      state.couponCode = undefined;
    },
    applyCoupon: (state, action: PayloadAction<{ code: string; discount: number }>) => {
      state.couponCode = action.payload.code;
      state.discount = action.payload.discount;
      // TODO: Recalculate total with discount
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart, applyCoupon } = cartSlice.actions;
export default cartSlice.reducer;
