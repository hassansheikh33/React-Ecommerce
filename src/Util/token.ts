import { doc, getDoc } from "firebase/firestore";
import { fs } from "../Config/firebaseConfig";

export const getDuration = () => {
  const expirationString = localStorage.getItem("expiration");
  if (expirationString) {
    const expirationDate = new Date(expirationString);
    const current = new Date();
    const duration = expirationDate.getTime() - current.getTime();
    return duration;
  } else {
    return null;
  }
};

export const getToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const duration = getDuration();
    if (duration && duration <= 0) {
      return "token expired";
    }
    return token;
  }
  return null;
};

export const userExists = async (uid: string) => {
  //it checks if uid exists in firebase or not
  const userDocRef = doc(fs, "users", uid);
  const userDoc = await getDoc(userDocRef);
  if (userDoc.exists()) {
    return true;
  }
  return false;
};

export const getAdminToken = () => {
  const adminToken = localStorage.getItem("admin");
  if (adminToken) {
    const duration = getDuration();
    if (duration && duration <= 0) {
      return "token expired";
    }
    return adminToken;
  }
  return "user";
};

export const adminExists = async (adminID: string) => {
  //it checks if adminID is a real admin or not (checks firebase collection)
  const adminDocRef = doc(fs, "admins", adminID);
  const userDoc = await getDoc(adminDocRef);
  if (userDoc.exists()) {
    return true;
  }
  return false;
};
