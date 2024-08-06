import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NotificationType } from "../types";

let initialState: {
  notification: NotificationType | null;
  toggleNav: boolean;
} = {
  notification: null,
  toggleNav: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleNav(state) {
      state.toggleNav = !state.toggleNav;
    },
    setNotification(state, action: PayloadAction<NotificationType>) {
      state.notification = { ...action.payload };
    },
    clearNotification(state) {
      state.notification = null;
    },
  },
});

export default uiSlice.reducer;
export const uiActions = uiSlice.actions;
