import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
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

export const getCart = (state) => state.cart.cart;

export const isCurrentItemInCart = (id) => (state) =>
  state.cart.cart.find((item) => id === item.pizzaId)?.quantity ? true : false;

export const {
  addItem,
  deleteItem,
  increseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
