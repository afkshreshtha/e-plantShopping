import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
    
  },
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      
      if (existingItem) {
        // If item already exists, increase quantity
        existingItem.quantity += newItem.quantity || 1;
      } else {
        // If item doesn't exist, add it to cart
        state.items.push({
          ...newItem,
          quantity: newItem.quantity || 1
        });
      }
    },
    removeItem: (state, action) => {
      // Remove item by ID
      const idToRemove = action.payload;
      state.items = state.items.filter(item => item.id !== idToRemove);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.id === id);
      
      if (itemToUpdate) {
        if (quantity > 0) {
          // Update quantity if it's greater than zero
          itemToUpdate.quantity = quantity;
        } else {
          // Remove item if quantity is zero or negative
          state.items = state.items.filter(item => item.id !== id);
        }
      }
    },
  },
});

export const { addToCart, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;