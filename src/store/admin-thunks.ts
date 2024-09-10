import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { AppDispatch } from "./redux-store";
import { AdminCredentials, AdminProduct, Order, UserData } from "../types";
import { fs } from "../Config/firebaseConfig";
import { uiActions } from "./ui-slice";
import { adminActions } from "./admin-slice";
import { setNofication } from "../Util/notification";

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

export const getAdminData = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(uiActions.setLoading(true));
    let admins: any[] = [];
    const adminsCollection = collection(fs, "admins");
    const response = await getDocs(adminsCollection);
    if (response.empty) {
      throw new Error("admins not found");
    }
    admins = response.docs.map((admin) => ({ ...admin.data() }));
    //
    let orders: any[] = [];
    const ordersCollection = collection(fs, "orders");
    const ordersResponse = await getDocs(ordersCollection);
    if (ordersResponse.empty) orders = [];
    else orders = ordersResponse.docs.map((order) => ({ ...order.data() }));
    let users: any[] = [];
    const usersCollection = collection(fs, "users");
    const usersResponse = await getDocs(usersCollection);
    if (usersResponse.empty) users = [];
    else users = usersResponse.docs.map((user) => ({ ...user.data() }));
    let products: any[] = [];
    const productsCollection = collection(fs, "products");
    const productsResponse = await getDocs(productsCollection);
    if (productsResponse.empty) products = [];
    else products = productsResponse.docs.map((user) => ({ ...user.data() }));
    const data = {
      admins,
      orders,
      products,
      users,
    };
    dispatch(uiActions.setLoading(false));
    dispatch(adminActions.setAdminData(data));
  };
};

export const addNewProduct = (
  productToAdd: AdminProduct,
  mode: "edit" | "new"
) => {
  return async () => {
    try {
      const docRef = doc(fs, "products", productToAdd.id.toString());
      await setDoc(docRef, productToAdd);
      setNofication(
        "success",
        mode === "new"
          ? "Product added Successfully"
          : "Product Edited Successfully"
      );
    } catch (err) {
      setNofication(
        "error",
        mode === "new"
          ? "Could not add new product, please try again later!"
          : "Could not edit product, please try again later!"
      );
      console.error(err);
    }
  };
};

export const listenToProductsChanges = () => {
  return async (dispatch: AppDispatch) => {
    const productsCollectionRef = collection(fs, "products");

    // Listening to all documents in the 'products' collection
    onSnapshot(productsCollectionRef, (snapshot) => {
      const updatedProducts: AdminProduct[] = [];

      // Loop over each document in the snapshot
      snapshot.forEach((doc) => {
        if (doc.exists()) {
          const productData = doc.data() as AdminProduct;
          updatedProducts.push(productData);
        }
      });

      // Update the Redux state with the new products list
      dispatch(adminActions.setProducts(updatedProducts));
    });
  };
};

export const listenToUsersChanges = () => {
  return async (dispatch: AppDispatch) => {
    const usersCollectionRef = collection(fs, "users");

    // Listening to all documents in the 'users' collection
    onSnapshot(usersCollectionRef, (snapshot) => {
      const updatedUsers: UserData[] = [];

      // Loop over each document in the snapshot
      snapshot.forEach((doc) => {
        if (doc.exists()) {
          const userData = doc.data() as UserData;
          updatedUsers.push(userData);
        }
      });

      // Update the Redux state with the new products list
      dispatch(adminActions.setUsers(updatedUsers));
    });
  };
};

export const listenToAdminChanges = () => {
  return async (dispatch: AppDispatch) => {
    const adminsCollectionRef = collection(fs, "admins");

    // Listening to all documents in the 'admins' collection
    onSnapshot(adminsCollectionRef, (snapshot) => {
      const updatedadmins: AdminCredentials[] = [];

      // Loop over each document in the snapshot
      snapshot.forEach((doc) => {
        if (doc.exists()) {
          const productData = doc.data() as AdminCredentials;
          updatedadmins.push(productData);
        }
      });

      // Update the Redux state with the new admins list
      dispatch(adminActions.setAdmins(updatedadmins));
    });
  };
};
export const listenToOrdersChanges = () => {
  return async (dispatch: AppDispatch) => {
    const ordersCollectionRef = collection(fs, "orders");

    // Listening to all documents in the 'orders' collection
    onSnapshot(ordersCollectionRef, (snapshot) => {
      const updatedorders: Order[] = [];

      // Loop over each document in the snapshot
      snapshot.forEach((doc) => {
        if (doc.exists()) {
          const productData = doc.data() as Order;
          updatedorders.push(productData);
        }
      });

      // Update the Redux state with the new orders list
      dispatch(adminActions.setOrders(updatedorders));
    });
  };
};

export const deleteProduct = (id: string) => {
  return async () => {
    const productDocRef = doc(fs, "products", id);
    await deleteDoc(productDocRef);
    setNofication("error", "Product deleted Successfully");
  };
};

export const addNewAdmin = (adminCredentials: AdminCredentials) => {
  return async () => {
    const adminCollectionRef = collection(fs, "admins");
    await addDoc(adminCollectionRef, adminCredentials);
    setNofication("success", "Added a new Admin Successfully");
  };
};
