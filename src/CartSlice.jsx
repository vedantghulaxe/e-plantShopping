
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

export const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === newItem.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...newItem,
          quantity: 1,
        });
      }
    },

    removeItem: (state, action) => {
      const itemId =
        typeof action.payload === 'object'
          ? action.payload.id
          : action.payload;

      state.items = state.items.filter(
        (item) => item.id !== itemId
      );
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((product) => product.id === id);

      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(
            (product) => product.id !== id
          );
        } else {
          item.quantity = quantity;
        }
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } =
  CartSlice.actions;

export default CartSlice.reducer;
