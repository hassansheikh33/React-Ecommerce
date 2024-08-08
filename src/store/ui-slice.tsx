import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NotificationType } from "../types";

let initialState: {
  notifications: NotificationType[];
  toggleNav: boolean;
} = {
  notifications: [],
  toggleNav: false,
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
    // clearNotification(state) {
    //   state.notification = null;
    // },
  },
});

export default uiSlice.reducer;
export const uiActions = uiSlice.actions;
