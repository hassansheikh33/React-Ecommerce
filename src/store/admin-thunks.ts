import { doc, getDoc } from "firebase/firestore";
import { AppDispatch } from "./redux-store";
import { AdminCredentials } from "../types";
import { fs } from "../Config/firebaseConfig";
import { uiActions } from "./ui-slice";

export const loginAdmin = ({ email, password }: AdminCredentials) => {
  return async (dispatch: AppDispatch) => {
    dispatch(uiActions.setLoading(true));
    const adminDocRef = doc(fs, "admins", email);
    const adminDoc = await getDoc(adminDocRef);
    if (adminDoc.exists()) {
      const data = adminDoc.data() as AdminCredentials;
      if (password === data.password) {
        dispatch(uiActions.setLoading(false));
        return email;
      }
      dispatch(uiActions.setLoading(false));
      throw new Error("Incorrect Password");
    }
    dispatch(uiActions.setLoading(false));
    throw new Error("You are not an admin!");
  };
};
