import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { fs } from "../../Config/firebaseConfig";
import { Cart, CartItem, NotificationType, Order, UserData } from "../../types";
import { cartActions } from "../../store/cart-slice";
import { AppDispatch, GetState } from "../../store/redux-store";
import { setNofication } from "../../Util/notification";
import { uiActions } from "../../store/ui-slice";

export const fetchCart = (uid: string) => {
  return async (dispatch: AppDispatch) => {
    if (window.navigator.onLine) {
      dispatch(uiActions.setLoading(true));
      const userDocRef = doc(fs, "users", uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const userData = userDoc.data() as UserData;
        dispatch(cartActions.setCart(userData.cart));
      }
      dispatch(uiActions.setLoading(false));
    } else {
      setNofication("error", "Please connect to an internet connection");
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
        //we see if the snapshot exists (we check, if data has been changed in the backend)
        const userData = snapShot.data() as UserData;
        //here we set the changed data in our redux state to update the frontend
        dispatch(cartActions.setCart(userData.cart));
      }
    });
  };
};

export const updateCart = (uid: string, cart: Cart) => {
  return async () => {
    try {
      const userDocRef = doc(fs, "users", uid);
      await updateDoc(userDocRef, { cart });
    } catch (err) {
      console.log(err);
      setNofication("error", "Could not update cart, please try again later!");
    }
  };
};

export const addToCart = (uid: string, item: CartItem) => {
  return async (dispatch: AppDispatch, getState: GetState) => {
    if (window.navigator.onLine) {
      try {
        dispatch(cartActions.addItem(item));
        const cart = getState().cart;
        await dispatch(updateCart(uid, cart));
        setNofication("success", "Item added to Cart");
      } catch (err) {
        setNofication(
          "error",
          "Could not add item to cart, please try again later!"
        );
        console.error(err);
      }
    } else {
      setNofication(
        "error",
        "Please connect to an internet connection and try again"
      );
    }
  };
};

export const removeOneFromCart = (uid: string, item: CartItem) => {
  return async (dispatch: AppDispatch, getState: GetState) => {
    if (window.navigator.onLine) {
      try {
        dispatch(cartActions.removeItem(item));
        const cart = getState().cart;
        await dispatch(updateCart(uid, cart));
        setNofication("error", "item removed from cart!");
      } catch (err) {
        setNofication(
          "error",
          "Could not remove item from cart, please try again later!"
        );
        console.error(err);
      }
    } else {
      setNofication(
        "error",
        "Please connect to an internet connection and try again"
      );
    }
  };
};

export const removeItemFromCart = (uid: string, item: CartItem) => {
  return async (dispatch: AppDispatch, getState: GetState) => {
    if (window.navigator.onLine) {
      try {
        dispatch(cartActions.deleteOneItem(item));
        const cart = getState().cart;
        await dispatch(updateCart(uid, cart));
        setNofication("error", "Item deleted from cart!");
      } catch (err) {
        setNofication(
          "error",
          "Could not delete item from cart, please try again later!"
        );
        console.error(err);
      }
    } else {
      setNofication(
        "error",
        "Please connect to an internet connection and try again"
      );
    }
  };
};

export const removeAll = (uid: string, noti: NotificationType) => {
  return async (dispatch: AppDispatch, getState: GetState) => {
    if (window.navigator.onLine) {
      try {
        dispatch(cartActions.deleteAll());
        const cart = getState().cart;
        await dispatch(updateCart(uid, cart));
        setNofication(noti.type, noti.title);
      } catch (err) {
        setNofication("error", "Could not empty cart, please try again later!");
      }
    } else {
      setNofication(
        "error",
        "Please connect to an internet connection and try again"
      );
    }
  };
};

export const order = (order: Order) => {
  return async () => {
    if (window.navigator.onLine) {
      try {
        const collectionRef = collection(fs, "orders");
        await addDoc(collectionRef, order);
      } catch (err) {
        setNofication(
          "error",
          "Could not place an order, please try again later!"
        );
      }
    } else {
      setNofication(
        "error",
        "Please connect to an internet connection and try again"
      );
    }
  };
};
