import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { fs } from "../Config/firebaseConfig";
import { Cart, CartItem, NotificationType, Order, UserData } from "../types";
import { cartActions } from "./cart-slice";
import { AppDispatch, GetState } from "./redux-store";
import { uiActions } from "./ui-slice";
import { setNofication } from "../Util/notification";

export const fetchCart = (uid: string) => {
  return async (dispatch: AppDispatch) => {
    const userDocRef = doc(fs, "users", uid);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      const userData = userDoc.data() as UserData;
      dispatch(cartActions.setCart(userData.cart));
    }
  };
};

// this function (using onSnapshot) listens to changes on the backend, and produces one snapshot (object) whenever
//the specified doc (whos ref is given) changes. we can use this to update the frontend whenever the data on the backend has been updated

export const listenToChanges = (uid: string) => {
  return async (dispatch: AppDispatch) => {
    const userDocRef = doc(fs, "users", uid);
    onSnapshot(userDocRef, (snapShot) => {
      if (snapShot.exists()) {
        //we see if the snapshot exists (in my case it always exists because i create it whenever a new user signs up)
        const userData = snapShot.data() as UserData;
        //here we set the changed data in our redux state to update the frontend
        dispatch(cartActions.setCart(userData.cart));
      }
    });
  };
};

export const updateCart = (uid: string, cart: Cart) => {
  return async () => {
    const userDocRef = doc(fs, "users", uid);
    updateDoc(userDocRef, { cart });
  };
};

export const addToCart = (uid: string, item: CartItem) => {
  return async (dispatch: AppDispatch, getState: GetState) => {
    dispatch(cartActions.addItem(item));
    const cart = getState().cart;
    await dispatch(updateCart(uid, cart));
    setNofication("success", "item added to cart!");
  };
};

export const removeOneFromCart = (uid: string, item: CartItem) => {
  return async (dispatch: AppDispatch, getState: GetState) => {
    dispatch(cartActions.removeItem(item));
    const cart = getState().cart;
    await dispatch(updateCart(uid, cart));
    setNofication("error", "item removed from cart!");
  };
};

export const removeItemFromCart = (uid: string, item: CartItem) => {
  return async (dispatch: AppDispatch, getState: GetState) => {
    dispatch(cartActions.deleteOneItem(item));
    const cart = getState().cart;
    await dispatch(updateCart(uid, cart));
    setTimeout(() => dispatch(uiActions.removeNotification()), 1500);
    setNofication("error", "Item deleted from cart!");
  };
};

export const removeAll = (uid: string, noti: NotificationType) => {
  return async (dispatch: AppDispatch, getState: GetState) => {
    dispatch(cartActions.deleteAll());
    const cart = getState().cart;
    await dispatch(updateCart(uid, cart));
    setNofication(noti.type, noti.title);
  };
};

export const order = (order: Order) => {
  return async () => {
    const collectionRef = collection(fs, "orders");
    await addDoc(collectionRef, order);
  };
};
