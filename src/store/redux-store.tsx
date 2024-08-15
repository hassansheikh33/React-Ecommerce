import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./ui-slice";
import cartReducer from "./cart-slice";

const store = configureStore({
  reducer: {
    ui: uiReducer,
    cart: cartReducer,
  },
});

export default store;
export type GetState = typeof store.getState;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
