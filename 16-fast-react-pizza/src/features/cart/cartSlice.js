import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [
    { pizzaId: 0, name: "dasdsa", quantity: 5, unitPrice: 65, totalPrice: 12 },
  ],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      state.totalPrice = state.unitPrice * state.quantity;
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity--;
      state.totalPrice = state.unitPrice * state.quantity;
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
