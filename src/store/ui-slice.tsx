import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NotificationType } from "../types";
import { getAdminToken, getToken } from "../Util/token";

let initialState: {
  notifications: NotificationType[];
  navShown: boolean;
  loading: boolean;
  token: string | null;
  orderFormShown: boolean;
  mode: string;
} = {
  notifications: [],
  navShown: false,
  loading: false,
  token: getToken(),
  orderFormShown: false,
  mode: getAdminToken(),
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleNav(state, action: PayloadAction<boolean>) {
      state.navShown = action.payload;
    },
    addNotification(state, action: PayloadAction<NotificationType>) {
      state.notifications.push({ ...action.payload });
    },
    removeNotification(state) {
      state.notifications.shift();
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setToken(state, action: PayloadAction<string>) {
      localStorage.setItem("token", action.payload);
      state.token = action.payload;
    },
    clearToken(state) {
      localStorage.clear();
      state.token = null;
    },
    setOrderFormShown(state, action: PayloadAction<boolean>) {
      state.orderFormShown = action.payload;
    },
    setMode(state, action: PayloadAction<"user" | "admin">) {
      state.mode = action.payload;
    },
  },
});

export default uiSlice.reducer;
export const uiActions = uiSlice.actions;
