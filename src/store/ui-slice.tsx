import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NotificationType } from "../types";
import { getToken } from "../Token/util";

let initialState: {
  notifications: NotificationType[];
  toggleNav: boolean;
  loading: boolean;
  token: string | null;
} = {
  notifications: [],
  toggleNav: false,
  loading: false,
  token: getToken(),
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
      state.token = null;
      localStorage.clear();
    },
  },
});

export default uiSlice.reducer;
export const uiActions = uiSlice.actions;
