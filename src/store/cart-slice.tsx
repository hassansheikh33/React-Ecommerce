import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cart, CartItem } from "../types";

let initialState: Cart = {
  cartItems: [],
  totalAmount: 0,
  totalNumItems: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      state.totalAmount += action.payload.price;
      state.totalNumItems += action.payload.amount;
      const indexToUpdate = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (indexToUpdate > -1) {
        //check if item already exists in the cart
        let itemToUpdate = state.cartItems[indexToUpdate];
        itemToUpdate = {
          ...itemToUpdate,
          amount: itemToUpdate.amount + action.payload.amount,
        }; //updating the amount here
        state.cartItems[indexToUpdate] = itemToUpdate;
      } else {
        //if item doesnt already exist in the cart, push it as a new item obj
        state.cartItems.push(action.payload);
      }
    },
    removeItem(state, action: PayloadAction<CartItem>) {
      state.totalAmount -= action.payload.price;
      state.totalNumItems -= action.payload.amount;
      const indexToUpdate = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (indexToUpdate > -1) {
        let itemToUpdate = state.cartItems[indexToUpdate];
        if (itemToUpdate.amount === 1) {
          state.cartItems = state.cartItems.filter(
            (item) => item.id !== action.payload.id
          );
        } else {
          itemToUpdate = {
            ...itemToUpdate,
            amount: itemToUpdate.amount - action.payload.amount,
          };
          state.cartItems[indexToUpdate] = itemToUpdate;
        }
      }
    },
    deleteOneItem(state, action: PayloadAction<CartItem>) {
      state.totalAmount = state.totalAmount -=
        action.payload.price * action.payload.amount;
      state.totalNumItems = state.totalNumItems -= action.payload.amount;
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
    },
    deleteAll(state) {
      state.totalAmount = 0;
      state.totalNumItems = 0;
      state.cartItems = [];
    },
    setCart(state, action: PayloadAction<Cart>) {
      state.cartItems = action.payload.cartItems;
      state.totalAmount = action.payload.totalAmount;
      state.totalNumItems = action.payload.totalNumItems;
    },
  },
});

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;
