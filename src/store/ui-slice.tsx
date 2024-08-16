import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NotificationType } from "../types";
import { getToken } from "../Util/token";

let initialState: {
  notifications: NotificationType[];
  toggleNav: boolean;
  loading: boolean;
  token: string | null;
  orderFormShown: boolean;
} = {
  notifications: [],
  toggleNav: false,
  loading: false,
  token: getToken(),
  orderFormShown: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleNav(state) {
      state.toggleNav = !state.toggleNav;
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
  },
});

export default uiSlice.reducer;
export const uiActions = uiSlice.actions;
