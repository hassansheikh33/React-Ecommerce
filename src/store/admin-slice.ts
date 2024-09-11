import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AdminCredentials,
  AdminData,
  AdminProduct,
  Order,
  UserData,
} from "../types";

let initialState: AdminData = {
  admins: [],
  users: [],
  products: [],
  orders: [],
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdminData(state, action: PayloadAction<AdminData>) {
      state.products = action.payload.products;
      state.admins = action.payload.admins;
      state.users = action.payload.users;
      state.orders = action.payload.orders;
    },
    setProducts(state, action: PayloadAction<AdminProduct[]>) {
      state.products = action.payload;
    },
    setUsers(state, action: PayloadAction<UserData[]>) {
      state.users = action.payload;
    },
    setOrders(state, action: PayloadAction<Order[]>) {
      state.orders = action.payload;
    },
    setAdmins(state, action: PayloadAction<AdminCredentials[]>) {
      state.admins = action.payload;
    },
  },
});

export default adminSlice.reducer;
export const adminActions = adminSlice.actions;
