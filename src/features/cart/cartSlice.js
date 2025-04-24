import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalItems: 0,
  },
  reducers: {
    
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item._id === action.payload._id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item._id !== action.payload);
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
    },
    
    decreaseQuantity: (state, action) => {
      const item = state.items.find(item => item._id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter(i => i._id !== action.payload);
        }
        state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
      }
    },
  },
});

export const { addToCart, removeFromCart, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;