import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../types";

let initialState: {
  items: CartItem[];
  totalAmount: number;
  totalNumItems: number;
} = {
  items: [],
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
      const indexToUpdate = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (indexToUpdate > -1) {
        //check if item already exists in the cart
        let itemToUpdate = state.items[indexToUpdate];
        itemToUpdate = {
          ...itemToUpdate,
          amount: itemToUpdate.amount + action.payload.amount,
        }; //updating the amount here
        state.items[indexToUpdate] = itemToUpdate;
      } else {
        //if item doesnt already exist in the cart, push it as a new item obj
        state.items.push(action.payload);
      }
    },
    removeItem(state, action: PayloadAction<CartItem>) {
      state.totalAmount -= action.payload.price;
      state.totalNumItems -= action.payload.amount;
      const indexToUpdate = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (indexToUpdate > -1) {
        let itemToUpdate = state.items[indexToUpdate];
        if (itemToUpdate.amount === 1) {
          state.items.filter((item) => item.id !== action.payload.id);
        } else {
          itemToUpdate = {
            ...itemToUpdate,
            amount: itemToUpdate.amount - action.payload.amount,
          };
          state.items[indexToUpdate] = itemToUpdate;
        }
      }
    },
  },
});

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;
