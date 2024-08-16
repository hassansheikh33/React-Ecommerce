import store from "../store/redux-store";
import { uiActions } from "../store/ui-slice";

export const setNofication = (
  type: "error" | "success" | "progress",
  message: string
) => {
  store.dispatch(uiActions.addNotification({ title: message, type: type }));
  setTimeout(() => {
    store.dispatch(uiActions.removeNotification());
  }, 3000);
};
